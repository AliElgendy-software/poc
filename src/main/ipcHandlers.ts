import { ipcMain } from 'electron'
import { prisma } from './db'
import crypto from 'crypto'
import { checkLicenseStatus, activateLicense } from './license'

// Simple built-in SHA256 hashing helper
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export function registerIpcHandlers(): void {

  // ─────────────────────────────────────────────────────────────────────────
  // ACTIVITY LOG HELPER — call this anywhere to record an audit entry
  // ─────────────────────────────────────────────────────────────────────────
  async function logActivity(opts: {
    userId?: string | null
    action: string
    module: string
    entityId?: string | null
    entityType?: string | null
    description: string
    severity?: 'INFO' | 'WARNING' | 'CRITICAL'
    metadata?: Record<string, unknown> | null
    tx?: any // prisma transaction client
  }): Promise<void> {
    try {
      const client = opts.tx ?? prisma
      await client.activityLog.create({
        data: {
          userId: opts.userId ?? null,
          action: opts.action,
          module: opts.module,
          entityId: opts.entityId ?? null,
          entityType: opts.entityType ?? null,
          description: opts.description,
          severity: opts.severity ?? 'INFO',
          metadata: opts.metadata ? JSON.stringify(opts.metadata) : null
        }
      })
    } catch {
      // Never crash the main operation because of a logging failure
    }
  }

  // --- LICENSE HANDLERS ---
  ipcMain.handle('license:status', async () => {
    try {
      const status = checkLicenseStatus()
      return { success: true, ...status }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('license:activate', async (_, { licenseKey }) => {
    try {
      const result = activateLicense(licenseKey)
      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- AUTH / USER HANDLERS ---
  ipcMain.handle('auth:login', async (_, { username, password }) => {
    try {
      if (!username || !password) {
        return { success: false, error: 'اسم المستخدم وكلمة المرور مطلوبة' }
      }

      const user = await prisma.user.findFirst({
        where: {
          username,
          isActive: true
        }
      })

      if (!user) {
        return { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }
      }

      // Verify password using user's stored salt and PBKDF2
      const userSalt = user.passwordSalt || ''
      let isValid = false
      if (userSalt) {
        const computedHash = crypto.pbkdf2Sync(password, userSalt, 10000, 64, 'sha512').toString('hex')
        isValid = (user.passwordHash === computedHash)
      } else {
        // Fallback for legacy simple sha256 users if they exist
        const computedHash = crypto.createHash('sha256').update(password).digest('hex')
        isValid = (user.passwordHash === computedHash)
      }

      if (!isValid) {
        return { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }
      }

      // Return user without password hash/salt
      const { passwordHash: _, passwordSalt: __, ...safeUser } = user
      await logActivity({
        userId: user.id,
        action: 'USER_LOGIN',
        module: 'AUTH',
        entityId: user.id,
        entityType: 'User',
        description: `تسجيل دخول: ${user.name} (${user.role})`,
        severity: 'INFO'
      })
      return { success: true, user: safeUser }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('users:list', async () => {
    try {
      const users = await prisma.user.findMany({
        where: { isActive: true },
        select: {
          id: true,
          username: true,
          role: true,
          name: true,
          phone: true,
          createdAt: true
        }
      })
      return { success: true, data: users }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('users:create', async (_, userData) => {
    try {
      const { username, password, role, name, phone } = userData
      if (!username || !password || !role || !name) {
        return { success: false, error: 'جميع الحقول المطلوبة يجب ملؤها' }
      }
      
      const existing = await prisma.user.findUnique({ where: { username } })
      if (existing) {
        return { success: false, error: 'اسم المستخدم موجود بالفعل' }
      }

      // Generate unique random salt and hash password with PBKDF2
      const salt = crypto.randomBytes(16).toString('hex')
      const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

      const user = await prisma.user.create({
        data: {
          username,
          passwordHash: hash,
          passwordSalt: salt,
          role,
          name,
          phone,
          isActive: true
        }
      })

      const { passwordHash: _, passwordSalt: __, ...safeUser } = user
      return { success: true, data: safeUser }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- PERMISSIONS HANDLERS ---
  ipcMain.handle('permissions:get', async (_, { userId }) => {
    try {
      const perms = await prisma.userPermission.findMany({
        where: { userId }
      })
      return { success: true, data: perms }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('permissions:save', async (_, { userId, permissions }) => {
    try {
      // permissions is expected to be an array of objects matching the schema: { module, canView, canCreate, canEdit, canDelete, canPrint, canExport }
      const results = await prisma.$transaction(async (tx) => {
        // delete all current permissions for safety or upsert them
        const saved: any[] = []
        for (const perm of permissions) {
          const res = await tx.userPermission.upsert({
            where: {
              userId_module: {
                userId,
                module: perm.module
              }
            },
            update: {
              canView: perm.canView,
              canCreate: perm.canCreate,
              canEdit: perm.canEdit,
              canDelete: perm.canDelete,
              canPrint: perm.canPrint,
              canExport: perm.canExport
            },
            create: {
              userId,
              module: perm.module,
              canView: perm.canView,
              canCreate: perm.canCreate,
              canEdit: perm.canEdit,
              canDelete: perm.canDelete,
              canPrint: perm.canPrint,
              canExport: perm.canExport
            }
          })
          saved.push(res)
        }
        return saved
      })

      await logActivity({
        action: 'PERMISSIONS_UPDATE',
        module: 'SETTINGS',
        entityId: userId,
        entityType: 'User',
        description: `تحديث صلاحيات المستخدم ذو المعرف: ${userId}`,
        severity: 'WARNING'
      })

      return { success: true, data: results }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })


  // --- SHIFT / CASH DRAWER HANDLERS ---
  ipcMain.handle('shift:getActive', async () => {
    try {
      const activeShift = await prisma.shift.findFirst({
        where: { status: 'OPEN' },
        include: {
          user: {
            select: { name: true, role: true }
          }
        }
      })
      return { success: true, shift: activeShift }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('shift:open', async (_, { userId, startingCash, notes }) => {
    try {
      // Check if there is already an open shift
      const existing = await prisma.shift.findFirst({ where: { status: 'OPEN' } })
      if (existing) {
        return { success: false, error: 'هناك وردية مفتوحة بالفعل' } // Shift already open
      }

      const shift = await prisma.shift.create({
        data: {
          userId,
          startingCash,
          expectedCash: startingCash,
          status: 'OPEN',
          notes
        },
        include: {
          user: {
            select: { name: true, role: true }
          }
        }
      })
      return { success: true, shift }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('shift:close', async (_, { shiftId, actualCash, notes }) => {
    try {
      const shift = await prisma.shift.findUnique({
        where: { id: shiftId },
        include: {
          salesInvoices: true,
          returnInvoices: true,
          expenses: true
        }
      })

      if (!shift || shift.status !== 'OPEN') {
        return { success: false, error: 'الوردية غير موجودة أو مغلقة بالفعل' }
      }

      // Calculate expected cash in drawer
      // expected = starting + sales(cash) - refunds(cash) - expenses
      const salesTotal = shift.salesInvoices
        .filter(inv => inv.paymentType === 'CASH' && inv.status === 'PAID')
        .reduce((sum, inv) => sum + inv.paidAmount, 0)

      const returnTotal = shift.returnInvoices
        .reduce((sum, inv) => sum + inv.totalRefunded, 0)

      const expenseTotal = shift.expenses
        .reduce((sum, exp) => sum + exp.amount, 0)

      const expectedCash = shift.startingCash + salesTotal - returnTotal - expenseTotal

      const updatedShift = await prisma.shift.update({
        where: { id: shiftId },
        data: {
          endTime: new Date(),
          actualCash,
          expectedCash,
          notes,
          status: 'CLOSED'
        }
      })

      return { success: true, shift: updatedShift }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

   // --- GENERAL SETTINGS HANDLERS ---
  ipcMain.handle('settings:get', async () => {
    try {
      const settings = await prisma.settings.findUnique({ where: { id: 1 } })
      return { success: true, settings }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('settings:update', async (_, settingsData) => {
    try {
      const settings = await prisma.settings.upsert({
        where: { id: 1 },
        update: settingsData,
        create: { id: 1, ...settingsData }
      })
      return { success: true, settings }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('settings:getDbConfig', async () => {
    try {
      const { app } = require('electron')
      const path = require('path')
      const fs = require('fs')
      const os = require('os')
      const configDir = app ? app.getPath('userData') : process.cwd()
      const configPath = path.join(configDir, 'database_config.json')

      // Get local IP addresses of this host machine
      const localIps: string[] = []
      const nets = os.networkInterfaces()
      for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
          // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
          if (net.family === 'IPv4' && !net.internal) {
            localIps.push(net.address)
          }
        }
      }

      if (fs.existsSync(configPath)) {
        const raw = fs.readFileSync(configPath, 'utf8')
        const parsed = JSON.parse(raw)
        return {
          success: true,
          databaseUrl: parsed.databaseUrl,
          dbType: parsed.dbType || (parsed.databaseUrl.startsWith('postgresql') ? 'postgresql' : 'sqlite'),
          localIps
        }
      }
      // Return default SQLite config
      const defaultSqlitePath = app ? path.join(app.getPath('userData'), 'servio.db') : 'servio.db'
      return {
        success: true,
        databaseUrl: `file:${defaultSqlitePath}`,
        dbType: 'sqlite',
        localIps
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('settings:saveDbConfig', async (_, { databaseUrl, dbType }) => {
    try {
      const { app } = require('electron')
      const path = require('path')
      const fs = require('fs')
      const configDir = app ? app.getPath('userData') : process.cwd()
      const configPath = path.join(configDir, 'database_config.json')

      fs.mkdirSync(configDir, { recursive: true })
      fs.writeFileSync(configPath, JSON.stringify({ databaseUrl, dbType }, null, 2), 'utf8')
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('settings:changeDbPassword', async (_, { oldPass, newPass, host, port, database }) => {
    try {
      const { Client } = require('pg')
      const { app } = require('electron')
      const path = require('path')
      const fs = require('fs')

      const dbHost = host || 'localhost'
      const dbPort = port || 5432
      const dbName = database || 'pos_erp'

      // Connect to PostgreSQL server with the old (or default) password
      const client = new Client({
        user: 'postgres',
        host: dbHost,
        database: 'postgres', // connect to default maintenance DB to alter password
        password: oldPass,
        port: dbPort,
      })

      await client.connect()

      // Alter postgres superuser password
      // Escape password correctly to prevent SQL injection in password field
      const escapedPassword = newPass.replace(/'/g, "''")
      await client.query(`ALTER USER postgres WITH PASSWORD '${escapedPassword}'`)
      await client.end()

      // Save the new connection string to configuration file
      const configDir = app ? app.getPath('userData') : process.cwd()
      const configPath = path.join(configDir, 'database_config.json')
      const newUrl = `postgresql://postgres:${encodeURIComponent(newPass)}@${dbHost}:${dbPort}/${dbName}?schema=public`

      fs.mkdirSync(configDir, { recursive: true })
      fs.writeFileSync(configPath, JSON.stringify({ databaseUrl: newUrl }, null, 2), 'utf8')

      return { success: true, databaseUrl: newUrl }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- PRODUCT / INVENTORY HANDLERS ---
  ipcMain.handle('products:list', async () => {
    try {
      const products = await prisma.product.findMany({
        where: { isDeleted: false },
        orderBy: { name: 'asc' }
      })
      return { success: true, data: products }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('products:getByBarcode', async (_, barcode) => {
    try {
      const product = await prisma.product.findUnique({
        where: { barcode, isDeleted: false }
      })
      return { success: true, data: product }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('products:create', async (_, productData) => {
    try {
      const {
        name,
        barcode,
        purchasePrice,
        sellPrice,
        minStockLevel,
        currentStock,
        expiryDate,
        category,
        wholesalePrice,
        semiWholesalePrice,
        unit,
        hasExpiry
      } = productData
      
      const existing = await prisma.product.findUnique({ where: { barcode } })
      if (existing) {
        if (existing.isDeleted) {
          // Reactivate product
          const updated = await prisma.product.update({
            where: { id: existing.id },
            data: {
              name,
              purchasePrice,
              sellPrice,
              minStockLevel,
              currentStock,
              expiryDate: expiryDate ? new Date(expiryDate) : null,
              category,
              wholesalePrice: Number(wholesalePrice || 0),
              semiWholesalePrice: Number(semiWholesalePrice || 0),
              unit: unit || 'قطعة',
              hasExpiry: !!hasExpiry,
              isDeleted: false
            }
          })
          return { success: true, data: updated }
        }
        return { success: false, error: 'الباركود موجود بالفعل لمنتج آخر' } // Barcode already exists
      }

      const product = await prisma.product.create({
        data: {
          name,
          barcode,
          purchasePrice,
          sellPrice,
          minStockLevel,
          currentStock,
          expiryDate: expiryDate ? new Date(expiryDate) : null,
          category,
          wholesalePrice: Number(wholesalePrice || 0),
          semiWholesalePrice: Number(semiWholesalePrice || 0),
          unit: unit || 'قطعة',
          hasExpiry: !!hasExpiry,
          isDeleted: false
        }
      })
      return { success: true, data: product }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- FINANCE / VAULT / EXPENSES HANDLERS ---
  ipcMain.handle('vault:get', async () => {
    try {
      const vault = await prisma.vault.findUnique({ where: { id: 'main_vault' } })
      return { success: true, vault }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('vault:transferFromPOS', async (_, { shiftId, userId, amount, notes }) => {
    try {
      // 1. Deduct or register from Shift (we log it as transfer reference)
      // 2. Add to Main Vault balance
      const vault = await prisma.vault.findUnique({ where: { id: 'main_vault' } })
      if (!vault) {
        return { success: false, error: 'الخزينة الرئيسية غير موجودة' }
      }

      await prisma.$transaction([
        prisma.vault.update({
          where: { id: 'main_vault' },
          data: { currentBalance: { increment: amount } }
        }),
        prisma.vaultTransaction.create({
          data: {
            vaultId: 'main_vault',
            type: 'POS_TRANSFER',
            amount,
            referenceId: shiftId,
            notes: notes || 'تحويل من درج المبيعات (Shift Transfer)',
            userId,
            shiftId
          }
        })
      ])

      const updatedVault = await prisma.vault.findUnique({ where: { id: 'main_vault' } })
      return { success: true, vault: updatedVault }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('expenses:list', async () => {
    try {
      const expenses = await prisma.expense.findMany({
        include: {
          user: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' }
      })
      return { success: true, data: expenses }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('expenses:create', async (_, { category, amount, description, userId, shiftId }) => {
    try {
      const expense = await prisma.expense.create({
        data: {
          category,
          amount,
          description,
          userId,
          shiftId,
          date: new Date()
        }
      })
      
      // Auto-post bookkeeping entry for expense
      await prisma.journalEntry.create({
        data: {
          description: `مصروف تشغيلي: ${category}`,
          referenceId: expense.id,
          debitAcc: 'EXPENSES',
          creditAcc: 'CASH',
          amount
        }
      })

      return { success: true, data: expense }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- SALES & POS HANDLERS ---
  ipcMain.handle('sales:listInvoices', async () => {
    try {
      const invoices = await prisma.salesInvoice.findMany({
        include: {
          items: { include: { product: true } },
          client: true,
          user: { select: { name: true } }
        },
        orderBy: { date: 'desc' }
      })
      return { success: true, data: invoices }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('sales:createInvoice', async (_, invoiceData) => {
    try {
      const { clientId, userId, subtotal, discount, totalAmount, paidAmount, paymentType, shiftId, items, notes } = invoiceData

      // Generate invoice number
      const invoiceNumber = 'INV-' + Date.now()

      const result = await prisma.$transaction(async (tx) => {
        // 1. Resolve client
        let resolvedClientId: string | null = null
        if (clientId && clientId !== 'Cash Customer') {
          const client = await tx.client.findFirst({
            where: { OR: [{ id: clientId }, { name: clientId }] }
          })
          if (client) {
            resolvedClientId = client.id
          } else {
            const newClient = await tx.client.create({
              data: { name: clientId, currentBalance: 0 }
            })
            resolvedClientId = newClient.id
          }
        }

        // 2. Create sales invoice
        const invoice = await tx.salesInvoice.create({
          data: {
            invoiceNumber,
            clientId: resolvedClientId,
            userId,
            subtotal,
            discount,
            totalAmount,
            paidAmount,
            paymentType,
            shiftId,
            notes
          }
        })

        // 3. Create items, decrement stocks, calculate COGS
        let totalCOGS = 0
        for (const item of items) {
          const product = await tx.product.findUnique({ where: { id: item.productId } })
          if (!product) throw new Error(`Product not found: ${item.productId}`)
          
          if (product.currentStock < item.quantity) {
            throw new Error(`الكمية المتاحة للمنتج ${product.name} غير كافية`)
          }

          await tx.salesItem.create({
            data: {
              salesInvoiceId: invoice.id,
              productId: item.productId,
              quantity: item.quantity,
              sellPrice: item.sellPrice
            }
          })

          // Decrement stock
          await tx.product.update({
            where: { id: item.productId },
            data: { currentStock: { decrement: item.quantity } }
          })

          totalCOGS += item.quantity * product.purchasePrice
        }

        // 4. Update client outstanding balance if credit with limit validation
        if (paymentType === 'CREDIT' && resolvedClientId) {
          const client = await tx.client.findUnique({ where: { id: resolvedClientId } })
          if (client) {
            const extraDebt = totalAmount - paidAmount
            const newDebt = client.currentBalance + extraDebt
            if (newDebt > client.creditLimit) {
              throw new Error(`⚠️ غير مسموح بالبيع الآجل: العميل تجاوز الحد الائتماني المسموح به (${client.creditLimit} ج.م)، الرصيد الحالي: ${client.currentBalance} ج.م، الجديد: ${newDebt} ج.م`)
            }
            await tx.client.update({
              where: { id: resolvedClientId },
              data: { currentBalance: { increment: extraDebt } }
            })
          }
        }

        // 5. Update shift drawer expected cash if paid by cash
        if (paymentType === 'CASH' && paidAmount > 0) {
          await tx.shift.update({
            where: { id: shiftId },
            data: { expectedCash: { increment: paidAmount } }
          })
        }

        // 6. Post double-entry bookkeeping journal records
        // Debit: CASH/CARD/RECEIVABLES
        await tx.journalEntry.create({
          data: {
            description: `فاتورة مبيعات ${invoiceNumber}`,
            referenceId: invoice.id,
            debitAcc: paymentType === 'CREDIT' ? 'RECEIVABLES' : (paymentType === 'CARD' ? 'CARD' : 'CASH'),
            creditAcc: 'REVENUE',
            amount: totalAmount
          }
        })

        // COGS Entry: Debit COGS, Credit INVENTORY
        if (totalCOGS > 0) {
          await tx.journalEntry.create({
            data: {
              description: `تكلفة البضاعة المباعة لفاتورة ${invoiceNumber}`,
              referenceId: invoice.id,
              debitAcc: 'COGS',
              creditAcc: 'INVENTORY',
              amount: totalCOGS
            }
          })
        }

        return invoice
      })

      // Generate ZATCA compliant TLV Base64 QR code representation
      const dbSettings = await prisma.settings.findUnique({ where: { id: 1 } })
      const storeName = dbSettings?.storeName || 'Servio'
      const vatNumber = '300123456700003' // standard mock VAT registration number
      const timestamp = new Date().toISOString()
      const vatAmount = (totalAmount * 0.15).toFixed(2) // mock 15% VAT
      const totalStr = totalAmount.toFixed(2)

      // TLV encoder function
      const encodeTLV = (tag: number, val: string): Buffer => {
        const valBuf = Buffer.from(val, 'utf8')
        return Buffer.concat([Buffer.from([tag]), Buffer.from([valBuf.length]), valBuf])
      }

      const tlv1 = encodeTLV(1, storeName)
      const tlv2 = encodeTLV(2, vatNumber)
      const tlv3 = encodeTLV(3, timestamp)
      const tlv4 = encodeTLV(4, totalStr)
      const tlv5 = encodeTLV(5, vatAmount)
      const zatcaQR = Buffer.concat([tlv1, tlv2, tlv3, tlv4, tlv5]).toString('base64')

      return { success: true, data: { ...result, zatcaQR } }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- RETURNS & REFUNDS HANDLERS ---
  ipcMain.handle('returns:create', async (_, returnData) => {
    try {
      const { originalSalesInvoiceId, userId, totalRefunded, shiftId, items, notes } = returnData

      const result = await prisma.$transaction(async (tx) => {
        // 1. Create return invoice
        const returnInv = await tx.returnInvoice.create({
          data: {
            originalSalesInvoiceId,
            userId,
            totalRefunded,
            shiftId,
            notes
          }
        })

        // 2. Create items, restock products, calculate COGS adjustments
        let totalCOGSAdjustment = 0
        for (const item of items) {
          await tx.returnItem.create({
            data: {
              returnInvoiceId: returnInv.id,
              productId: item.productId,
              quantity: item.quantity,
              refundPrice: item.refundPrice
            }
          })

          // Increment stock back
          const product = await tx.product.update({
            where: { id: item.productId },
            data: { currentStock: { increment: item.quantity } }
          })

          totalCOGSAdjustment += item.quantity * product.purchasePrice
        }

        // 3. Deduct expected cash from shift
        await tx.shift.update({
          where: { id: shiftId },
          data: { expectedCash: { decrement: totalRefunded } }
        })

        // 4. Post double-entry bookkeeping journal records
        // Debit: REVENUE_RETURNS, Credit: CASH
        await tx.journalEntry.create({
          data: {
            description: `مرتجع مبيعات للفاتورة #${originalSalesInvoiceId.slice(0, 6)}`,
            referenceId: returnInv.id,
            debitAcc: 'REVENUE_RETURNS',
            creditAcc: 'CASH',
            amount: totalRefunded
          }
        })

        // Inventory adjustment: Debit INVENTORY, Credit COGS
        if (totalCOGSAdjustment > 0) {
          await tx.journalEntry.create({
            data: {
              description: `تسوية تكلفة مرتجع مبيعات #${returnInv.id.slice(0, 6)}`,
              referenceId: returnInv.id,
              debitAcc: 'INVENTORY',
              creditAcc: 'COGS',
              amount: totalCOGSAdjustment
            }
          })
        }

        return returnInv
      })

      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- SUPPLIERS & PURCHASES HANDLERS ---
  ipcMain.handle('suppliers:list', async () => {
    try {
      const suppliers = await prisma.supplier.findMany({
        where: { isDeleted: false },
        orderBy: { name: 'asc' }
      })
      return { success: true, data: suppliers }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('suppliers:create', async (_, data) => {
    try {
      const supplier = await prisma.supplier.create({ data })
      return { success: true, data: supplier }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('purchases:createInvoice', async (_, purchaseData) => {
    try {
      const { invoiceNumber, supplierId, totalAmount, paidAmount, status, userId, items, notes } = purchaseData

      const result = await prisma.$transaction(async (tx) => {
        // Create purchase invoice
        const invoice = await tx.purchaseInvoice.create({
          data: {
            invoiceNumber,
            supplierId,
            totalAmount,
            paidAmount,
            status,
            userId,
            notes
          }
        })

        // Add items and increment stock
        for (const item of items) {
          await tx.purchaseItem.create({
            data: {
              purchaseInvoiceId: invoice.id,
              productId: item.productId,
              quantity: item.quantity,
              purchasePrice: item.purchasePrice
            }
          })

          // Update stock qty and purchase price on the product
          await tx.product.update({
            where: { id: item.productId },
            data: {
              currentStock: { increment: item.quantity },
              purchasePrice: item.purchasePrice
            }
          })
        }

        // Adjust supplier outstanding credit balance
        const outstanding = totalAmount - paidAmount
        if (outstanding > 0) {
          await tx.supplier.update({
            where: { id: supplierId },
            data: { balance: { increment: outstanding } }
          })
        }

        // Post accounting journal entries
        // Debit: INVENTORY (asset increase)
        await tx.journalEntry.create({
          data: {
            description: `فاتورة شراء توريد #${invoiceNumber}`,
            referenceId: invoice.id,
            debitAcc: 'INVENTORY',
            creditAcc: outstanding > 0 ? (paidAmount > 0 ? 'SPLIT_PAYABLE' : 'PAYABLES') : 'CASH',
            amount: totalAmount
          }
        })

        // If split payment, log cash paid
        if (outstanding > 0 && paidAmount > 0) {
          await tx.journalEntry.create({
            data: {
              description: `سداد نقدي دفعة فاتورة شراء #${invoiceNumber}`,
              referenceId: invoice.id,
              debitAcc: 'PAYABLES',
              creditAcc: 'CASH',
              amount: paidAmount
            }
          })
        }

        return invoice
      })

      await logActivity({
        userId,
        action: 'PURCHASE_CREATED',
        module: 'PURCHASES',
        entityId: result.id,
        entityType: 'PurchaseInvoice',
        description: `فاتورة شراء جديدة #${invoiceNumber} — الإجمالي: ${totalAmount.toFixed(2)} — الحالة: ${status}`,
        severity: 'INFO',
        metadata: { invoiceNumber, supplierId, totalAmount, paidAmount, status, itemsCount: items.length }
      })

      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- LEDGER & DOUBLE-ENTRY REPORTS HANDLERS ---
  ipcMain.handle('ledger:listEntries', async () => {
    try {
      const entries = await prisma.journalEntry.findMany({
        orderBy: { date: 'desc' }
      })
      return { success: true, data: entries }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('ledger:getReport', async () => {
    try {
      // Revenue calculation: Sum of all REVENUE transactions minus REVENUE_RETURNS
      const entries = await prisma.journalEntry.findMany()

      const revenue = entries
        .filter(e => e.creditAcc === 'REVENUE')
        .reduce((sum, e) => sum + e.amount, 0) -
        entries
        .filter(e => e.debitAcc === 'REVENUE_RETURNS')
        .reduce((sum, e) => sum + e.amount, 0)

      const cogs = entries
        .filter(e => e.debitAcc === 'COGS')
        .reduce((sum, e) => sum + e.amount, 0) -
        entries
        .filter(e => e.creditAcc === 'COGS')
        .reduce((sum, e) => sum + e.amount, 0)

      const expenses = entries
        .filter(e => e.debitAcc === 'EXPENSES')
        .reduce((sum, e) => sum + e.amount, 0)

      const netProfit = revenue - cogs - expenses

      return {
        success: true,
        data: { revenue, cogs, expenses, netProfit }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- HARDWARE / PRINTER EMULATOR HANDLERS ---
  ipcMain.handle('hardware:printRaw', async (_, { text }) => {
    try {
      console.log('--- ESC/POS EMULATOR RAW PRINT STREAM ---')
      console.log(text)
      console.log('-----------------------------------------')
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- MANAGER VALIDATION GATE ---
  ipcMain.handle('auth:validateManager', async (_, { pin }) => {
    try {
      const passwordHash = hashPassword(pin)
      const manager = await prisma.user.findFirst({
        where: {
          passwordHash,
          role: { in: ['ADMIN', 'MANAGER'] },
          isActive: true
        }
      })
      if (manager) {
        return { success: true, managerName: manager.name }
      }
      return { success: false, error: 'رمز مرور المدير غير صحيح' }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- CATEGORY HANDLERS ---
  ipcMain.handle('categories:list', async () => {
    try {
      const data = await prisma.category.findMany({ orderBy: { name: 'asc' } })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('categories:create', async (_, input) => {
    try {
      const data = await prisma.category.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('categories:delete', async (_, id) => {
    try {
      await prisma.category.delete({ where: { id } })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- UNIT HANDLERS ---
  ipcMain.handle('units:list', async () => {
    try {
      const data = await prisma.unit.findMany({ orderBy: { name: 'asc' } })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('units:create', async (_, input) => {
    try {
      const data = await prisma.unit.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('units:delete', async (_, id) => {
    try {
      await prisma.unit.delete({ where: { id } })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- WAREHOUSE HANDLERS ---
  ipcMain.handle('warehouses:list', async () => {
    try {
      const data = await prisma.warehouse.findMany({ orderBy: { name: 'asc' } })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('warehouses:create', async (_, input) => {
    try {
      const data = await prisma.warehouse.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('warehouses:delete', async (_, id) => {
    try {
      await prisma.warehouse.delete({ where: { id } })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- JOB TITLE HANDLERS ---
  ipcMain.handle('jobTitles:list', async () => {
    try {
      const data = await prisma.jobTitle.findMany({ orderBy: { title: 'asc' } })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('jobTitles:create', async (_, input) => {
    try {
      const data = await prisma.jobTitle.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('jobTitles:delete', async (_, id) => {
    try {
      await prisma.jobTitle.delete({ where: { id } })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- EMPLOYEE HANDLERS ---
  ipcMain.handle('employees:list', async () => {
    try {
      const data = await prisma.employee.findMany({
        include: { jobTitle: true },
        orderBy: { name: 'asc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('employees:create', async (_, input) => {
    try {
      const data = await prisma.employee.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('employees:delete', async (_, id) => {
    try {
      await prisma.employee.delete({ where: { id } })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- REVENUE HANDLERS ---
  ipcMain.handle('revenues:list', async () => {
    try {
      const data = await prisma.revenue.findMany({ orderBy: { date: 'desc' } })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('revenues:create', async (_, input) => {
    try {
      const data = await prisma.revenue.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('revenues:delete', async (_, id) => {
    try {
      await prisma.revenue.delete({ where: { id } })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- BANK HANDLERS ---
  ipcMain.handle('banks:list', async () => {
    try {
      const data = await prisma.bank.findMany({ orderBy: { name: 'asc' } })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('banks:create', async (_, input) => {
    try {
      const data = await prisma.bank.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('banks:delete', async (_, id) => {
    try {
      await prisma.bank.delete({ where: { id } })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- PRODUCT DELETE ---
  ipcMain.handle('products:delete', async (_, id) => {
    try {
      await prisma.product.update({
        where: { id },
        data: { isDeleted: true }
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- SUPPLIER DELETE ---
  ipcMain.handle('suppliers:delete', async (_, id) => {
    try {
      await prisma.supplier.update({
        where: { id },
        data: { isDeleted: true }
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- CLIENT HANDLERS ---
  ipcMain.handle('clients:list', async () => {
    try {
      const data = await prisma.client.findMany({
        where: { isDeleted: false },
        orderBy: { name: 'asc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('clients:create', async (_, input) => {
    try {
      const data = await prisma.client.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('clients:delete', async (_, id) => {
    try {
      await prisma.client.update({
        where: { id },
        data: { isDeleted: true }
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- USER DELETE ---
  ipcMain.handle('users:delete', async (_, id) => {
    try {
      await prisma.user.update({
        where: { id },
        data: { isActive: false }
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- EXPENSE DELETE ---
  ipcMain.handle('expenses:delete', async (_, id) => {
    try {
      await prisma.expense.delete({ where: { id } })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- VAULTS/CASH SAFES HANDLERS ---
  ipcMain.handle('vaults:list', async () => {
    try {
      const data = await prisma.vault.findMany({ orderBy: { name: 'asc' } })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('vaults:create', async (_, input) => {
    try {
      const data = await prisma.vault.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
  ipcMain.handle('vaults:delete', async (_, id) => {
    try {
      // Don't allow deleting the main vault
      if (id === 'main_vault') {
        return { success: false, error: 'لا يمكن حذف الخزينة الرئيسية' }
      }
      await prisma.vault.delete({ where: { id } })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- PURCHASES EXTENSIONS ---
  ipcMain.handle('purchases:list', async () => {
    try {
      const data = await prisma.purchaseInvoice.findMany({
        include: { supplier: true, items: { include: { product: true } } },
        orderBy: { date: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('purchases:createReturn', async (_, returnData) => {
    try {
      const { returnNumber, purchaseInvoiceId, supplierId, totalAmount, refundAmount, notes, userId, items } = returnData
      const result = await prisma.$transaction(async (tx) => {
        // Create Purchase Return record
        const pr = await tx.purchaseReturn.create({
          data: {
            returnNumber,
            purchaseInvoiceId,
            supplierId,
            totalAmount,
            refundAmount,
            notes,
            userId
          }
        })

        // Add return items and adjust stock
        for (const item of items) {
          await tx.purchaseReturnItem.create({
            data: {
              purchaseReturnId: pr.id,
              productId: item.productId,
              quantity: item.quantity,
              purchasePrice: item.purchasePrice
            }
          })

          // Reduce product stock
          await tx.product.update({
            where: { id: item.productId },
            data: { currentStock: { decrement: item.quantity } }
          })

          // Log product movement
          await tx.productMovement.create({
            data: {
              productId: item.productId,
              type: 'PURCHASE_RETURN',
              quantity: -item.quantity,
              referenceId: pr.id,
              notes: `مرتجع مشتريات #${returnNumber}`
            }
          })
        }

        // Adjust supplier balance (deduct what supplier owes us back)
        const outstanding = totalAmount - refundAmount
        if (outstanding > 0) {
          await tx.supplier.update({
            where: { id: supplierId },
            data: { balance: { decrement: outstanding } }
          })
        }

        // Adjust main vault if cash refund was issued immediately
        if (refundAmount > 0) {
          await tx.vault.update({
            where: { id: 'main_vault' },
            data: { currentBalance: { increment: refundAmount } }
          })
          await tx.vaultTransaction.create({
            data: {
              vaultId: 'main_vault',
              type: 'DEPOSIT',
              amount: refundAmount,
              referenceId: pr.id,
              notes: `مبلغ مسترجع نقدي مرتجع شراء #${returnNumber}`,
              userId
            }
          })
        }

        // Accounting Journal Entry
        await tx.journalEntry.create({
          data: {
            description: `مرتجع مشتريات #${returnNumber}`,
            referenceId: pr.id,
            debitAcc: refundAmount > 0 ? 'CASH' : 'PAYABLES',
            creditAcc: 'INVENTORY',
            amount: totalAmount
          }
        })

        return pr
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('purchases:listReturns', async () => {
    try {
      const data = await prisma.purchaseReturn.findMany({
        include: { supplier: true, items: { include: { product: true } } },
        orderBy: { date: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- SUPPLIER PAYMENTS & CHEQUES ---
  ipcMain.handle('supplierPayments:create', async (_, input) => {
    try {
      const { supplierId, amount, paymentMode, bankId, vaultId, notes } = input
      const result = await prisma.$transaction(async (tx) => {
        const payment = await tx.supplierPayment.create({ data: input })

        // Deduct from supplier balance (since we paid them)
        await tx.supplier.update({
          where: { id: supplierId },
          data: { balance: { decrement: amount } }
        })

        // Deduct money from Vault or Bank balance
        if (paymentMode === 'CASH' && vaultId) {
          await tx.vault.update({
            where: { id: vaultId },
            data: { currentBalance: { decrement: amount } }
          })
          await tx.vaultTransaction.create({
            data: {
              vaultId,
              type: 'WITHDRAWAL',
              amount,
              referenceId: payment.id,
              notes: notes || 'سداد حساب مورد نقداً',
              userId: 'admin' // default
            }
          })
        } else if (paymentMode === 'BANK' && bankId) {
          await tx.bank.update({
            where: { id: bankId },
            data: { currentBalance: { decrement: amount } }
          })
          await tx.bankTransaction.create({
            data: {
              bankId,
              type: 'WITHDRAWAL',
              amount,
              referenceId: payment.id,
              notes: notes || 'سداد حساب مورد تحويل بنكي'
            }
          })
        }

        // Journal entry
        await tx.journalEntry.create({
          data: {
            description: `سداد حساب مورد - دفعة`,
            referenceId: payment.id,
            debitAcc: 'PAYABLES',
            creditAcc: paymentMode === 'CASH' ? 'CASH' : 'BANK',
            amount
          }
        })

        return payment
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('supplierPayments:list', async () => {
    try {
      const data = await prisma.supplierPayment.findMany({
        include: { supplier: true },
        orderBy: { date: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('supplierCheques:create', async (_, input) => {
    try {
      const data = await prisma.supplierCheque.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('supplierCheques:list', async () => {
    try {
      const data = await prisma.supplierCheque.findMany({
        include: { supplier: true, bank: true },
        orderBy: { dueDate: 'asc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('supplierCheques:updateStatus', async (_, { id, status }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const cheque = await tx.supplierCheque.update({
          where: { id },
          data: { status }
        })

        if (status === 'PAID') {
          // Deduct from bank balance if PAID
          if (cheque.bankId) {
            await tx.bank.update({
              where: { id: cheque.bankId },
              data: { currentBalance: { decrement: cheque.amount } }
            })
            await tx.bankTransaction.create({
              data: {
                bankId: cheque.bankId,
                type: 'WITHDRAWAL',
                amount: cheque.amount,
                referenceId: cheque.id,
                notes: `صرف شيك مورد رقم #${cheque.chequeNumber}`
              }
            })
          }
        }
        return cheque
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- CLIENT PAYMENTS & CHEQUES ---
  ipcMain.handle('clientPayments:create', async (_, input) => {
    try {
      const { clientId, amount, paymentMode, bankId, vaultId, notes } = input
      const result = await prisma.$transaction(async (tx) => {
        const payment = await tx.clientPayment.create({ data: input })

        // Deduct from client balance (they owe us less now)
        await tx.client.update({
          where: { id: clientId },
          data: { currentBalance: { decrement: amount } }
        })

        // Add to Vault or Bank
        if (paymentMode === 'CASH' && vaultId) {
          await tx.vault.update({
            where: { id: vaultId },
            data: { currentBalance: { increment: amount } }
          })
          await tx.vaultTransaction.create({
            data: {
              vaultId,
              type: 'DEPOSIT',
              amount,
              referenceId: payment.id,
              notes: notes || 'تحصيل من عميل نقداً',
              userId: 'admin'
            }
          })
        } else if (paymentMode === 'BANK' && bankId) {
          await tx.bank.update({
            where: { id: bankId },
            data: { currentBalance: { increment: amount } }
          })
          await tx.bankTransaction.create({
            data: {
              bankId,
              type: 'DEPOSIT',
              amount,
              referenceId: payment.id,
              notes: notes || 'تحصيل من عميل تحويل بنكي'
            }
          })
        }

        // Journal entry
        await tx.journalEntry.create({
          data: {
            description: `تحصيل دفعة حساب عميل`,
            referenceId: payment.id,
            debitAcc: paymentMode === 'CASH' ? 'CASH' : 'BANK',
            creditAcc: 'RECEIVABLES',
            amount
          }
        })

        return payment
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('clientPayments:list', async () => {
    try {
      const data = await prisma.clientPayment.findMany({
        include: { client: true },
        orderBy: { date: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('clientCheques:create', async (_, input) => {
    try {
      const data = await prisma.clientCheque.create({ data: input })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('clientCheques:list', async () => {
    try {
      const data = await prisma.clientCheque.findMany({
        include: { client: true, bank: true },
        orderBy: { dueDate: 'asc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('clientCheques:updateStatus', async (_, { id, status }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const cheque = await tx.clientCheque.update({
          where: { id },
          data: { status }
        })

        if (status === 'PAID') {
          if (cheque.bankId) {
            await tx.bank.update({
              where: { id: cheque.bankId },
              data: { currentBalance: { increment: cheque.amount } }
            })
            await tx.bankTransaction.create({
              data: {
                bankId: cheque.bankId,
                type: 'DEPOSIT',
                amount: cheque.amount,
                referenceId: cheque.id,
                notes: `إيداع شيك عميل رقم #${cheque.chequeNumber}`
              }
            })
          }
        }
        return cheque
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- PRICE QUOTATIONS ---
  ipcMain.handle('quotations:create', async (_, quotationData) => {
    try {
      const { quotationNumber, clientId, clientName, subtotal, discount, totalAmount, notes, userId, items } = quotationData
      const result = await prisma.$transaction(async (tx) => {
        const quote = await tx.priceQuotation.create({
          data: {
            quotationNumber,
            clientId,
            clientName,
            subtotal,
            discount,
            totalAmount,
            notes,
            userId
          }
        })

        for (const item of items) {
          await tx.priceQuotationItem.create({
            data: {
              quotationId: quote.id,
              productId: item.productId,
              quantity: item.quantity,
              sellPrice: item.sellPrice
            }
          })
        }
        return quote
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('quotations:list', async () => {
    try {
      const data = await prisma.priceQuotation.findMany({
        include: { client: true, items: { include: { product: true } } },
        orderBy: { date: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('quotations:delete', async (_, id) => {
    try {
      await prisma.priceQuotation.delete({ where: { id } })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- WAREHOUSE STOCKS & TRANSFERS ---
  ipcMain.handle('transfers:create', async (_, input) => {
    try {
      const { transferNumber, sourceWarehouseId, targetWarehouseId, notes, userId, items } = input
      const result = await prisma.$transaction(async (tx) => {
        const transfer = await tx.stockTransfer.create({
          data: {
            transferNumber,
            sourceWarehouseId,
            targetWarehouseId,
            notes,
            userId
          }
        })

        for (const item of items) {
          await tx.stockTransferItem.create({
            data: {
              transferId: transfer.id,
              productId: item.productId,
              quantity: item.quantity
            }
          })

          // Update stock movements
          await tx.productMovement.create({
            data: {
              productId: item.productId,
              type: 'TRANSFER_OUT',
              quantity: -item.quantity,
              referenceId: transfer.id,
              warehouseId: sourceWarehouseId,
              notes: `تحويل خارج إلى مستودع آخر #${transferNumber}`
            }
          })

          await tx.productMovement.create({
            data: {
              productId: item.productId,
              type: 'TRANSFER_IN',
              quantity: item.quantity,
              referenceId: transfer.id,
              warehouseId: targetWarehouseId,
              notes: `تحويل وارد من مستودع آخر #${transferNumber}`
            }
          })
        }

        return transfer
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('transfers:list', async () => {
    try {
      const data = await prisma.stockTransfer.findMany({
        include: {
          sourceWarehouse: true,
          targetWarehouse: true,
          items: { include: { product: true } }
        },
        orderBy: { date: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('inventory:movement', async (_, productId) => {
    try {
      const data = await prisma.productMovement.findMany({
        where: { productId },
        include: { warehouse: true },
        orderBy: { date: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('inventory:listAllMovements', async () => {
    try {
      const data = await prisma.productMovement.findMany({
        include: { warehouse: true, product: true },
        orderBy: { date: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- EMPLOYEE SALARY ADVANCES & PAYROLL ---
  ipcMain.handle('employees:addTransaction', async (_, input) => {
    try {
      const { type, amount, notes, vaultId } = input
      const result = await prisma.$transaction(async (tx) => {
        const trans = await tx.employeeTransaction.create({ data: input })

        // If it's an advance (سلفة), deduct from selected vault
        if (type === 'ADVANCE' && vaultId) {
          await tx.vault.update({
            where: { id: vaultId },
            data: { currentBalance: { decrement: amount } }
          })
          await tx.vaultTransaction.create({
            data: {
              vaultId,
              type: 'WITHDRAWAL',
              amount,
              referenceId: trans.id,
              notes: notes || `سلفة لموظف`,
              userId: 'admin'
            }
          })
        }
        return trans
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('employees:paySalary', async (_, { employeeId, amount, notes, vaultId }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const trans = await tx.employeeTransaction.create({
          data: {
            employeeId,
            type: 'SALARY',
            amount,
            notes,
            vaultId
          }
        })

        // Deduct from vault
        if (vaultId) {
          await tx.vault.update({
            where: { id: vaultId },
            data: { currentBalance: { decrement: amount } }
          })
          await tx.vaultTransaction.create({
            data: {
              vaultId,
              type: 'WITHDRAWAL',
              amount,
              referenceId: trans.id,
              notes: notes || `صرف راتب الموظف`,
              userId: 'admin'
            }
          })
        }
        return trans
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('employees:getTransactions', async (_, employeeId) => {
    try {
      const data = await prisma.employeeTransaction.findMany({
        where: { employeeId },
        orderBy: { date: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- CASH SAFES / VAULTS EXTRA ACTIONS ---
  ipcMain.handle('vaults:cashIn', async (_, { vaultId, amount, notes, userId }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        await tx.vault.update({
          where: { id: vaultId },
          data: { currentBalance: { increment: amount } }
        })
        const vt = await tx.vaultTransaction.create({
          data: {
            vaultId,
            type: 'DEPOSIT',
            amount,
            notes: notes || 'توريد نقدية يدوي',
            userId
          }
        })
        return vt
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('vaults:cashOut', async (_, { vaultId, amount, notes, userId }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        await tx.vault.update({
          where: { id: vaultId },
          data: { currentBalance: { decrement: amount } }
        })
        const vt = await tx.vaultTransaction.create({
          data: {
            vaultId,
            type: 'WITHDRAWAL',
            amount,
            notes: notes || 'صرف نقدية يدوي',
            userId
          }
        })
        return vt
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('vaults:transferToVault', async (_, { fromVaultId, toVaultId, amount, notes, userId }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        await tx.vault.update({
          where: { id: fromVaultId },
          data: { currentBalance: { decrement: amount } }
        })
        await tx.vault.update({
          where: { id: toVaultId },
          data: { currentBalance: { increment: amount } }
        })

        const t1 = await tx.vaultTransaction.create({
          data: {
            vaultId: fromVaultId,
            type: 'WITHDRAWAL',
            amount,
            notes: notes || `تحويل صادرة إلى خزينة أخرى`,
            userId
          }
        })

        await tx.vaultTransaction.create({
          data: {
            vaultId: toVaultId,
            type: 'DEPOSIT',
            amount,
            notes: notes || `تحويل واردة من خزينة أخرى`,
            userId
          }
        })
        return t1
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('vaults:transferToBank', async (_, { vaultId, bankId, amount, notes, userId }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        await tx.vault.update({
          where: { id: vaultId },
          data: { currentBalance: { decrement: amount } }
        })
        await tx.bank.update({
          where: { id: bankId },
          data: { currentBalance: { increment: amount } }
        })

        const vt = await tx.vaultTransaction.create({
          data: {
            vaultId,
            type: 'WITHDRAWAL',
            amount,
            notes: notes || `إيداع نقدي بالبنك`,
            userId
          }
        })

        await tx.bankTransaction.create({
          data: {
            bankId,
            type: 'DEPOSIT',
            amount,
            referenceId: vt.id,
            notes: notes || `تحويل وارد من الخزينة`
          }
        })
        return vt
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('vaults:getTransactions', async (_, vaultId) => {
    try {
      const data = await prisma.vaultTransaction.findMany({
        where: { vaultId },
        orderBy: { createdAt: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- BANKS EXTRA ACTIONS ---
  ipcMain.handle('banks:deposit', async (_, { bankId, amount, notes }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        await tx.bank.update({
          where: { id: bankId },
          data: { currentBalance: { increment: amount } }
        })
        const bt = await tx.bankTransaction.create({
          data: {
            bankId,
            type: 'DEPOSIT',
            amount,
            notes: notes || 'إيداع يدوي بالبنك'
          }
        })
        return bt
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('banks:withdraw', async (_, { bankId, amount, notes }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        await tx.bank.update({
          where: { id: bankId },
          data: { currentBalance: { decrement: amount } }
        })
        const bt = await tx.bankTransaction.create({
          data: {
            bankId,
            type: 'WITHDRAWAL',
            amount,
            notes: notes || 'سحب يدوي من البنك'
          }
        })
        return bt
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('banks:transferToVault', async (_, { bankId, vaultId, amount, notes, userId }) => {
    try {
      const result = await prisma.$transaction(async (tx) => {
        await tx.bank.update({
          where: { id: bankId },
          data: { currentBalance: { decrement: amount } }
        })
        await tx.vault.update({
          where: { id: vaultId },
          data: { currentBalance: { increment: amount } }
        })

        const bt = await tx.bankTransaction.create({
          data: {
            bankId,
            type: 'TRANSFER_OUT',
            amount,
            notes: notes || 'تحويل إلى خزينة'
          }
        })

        await tx.vaultTransaction.create({
          data: {
            vaultId,
            type: 'DEPOSIT',
            amount,
            referenceId: bt.id,
            notes: notes || 'سحب بنكي وتغذية خزينة',
            userId
          }
        })
        return bt
      })
      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('banks:getTransactions', async (_, bankId) => {
    try {
      const data = await prisma.bankTransaction.findMany({
        where: { bankId },
        orderBy: { date: 'desc' }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- PROFITS AND ANALYTICS HANDLERS ---
  ipcMain.handle('profits:getInvoiceProfits', async () => {
    try {
      const invoices = await prisma.salesInvoice.findMany({
        include: { items: { include: { product: true } } },
        orderBy: { date: 'desc' }
      })

      const data = invoices.map(inv => {
        let cogs = 0
        inv.items.forEach(item => {
          cogs += item.quantity * (item.product?.purchasePrice || 0)
        })
        const netProfit = inv.totalAmount - cogs
        return {
          id: inv.id,
          invoiceNumber: inv.invoiceNumber,
          date: inv.date,
          totalAmount: inv.totalAmount,
          cogs,
          netProfit
        }
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('profits:getReport', async (_, { startDate, endDate }) => {
    try {
      const start = startDate ? new Date(startDate) : new Date(0)
      const end = endDate ? new Date(endDate) : new Date()

      const invoices = await prisma.salesInvoice.findMany({
        where: { date: { gte: start, lte: end } },
        include: { items: { include: { product: true } }, client: true }
      })

      let totalSales = 0
      let totalCogs = 0
      let productProfits: Record<string, { name: string; qty: number; revenue: number; profit: number }> = {}
      let categoryProfits: Record<string, { name: string; revenue: number; profit: number }> = {}
      let clientProfits: Record<string, { name: string; revenue: number; profit: number }> = {}

      invoices.forEach(inv => {
        totalSales += inv.totalAmount
        const clientName = inv.client?.name || 'عميل نقدي'
        const clientId = inv.clientId || 'guest'

        if (!clientProfits[clientId]) {
          clientProfits[clientId] = { name: clientName, revenue: 0, profit: 0 }
        }
        clientProfits[clientId].revenue += inv.totalAmount

        inv.items.forEach(item => {
          const itemCost = item.quantity * (item.product?.purchasePrice || 0)
          const itemRev = item.quantity * item.sellPrice - item.discount
          const itemProfit = itemRev - itemCost
          totalCogs += itemCost

          clientProfits[clientId].profit += itemProfit

          if (item.product) {
            const pId = item.product.id
            if (!productProfits[pId]) {
              productProfits[pId] = { name: item.product.name, qty: 0, revenue: 0, profit: 0 }
            }
            productProfits[pId].qty += item.quantity
            productProfits[pId].revenue += itemRev
            productProfits[pId].profit += itemProfit

            const cat = item.product.category || 'غير مصنف'
            if (!categoryProfits[cat]) {
              categoryProfits[cat] = { name: cat, revenue: 0, profit: 0 }
            }
            categoryProfits[cat].revenue += itemRev
            categoryProfits[cat].profit += itemProfit
          }
        })
      })

      const expenses = await prisma.expense.findMany({
        where: { createdAt: { gte: start, lte: end } }
      })
      const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0)

      return {
        success: true,
        data: {
          totalSales,
          totalCogs,
          grossProfit: totalSales - totalCogs,
          totalExpenses,
          netProfit: totalSales - totalCogs - totalExpenses,
          productProfits: Object.values(productProfits),
          categoryProfits: Object.values(categoryProfits),
          clientProfits: Object.values(clientProfits)
        }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- SYSTEM RESET DATA ---
  ipcMain.handle('settings:resetData', async (_, { username, password }) => {
    try {
      if (!username || !password) {
        return { success: false, error: '⚠️ يجب تأكيد الهوية باستخدام اسم مستخدم وكلمة مرور المشرف لإعادة الضبط' }
      }

      // Verify that the user is an active ADMIN or MANAGER and credentials match
      const user = await prisma.user.findFirst({
        where: {
          username,
          isActive: true,
          role: { in: ['ADMIN', 'MANAGER'] }
        }
      })

      if (!user) {
        return { success: false, error: '⚠️ لم يتم العثور على مشرف بهذا الاسم أو ليس لديك صلاحية' }
      }

      const userSalt = user.passwordSalt || ''
      let isValid = false
      if (userSalt) {
        const computedHash = crypto.pbkdf2Sync(password, userSalt, 10000, 64, 'sha512').toString('hex')
        isValid = (user.passwordHash === computedHash)
      } else {
        const computedHash = crypto.createHash('sha256').update(password).digest('hex')
        isValid = (user.passwordHash === computedHash)
      }

      if (!isValid) {
        return { success: false, error: '⚠️ كلمة المرور للمشرف غير صحيحة' }
      }
      await prisma.$transaction(async (tx) => {
        await tx.salesItem.deleteMany({})
        await tx.salesInvoice.deleteMany({})
        await tx.returnItem.deleteMany({})
        await tx.returnInvoice.deleteMany({})
        await tx.purchaseItem.deleteMany({})
        await tx.purchaseInvoice.deleteMany({})
        await tx.purchaseReturnItem.deleteMany({})
        await tx.purchaseReturn.deleteMany({})
        await tx.installment.deleteMany({})
        await tx.expense.deleteMany({})
        await tx.revenue.deleteMany({})
        await tx.journalEntry.deleteMany({})
        await tx.supplierPayment.deleteMany({})
        await tx.clientPayment.deleteMany({})
        await tx.supplierCheque.deleteMany({})
        await tx.clientCheque.deleteMany({})
        await tx.priceQuotationItem.deleteMany({})
        await tx.priceQuotation.deleteMany({})
        await tx.stockTransferItem.deleteMany({})
        await tx.stockTransfer.deleteMany({})
        await tx.productMovement.deleteMany({})
        await tx.employeeTransaction.deleteMany({})
        await tx.bankTransaction.deleteMany({})
        await tx.vaultTransaction.deleteMany({})
        await tx.shift.deleteMany({})

        await tx.supplier.updateMany({ data: { balance: 0.0 } })
        await tx.client.updateMany({ data: { currentBalance: 0.0 } })
        await tx.product.updateMany({ data: { currentStock: 0 } })
        await tx.vault.updateMany({ data: { currentBalance: 0.0 } })
        await tx.bank.updateMany({ data: { currentBalance: 0.0 } })
      })

      // Log the critical reset action AFTER data is wiped
      await logActivity({
        action: 'SYSTEM_RESET',
        module: 'SETTINGS',
        description: `⚠️ تم تنفيذ إعادة ضبط النظام وحذف جميع البيانات التشغيلية`,
        severity: 'CRITICAL',
        metadata: { timestamp: new Date().toISOString() }
      })

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // ─────────────────────────────────────────────────────────────────────────
  // ACTIVITY LOG HANDLERS
  // ─────────────────────────────────────────────────────────────────────────

  ipcMain.handle('activityLog:list', async (_, filters?: {
    userId?: string
    module?: string
    severity?: string
    action?: string
    startDate?: string
    endDate?: string
    search?: string
    limit?: number
  }) => {
    try {
      const where: any = {}
      if (filters?.userId) where.userId = filters.userId
      if (filters?.module) where.module = filters.module
      if (filters?.severity) where.severity = filters.severity
      if (filters?.action) where.action = filters.action
      if (filters?.search) {
        where.description = { contains: filters.search }
      }
      if (filters?.startDate || filters?.endDate) {
        where.createdAt = {}
        if (filters.startDate) where.createdAt.gte = new Date(filters.startDate)
        if (filters.endDate) where.createdAt.lte = new Date(filters.endDate + 'T23:59:59')
      }

      const data = await prisma.activityLog.findMany({
        where,
        include: { user: { select: { name: true, role: true, username: true } } },
        orderBy: { createdAt: 'desc' },
        take: filters?.limit ?? 500
      })
      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('activityLog:clear', async (_, { beforeDate }: { beforeDate: string }) => {
    try {
      const result = await prisma.activityLog.deleteMany({
        where: {
          createdAt: { lt: new Date(beforeDate) }
        }
      })
      await logActivity({
        action: 'ACTIVITY_LOG_CLEARED',
        module: 'SETTINGS',
        description: `تم حذف ${result.count} سجل نشاط قديم قبل ${beforeDate}`,
        severity: 'WARNING',
        metadata: { deletedCount: result.count, beforeDate }
      })
      return { success: true, deletedCount: result.count }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  // --- INVENTORY AUDIT SESSIONS HANDLERS ---
  ipcMain.handle('inventory:createAudit', async (_, auditData) => {
    try {
      const { warehouseId, userId, notes, items } = auditData
      const auditNumber = 'AUDIT-' + Date.now()

      const result = await prisma.$transaction(async (tx) => {
        // Create audit session
        const audit = await tx.inventoryAudit.create({
          data: {
            auditNumber,
            warehouseId,
            userId,
            notes,
            status: 'COMPLETED'
          }
        })

        // Process audit items and adjust product stock level
        for (const item of items) {
          const diff = item.actualStock - item.systemStock
          
          await tx.inventoryAuditItem.create({
            data: {
              inventoryAuditId: audit.id,
              productId: item.productId,
              systemStock: item.systemStock,
              actualStock: item.actualStock,
              difference: diff
            }
          })

          // Adjust actual stock
          await tx.product.update({
            where: { id: item.productId },
            data: { currentStock: item.actualStock }
          })

          // Log product movement
          await tx.productMovement.create({
            data: {
              productId: item.productId,
              type: 'ADJUSTMENT',
              quantity: diff,
              referenceId: audit.id,
              warehouseId,
              notes: `تسوية جرد صنف (عجز/زيادة: ${diff})`
            }
          })
        }

        return audit
      })

      await logActivity({
        userId,
        action: 'INVENTORY_AUDIT_COMPLETED',
        module: 'INVENTORY',
        entityId: result.id,
        entityType: 'InventoryAudit',
        description: `جلسة جرد رقم ${auditNumber} تمت تسويتها بنجاح.`,
        severity: 'WARNING'
      })

      return { success: true, data: result }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('inventory:listAudits', async () => {
    try {
      const audits = await prisma.inventoryAudit.findMany({
        include: {
          warehouse: true,
          user: { select: { name: true } },
          items: { include: { product: true } }
        },
        orderBy: { date: 'desc' }
      })
      return { success: true, data: audits }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })
}

