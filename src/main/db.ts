import { app } from 'electron'
import path from 'path'
import fs from 'fs'

// ─── Config Setup ───────────────────────────────────────────────────────────
const userDataDir = app ? app.getPath('userData') : process.cwd()
const fallbackConfigPath = path.join(userDataDir, 'database_config.json')

// Also check installer-written config next to EXE
const appDir = app ? path.dirname(app.getPath('exe')) : process.cwd()
const installerConfigPath = path.join(appDir, 'database_config.json')

// Determine which config to read (installer config takes priority)
let configPath = fallbackConfigPath
if (fs.existsSync(installerConfigPath)) {
  configPath = installerConfigPath
} else if (!fs.existsSync(fallbackConfigPath)) {
  // No config anywhere → create a default SQLite config in AppData
  try {
    fs.mkdirSync(userDataDir, { recursive: true })
    const defaultDbUrl = `file:${path.join(userDataDir, 'servio.db').replace(/\\/g, '/')}`
    fs.writeFileSync(
      fallbackConfigPath,
      JSON.stringify({ databaseUrl: defaultDbUrl, dbType: 'sqlite' }, null, 2),
      'utf8'
    )
  } catch (err) {
    console.error('[DB] Failed to create default config:', err)
  }
}

let databaseUrl = ''
let dbType = ''

// Read config
try {
  const raw = fs.readFileSync(configPath, 'utf8')
  const cfg = JSON.parse(raw)
  databaseUrl = cfg.databaseUrl || `file:${path.join(userDataDir, 'servio.db').replace(/\\/g, '/')}`
  dbType = cfg.dbType || 'sqlite'
} catch (err) {
  console.error('[DB] Failed to read config, using default AppData SQLite:', err)
  databaseUrl = `file:${path.join(userDataDir, 'servio.db').replace(/\\/g, '/')}`
  dbType = 'sqlite'
}

// Ensure SQLite path is absolute
if (databaseUrl.startsWith('file:')) {
  const p = databaseUrl.slice(5)
  if (!path.isAbsolute(p)) {
    databaseUrl = `file:${path.join(userDataDir, p).replace(/\\/g, '/')}`
  }
}

// Set env for Prisma
process.env.DATABASE_URL = databaseUrl
console.log(`[DB] Mode: ${dbType} | URL: ${databaseUrl.replace(/:([^:@]+)@/, ':****@')}`)

// ─── Prisma Client ──────────────────────────────────────────────────────────
export let prisma: any = null
export let dbInitError: string | null = null
export { dbType, databaseUrl }

try {
  if (dbType === 'postgresql') {
    console.log('[DB] Loading PostgreSQL Prisma Client...')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require('@prisma/client-postgresql')
    prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } })
  } else {
    console.log('[DB] Loading SQLite Prisma Client...')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require('@prisma/client-sqlite')
    prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } })
  }
} catch (err: any) {
  const errMsg = err?.message || String(err)
  console.error('[DB] FATAL ERROR: Failed to load Prisma Client:', err)
  dbInitError = `فشل تحميل محرك قاعدة البيانات (Prisma Client). التفاصيل: ${errMsg}`
}

// ─── Database Initialization ────────────────────────────────────────────────
export async function initializeDatabase(): Promise<void> {
  if (dbInitError) throw new Error(dbInitError)
  if (!prisma) throw new Error('لم يتم إنشاء كائن Prisma Client بنجاح (فشل غير معروف)')

  try {
    await prisma.$connect()

    // Check if tables already exist
    let isReady = false
    try {
      if (dbType === 'sqlite') {
        const rows: any[] = await prisma.$queryRawUnsafe(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='User';`
        )
        isReady = rows.length > 0
      } else {
        const rows: any[] = await prisma.$queryRawUnsafe(
          `SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename='User';`
        )
        isReady = rows.length > 0
      }
    } catch {
      console.log('[DB] Could not check tables.')
    }

    if (!isReady) {
      console.log('[DB] Tables not found, initializing schema...')
      if (dbType === 'sqlite') {
        await initSQLiteSchema()
      } else {
        throw new Error('قاعدة بيانات PostgreSQL غير موجودة. يرجى إنشاء الجداول يدوياً أو استخدام SQLite.')
      }
    }

    await seedDefaultData()
    console.log('[DB] Database ready.')
  } catch (error: any) {
    console.error('[DB] Initialization failed:', error)
    dbInitError = error?.message || String(error)
    throw error
  }
}

// ─── Initialize SQLite Schema directly via SQL ──────────────────────────────
async function initSQLiteSchema(): Promise<void> {
  // Read the pre-built SQL schema file from resources
  let schemaSQL = ''
  try {
    if (app && app.isPackaged) {
      const schemaPath = path.join(process.resourcesPath, 'schema.sql')
      schemaSQL = fs.readFileSync(schemaPath, 'utf8')
    } else {
      const schemaPath = path.join(process.cwd(), 'src', 'main', 'schema.sql')
      schemaSQL = fs.readFileSync(schemaPath, 'utf8')
    }
  } catch (err) {
    console.error('[DB] Could not read schema.sql, using embedded schema:', err)
    schemaSQL = getEmbeddedSchema()
  }

  // Split on semicolons and execute each statement
  const statements = schemaSQL
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith('--'))

  for (const stmt of statements) {
    try {
      await prisma.$executeRawUnsafe(stmt + ';')
    } catch (err: any) {
      // Ignore "already exists" errors
      if (!err?.message?.includes('already exists')) {
        console.warn('[DB] Statement warning:', err?.message?.slice(0, 100))
      }
    }
  }
  console.log('[DB] SQLite schema initialized successfully via SQL.')
}

// ─── Embedded fallback schema ───────────────────────────────────────────────
function getEmbeddedSchema(): string {
  return `
PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS "User" ("id" TEXT NOT NULL PRIMARY KEY,"username" TEXT NOT NULL UNIQUE,"passwordHash" TEXT NOT NULL,"passwordSalt" TEXT NOT NULL DEFAULT '','role' TEXT NOT NULL,"name" TEXT NOT NULL,"phone" TEXT,"isActive" INTEGER NOT NULL DEFAULT 1,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" DATETIME NOT NULL);
CREATE TABLE IF NOT EXISTS "Shift" ("id" TEXT NOT NULL PRIMARY KEY,"userId" TEXT NOT NULL,"startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"endTime" DATETIME,"startingCash" REAL NOT NULL,"expectedCash" REAL NOT NULL DEFAULT 0.0,"actualCash" REAL,"notes" TEXT,"status" TEXT NOT NULL DEFAULT 'OPEN',"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE);
CREATE TABLE IF NOT EXISTS "Product" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL,"barcode" TEXT NOT NULL UNIQUE,"purchasePrice" REAL NOT NULL,"sellPrice" REAL NOT NULL,"minStockLevel" INTEGER NOT NULL DEFAULT 5,"currentStock" INTEGER NOT NULL DEFAULT 0,"expiryDate" DATETIME,"category" TEXT,"isDeleted" INTEGER NOT NULL DEFAULT 0,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" DATETIME NOT NULL,"wholesalePrice" REAL DEFAULT 0.0,"semiWholesalePrice" REAL DEFAULT 0.0,"unit" TEXT DEFAULT 'قطعة',"hasExpiry" INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS "Supplier" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL,"contactPerson" TEXT,"phone" TEXT,"address" TEXT,"balance" REAL NOT NULL DEFAULT 0.0,"isDeleted" INTEGER NOT NULL DEFAULT 0,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" DATETIME NOT NULL);
CREATE TABLE IF NOT EXISTS "PurchaseInvoice" ("id" TEXT NOT NULL PRIMARY KEY,"invoiceNumber" TEXT NOT NULL UNIQUE,"supplierId" TEXT NOT NULL,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"totalAmount" REAL NOT NULL,"paidAmount" REAL NOT NULL DEFAULT 0.0,"status" TEXT NOT NULL DEFAULT 'CREDIT',"notes" TEXT,"userId" TEXT NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" DATETIME NOT NULL,FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id"),FOREIGN KEY ("userId") REFERENCES "User"("id"));
CREATE TABLE IF NOT EXISTS "PurchaseItem" ("id" TEXT NOT NULL PRIMARY KEY,"purchaseInvoiceId" TEXT NOT NULL,"productId" TEXT NOT NULL,"quantity" INTEGER NOT NULL,"purchasePrice" REAL NOT NULL,"expiryDate" DATETIME,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("purchaseInvoiceId") REFERENCES "PurchaseInvoice"("id") ON DELETE CASCADE,FOREIGN KEY ("productId") REFERENCES "Product"("id"));
CREATE TABLE IF NOT EXISTS "Client" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL,"phone" TEXT,"address" TEXT,"creditLimit" REAL NOT NULL DEFAULT 1000.0,"currentBalance" REAL NOT NULL DEFAULT 0.0,"isDeleted" INTEGER NOT NULL DEFAULT 0,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" DATETIME NOT NULL);
CREATE TABLE IF NOT EXISTS "DeliveryDriver" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL,"phone" TEXT,"isActive" INTEGER NOT NULL DEFAULT 1,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "SalesInvoice" ("id" TEXT NOT NULL PRIMARY KEY,"invoiceNumber" TEXT NOT NULL UNIQUE,"clientId" TEXT,"userId" TEXT NOT NULL,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"subtotal" REAL NOT NULL,"discount" REAL NOT NULL DEFAULT 0.0,"totalAmount" REAL NOT NULL,"paidAmount" REAL NOT NULL DEFAULT 0.0,"paymentType" TEXT NOT NULL DEFAULT 'CASH',"status" TEXT NOT NULL DEFAULT 'PAID',"shiftId" TEXT NOT NULL,"isDelivery" INTEGER NOT NULL DEFAULT 0,"deliveryDriverId" TEXT,"deliveryStatus" TEXT,"notes" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" DATETIME NOT NULL,FOREIGN KEY ("clientId") REFERENCES "Client"("id"),FOREIGN KEY ("userId") REFERENCES "User"("id"),FOREIGN KEY ("shiftId") REFERENCES "Shift"("id"),FOREIGN KEY ("deliveryDriverId") REFERENCES "DeliveryDriver"("id"));
CREATE TABLE IF NOT EXISTS "SalesItem" ("id" TEXT NOT NULL PRIMARY KEY,"salesInvoiceId" TEXT NOT NULL,"productId" TEXT NOT NULL,"quantity" INTEGER NOT NULL,"sellPrice" REAL NOT NULL,"discount" REAL NOT NULL DEFAULT 0.0,"isReturned" INTEGER NOT NULL DEFAULT 0,"returnedQty" INTEGER NOT NULL DEFAULT 0,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("salesInvoiceId") REFERENCES "SalesInvoice"("id") ON DELETE CASCADE,FOREIGN KEY ("productId") REFERENCES "Product"("id"));
CREATE TABLE IF NOT EXISTS "ReturnInvoice" ("id" TEXT NOT NULL PRIMARY KEY,"originalSalesInvoiceId" TEXT NOT NULL,"userId" TEXT NOT NULL,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"totalRefunded" REAL NOT NULL,"shiftId" TEXT NOT NULL,"notes" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("originalSalesInvoiceId") REFERENCES "SalesInvoice"("id"),FOREIGN KEY ("userId") REFERENCES "User"("id"),FOREIGN KEY ("shiftId") REFERENCES "Shift"("id"));
CREATE TABLE IF NOT EXISTS "ReturnItem" ("id" TEXT NOT NULL PRIMARY KEY,"returnInvoiceId" TEXT NOT NULL,"productId" TEXT NOT NULL,"quantity" INTEGER NOT NULL,"refundPrice" REAL NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("returnInvoiceId") REFERENCES "ReturnInvoice"("id") ON DELETE CASCADE,FOREIGN KEY ("productId") REFERENCES "Product"("id"));
CREATE TABLE IF NOT EXISTS "Installment" ("id" TEXT NOT NULL PRIMARY KEY,"clientId" TEXT NOT NULL,"salesInvoiceId" TEXT NOT NULL,"amount" REAL NOT NULL,"dueDate" DATETIME NOT NULL,"paidAmount" REAL NOT NULL DEFAULT 0.0,"paidDate" DATETIME,"status" TEXT NOT NULL DEFAULT 'PENDING',"notes" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("clientId") REFERENCES "Client"("id"),FOREIGN KEY ("salesInvoiceId") REFERENCES "SalesInvoice"("id") ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS "Vault" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL DEFAULT 'Main Vault',"currentBalance" REAL NOT NULL DEFAULT 0.0,"updatedAt" DATETIME NOT NULL);
CREATE TABLE IF NOT EXISTS "VaultTransaction" ("id" TEXT NOT NULL PRIMARY KEY,"vaultId" TEXT NOT NULL,"type" TEXT NOT NULL,"amount" REAL NOT NULL,"referenceId" TEXT,"notes" TEXT,"userId" TEXT NOT NULL,"shiftId" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("vaultId") REFERENCES "Vault"("id"),FOREIGN KEY ("userId") REFERENCES "User"("id"),FOREIGN KEY ("shiftId") REFERENCES "Shift"("id"));
CREATE TABLE IF NOT EXISTS "Expense" ("id" TEXT NOT NULL PRIMARY KEY,"category" TEXT NOT NULL,"amount" REAL NOT NULL,"description" TEXT,"userId" TEXT NOT NULL,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"shiftId" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("userId") REFERENCES "User"("id"),FOREIGN KEY ("shiftId") REFERENCES "Shift"("id"));
CREATE TABLE IF NOT EXISTS "Partner" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL,"sharePercentage" REAL NOT NULL,"balance" REAL NOT NULL DEFAULT 0.0,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"updatedAt" DATETIME NOT NULL);
CREATE TABLE IF NOT EXISTS "PartnerTransaction" ("id" TEXT NOT NULL PRIMARY KEY,"partnerId" TEXT NOT NULL,"type" TEXT NOT NULL,"amount" REAL NOT NULL,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"notes" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS "Settings" ("id" INTEGER NOT NULL PRIMARY KEY,"storeName" TEXT NOT NULL DEFAULT 'My POS Store',"storeLogo" TEXT,"storePhone" TEXT,"storeAddress" TEXT,"receiptFooter" TEXT,"printerConfig" TEXT,"taxNumber" TEXT,"commercialRegister" TEXT,"landline" TEXT,"mobile1" TEXT,"mobile2" TEXT,"updatedAt" DATETIME NOT NULL,"costingMethod" TEXT NOT NULL DEFAULT 'AVERAGE',"scalePrefix" TEXT NOT NULL DEFAULT '20',"scaleSkuLength" INTEGER NOT NULL DEFAULT 5,"scaleValueMode" TEXT NOT NULL DEFAULT 'WEIGHT');
CREATE TABLE IF NOT EXISTS "JournalEntry" ("id" TEXT NOT NULL PRIMARY KEY,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" TEXT NOT NULL,"referenceId" TEXT,"debitAcc" TEXT NOT NULL,"creditAcc" TEXT NOT NULL,"amount" REAL NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "Category" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL UNIQUE,"description" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "Unit" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL UNIQUE,"description" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "Warehouse" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL UNIQUE,"location" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "JobTitle" ("id" TEXT NOT NULL PRIMARY KEY,"title" TEXT NOT NULL UNIQUE,"description" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "Employee" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL,"phone" TEXT,"email" TEXT,"jobTitleId" TEXT,"salary" REAL NOT NULL DEFAULT 0.0,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("jobTitleId") REFERENCES "JobTitle"("id"));
CREATE TABLE IF NOT EXISTS "Revenue" ("id" TEXT NOT NULL PRIMARY KEY,"category" TEXT NOT NULL,"amount" REAL NOT NULL,"description" TEXT,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "Bank" ("id" TEXT NOT NULL PRIMARY KEY,"name" TEXT NOT NULL UNIQUE,"accountNumber" TEXT,"currentBalance" REAL NOT NULL DEFAULT 0.0,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "PurchaseReturn" ("id" TEXT NOT NULL PRIMARY KEY,"returnNumber" TEXT NOT NULL UNIQUE,"purchaseInvoiceId" TEXT NOT NULL,"supplierId" TEXT NOT NULL,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"totalAmount" REAL NOT NULL,"refundAmount" REAL NOT NULL DEFAULT 0.0,"notes" TEXT,"userId" TEXT NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("purchaseInvoiceId") REFERENCES "PurchaseInvoice"("id"),FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id"),FOREIGN KEY ("userId") REFERENCES "User"("id"));
CREATE TABLE IF NOT EXISTS "PurchaseReturnItem" ("id" TEXT NOT NULL PRIMARY KEY,"purchaseReturnId" TEXT NOT NULL,"productId" TEXT NOT NULL,"quantity" INTEGER NOT NULL,"purchasePrice" REAL NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("purchaseReturnId") REFERENCES "PurchaseReturn"("id") ON DELETE CASCADE,FOREIGN KEY ("productId") REFERENCES "Product"("id"));
CREATE TABLE IF NOT EXISTS "SupplierPayment" ("id" TEXT NOT NULL PRIMARY KEY,"supplierId" TEXT NOT NULL,"amount" REAL NOT NULL,"paymentMode" TEXT NOT NULL,"bankId" TEXT,"vaultId" TEXT,"notes" TEXT,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id"),FOREIGN KEY ("bankId") REFERENCES "Bank"("id"),FOREIGN KEY ("vaultId") REFERENCES "Vault"("id"));
CREATE TABLE IF NOT EXISTS "ClientPayment" ("id" TEXT NOT NULL PRIMARY KEY,"clientId" TEXT NOT NULL,"amount" REAL NOT NULL,"paymentMode" TEXT NOT NULL,"bankId" TEXT,"vaultId" TEXT,"notes" TEXT,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("clientId") REFERENCES "Client"("id"),FOREIGN KEY ("bankId") REFERENCES "Bank"("id"),FOREIGN KEY ("vaultId") REFERENCES "Vault"("id"));
CREATE TABLE IF NOT EXISTS "SupplierCheque" ("id" TEXT NOT NULL PRIMARY KEY,"supplierId" TEXT NOT NULL,"chequeNumber" TEXT NOT NULL,"amount" REAL NOT NULL,"dueDate" DATETIME NOT NULL,"bankId" TEXT,"status" TEXT NOT NULL DEFAULT 'PENDING',"notes" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id"),FOREIGN KEY ("bankId") REFERENCES "Bank"("id"));
CREATE TABLE IF NOT EXISTS "ClientCheque" ("id" TEXT NOT NULL PRIMARY KEY,"clientId" TEXT NOT NULL,"chequeNumber" TEXT NOT NULL,"amount" REAL NOT NULL,"dueDate" DATETIME NOT NULL,"bankId" TEXT,"status" TEXT NOT NULL DEFAULT 'PENDING',"notes" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("clientId") REFERENCES "Client"("id"),FOREIGN KEY ("bankId") REFERENCES "Bank"("id"));
CREATE TABLE IF NOT EXISTS "PriceQuotation" ("id" TEXT NOT NULL PRIMARY KEY,"quotationNumber" TEXT NOT NULL UNIQUE,"clientId" TEXT,"clientName" TEXT,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"subtotal" REAL NOT NULL,"discount" REAL NOT NULL DEFAULT 0.0,"totalAmount" REAL NOT NULL,"notes" TEXT,"userId" TEXT NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("clientId") REFERENCES "Client"("id"),FOREIGN KEY ("userId") REFERENCES "User"("id"));
CREATE TABLE IF NOT EXISTS "PriceQuotationItem" ("id" TEXT NOT NULL PRIMARY KEY,"quotationId" TEXT NOT NULL,"productId" TEXT NOT NULL,"quantity" INTEGER NOT NULL,"sellPrice" REAL NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("quotationId") REFERENCES "PriceQuotation"("id") ON DELETE CASCADE,FOREIGN KEY ("productId") REFERENCES "Product"("id"));
CREATE TABLE IF NOT EXISTS "StockTransfer" ("id" TEXT NOT NULL PRIMARY KEY,"transferNumber" TEXT NOT NULL UNIQUE,"sourceWarehouseId" TEXT NOT NULL,"targetWarehouseId" TEXT NOT NULL,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"notes" TEXT,"userId" TEXT NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("sourceWarehouseId") REFERENCES "Warehouse"("id"),FOREIGN KEY ("targetWarehouseId") REFERENCES "Warehouse"("id"),FOREIGN KEY ("userId") REFERENCES "User"("id"));
CREATE TABLE IF NOT EXISTS "StockTransferItem" ("id" TEXT NOT NULL PRIMARY KEY,"transferId" TEXT NOT NULL,"productId" TEXT NOT NULL,"quantity" INTEGER NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("transferId") REFERENCES "StockTransfer"("id") ON DELETE CASCADE,FOREIGN KEY ("productId") REFERENCES "Product"("id"));
CREATE TABLE IF NOT EXISTS "ProductMovement" ("id" TEXT NOT NULL PRIMARY KEY,"productId" TEXT NOT NULL,"type" TEXT NOT NULL,"quantity" INTEGER NOT NULL,"referenceId" TEXT,"warehouseId" TEXT,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"notes" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("productId") REFERENCES "Product"("id"),FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id"));
CREATE TABLE IF NOT EXISTS "EmployeeTransaction" ("id" TEXT NOT NULL PRIMARY KEY,"employeeId" TEXT NOT NULL,"type" TEXT NOT NULL,"amount" REAL NOT NULL,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"notes" TEXT,"vaultId" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE,FOREIGN KEY ("vaultId") REFERENCES "Vault"("id"));
CREATE TABLE IF NOT EXISTS "BankTransaction" ("id" TEXT NOT NULL PRIMARY KEY,"bankId" TEXT NOT NULL,"type" TEXT NOT NULL,"amount" REAL NOT NULL,"referenceId" TEXT,"notes" TEXT,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("bankId") REFERENCES "Bank"("id"));
CREATE TABLE IF NOT EXISTS "ActivityLog" ("id" TEXT NOT NULL PRIMARY KEY,"userId" TEXT,"action" TEXT NOT NULL,"module" TEXT NOT NULL,"entityId" TEXT,"entityType" TEXT,"description" TEXT NOT NULL,"severity" TEXT NOT NULL DEFAULT 'INFO',"metadata" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("userId") REFERENCES "User"("id"));
CREATE TABLE IF NOT EXISTS "UserPermission" ("id" TEXT NOT NULL PRIMARY KEY,"userId" TEXT NOT NULL,"module" TEXT NOT NULL,"canView" INTEGER NOT NULL DEFAULT 1,"canCreate" INTEGER NOT NULL DEFAULT 0,"canEdit" INTEGER NOT NULL DEFAULT 0,"canDelete" INTEGER NOT NULL DEFAULT 0,"canPrint" INTEGER NOT NULL DEFAULT 1,"canExport" INTEGER NOT NULL DEFAULT 0,FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,UNIQUE("userId","module"));
CREATE TABLE IF NOT EXISTS "InventoryAudit" ("id" TEXT NOT NULL PRIMARY KEY,"auditNumber" TEXT NOT NULL UNIQUE,"warehouseId" TEXT NOT NULL,"userId" TEXT NOT NULL,"date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,"status" TEXT NOT NULL DEFAULT 'PENDING',"notes" TEXT,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id"),FOREIGN KEY ("userId") REFERENCES "User"("id"));
CREATE TABLE IF NOT EXISTS "InventoryAuditItem" ("id" TEXT NOT NULL PRIMARY KEY,"inventoryAuditId" TEXT NOT NULL,"productId" TEXT NOT NULL,"systemStock" INTEGER NOT NULL,"actualStock" INTEGER NOT NULL,"difference" INTEGER NOT NULL,"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("inventoryAuditId") REFERENCES "InventoryAudit"("id") ON DELETE CASCADE,FOREIGN KEY ("productId") REFERENCES "Product"("id"));
CREATE INDEX IF NOT EXISTS "Product_barcode_idx" ON "Product"("barcode");
CREATE INDEX IF NOT EXISTS "SalesInvoice_invoiceNumber_idx" ON "SalesInvoice"("invoiceNumber");
CREATE INDEX IF NOT EXISTS "VaultTransaction_vaultId_idx" ON "VaultTransaction"("vaultId");
CREATE INDEX IF NOT EXISTS "UserPermission_userId_module_idx" ON "UserPermission"("userId","module");
`
}

// ─── Seed Default Data ──────────────────────────────────────────────────────
async function seedDefaultData(): Promise<void> {
  const crypto = await import('crypto')
  try {
    const count = await prisma.user.count()
    if (count > 0) return

    console.log('[DB] Seeding default admin user...')
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync('admin', salt, 10000, 64, 'sha512').toString('hex')

    await prisma.user.create({
      data: {
        username: 'admin',
        passwordHash: hash,
        passwordSalt: salt,
        role: 'ADMIN',
        name: 'System Admin',
        phone: '1234567890',
        isActive: true
      }
    })

    await prisma.settings.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        storeName: 'متجر التجزئة النموذجي',
        storePhone: '0123456789',
        storeAddress: 'القاهرة، مصر',
        receiptFooter: 'شكراً لزيارتكم!'
      }
    })

    await prisma.vault.upsert({
      where: { id: 'main_vault' },
      update: {},
      create: {
        id: 'main_vault',
        name: 'الخزينة الرئيسية',
        currentBalance: 0.0
      }
    })

    console.log('[DB] Seeded: admin/admin + settings + vault')
  } catch (err) {
    console.error('[DB] Seeding failed:', err)
  }
}
