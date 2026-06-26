import { app } from 'electron'
import path from 'path'
import fs from 'fs'

// Setup path to dynamic database configuration file
const configDir = app ? app.getPath('userData') : process.cwd()
const configPath = path.join(configDir, 'database_config.json')

let databaseUrl = ''
let dbType = 'sqlite' // default

// Ensure config exists or write default
if (!fs.existsSync(configPath)) {
  try {
    fs.mkdirSync(configDir, { recursive: true })

    // Look for installer-provided default config
    let installerConfigPath = ''
    if (app) {
      const exeDir = path.dirname(app.getPath('exe'))
      installerConfigPath = path.join(exeDir, 'database_config.json')
      if (!fs.existsSync(installerConfigPath)) {
        installerConfigPath = path.join(process.resourcesPath, 'database_config.json')
      }
    }

    if (installerConfigPath && fs.existsSync(installerConfigPath)) {
      const content = fs.readFileSync(installerConfigPath, 'utf8')
      fs.writeFileSync(configPath, content, 'utf8')
      console.log('Copied default database config from:', installerConfigPath)
    } else {
      // Default: SQLite in userData folder
      const sqlitePath = path.join(configDir, 'servio.db')
      databaseUrl = `file:${sqlitePath}`
      fs.writeFileSync(configPath, JSON.stringify({ databaseUrl, dbType: 'sqlite' }, null, 2), 'utf8')
      console.log('Created default sqlite database config at:', configPath)
    }
  } catch (err) {
    console.error('Failed to initialize database config:', err)
  }
}

// Read database configuration
try {
  const rawConfig = fs.readFileSync(configPath, 'utf8')
  const parsed = JSON.parse(rawConfig)
  if (parsed.databaseUrl) databaseUrl = parsed.databaseUrl
  if (parsed.dbType) {
    dbType = parsed.dbType
  } else {
    dbType = databaseUrl.startsWith('postgresql') ? 'postgresql' : 'sqlite'
  }
} catch (err) {
  console.error('Failed to read database config, using sqlite default:', err)
  const sqlitePath = path.join(configDir, 'servio.db')
  databaseUrl = `file:${sqlitePath}`
  dbType = 'sqlite'
}

// Fix relative SQLite paths to absolute
if (dbType === 'sqlite' && databaseUrl.startsWith('file:')) {
  const filePath = databaseUrl.substring(5)
  if (!path.isAbsolute(filePath)) {
    databaseUrl = `file:${path.join(configDir, filePath)}`
  }
}

// Set env vars for Prisma client - must be set before requiring @prisma/client
process.env.DATABASE_URL = databaseUrl
process.env.DB_PROVIDER = dbType === 'postgresql' ? 'postgresql' : 'sqlite'


console.log(`[Database] Mode: ${dbType}, URL: ${databaseUrl.replace(/:([^:@]+)@/, ':****@')}`)

// Use the generated Prisma clients from:
// - In production: resources/generated/{postgresql|sqlite}/ (unpacked from asar)
// - In development: src/main/generated/{postgresql|sqlite}/
let generatedDir: string
if (app && app.isPackaged) {
  generatedDir = path.join(process.resourcesPath, 'generated')
} else {
  generatedDir = path.join(__dirname, 'generated')
}

const clientPath = path.join(generatedDir, dbType === 'postgresql' ? 'postgresql' : 'sqlite')
console.log(`[Database] Loading Prisma client from: ${clientPath}`)

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require(clientPath)

export const prisma = new PrismaClient({
  datasources: { db: { url: databaseUrl } }
}) as any

export { dbType }

// Helper: run prisma db push using bundled prisma CLI
function runDbPush(schemaPath: string, dbUrl: string): void {
  try {
    console.log(`[DB Init] Running prisma db push with schema: ${schemaPath}`)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const prismaCliPath = require.resolve('prisma/build/index.js')
    const { execSync } = require('child_process')
    execSync(`"${process.execPath}" "${prismaCliPath}" db push --schema="${schemaPath}" --accept-data-loss`, {
      env: { ...process.env, DATABASE_URL: dbUrl },
      stdio: 'pipe'
    })
    console.log('[DB Init] prisma db push completed.')
  } catch (err: any) {
    console.error('[DB Init] prisma db push failed:', err?.stdout?.toString() || err?.message)
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    if (dbType === 'sqlite') {
      const sqlitePath = databaseUrl.substring(5)
      if (!fs.existsSync(sqlitePath)) {
        console.log('[DB Init] SQLite file not found. Creating via db push...')
        let schemaPath = ''
        if (app) {
          schemaPath = path.join(process.resourcesPath, 'prisma', 'schema.sqlite.prisma')
          if (!fs.existsSync(schemaPath)) {
            schemaPath = path.join(process.resourcesPath, 'prisma', 'schema.prisma')
          }
        } else {
          schemaPath = path.join(process.cwd(), 'prisma', 'schema.sqlite.prisma')
          if (!fs.existsSync(schemaPath)) {
            schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma')
          }
        }
        runDbPush(schemaPath, databaseUrl)
      }
    }

    // Check if User table exists
    let isInitialized = false
    try {
      if (dbType === 'postgresql') {
        const rows: any[] = await prisma.$queryRawUnsafe(
          `SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name='User';`
        )
        isInitialized = rows.length > 0
      } else {
        const rows: any[] = await prisma.$queryRawUnsafe(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='User';`
        )
        isInitialized = rows.length > 0
      }
    } catch (_e) {
      console.log('[DB Init] Could not check tables - will attempt push.')
    }

    if (!isInitialized && dbType === 'postgresql') {
      console.log('[DB Init] PostgreSQL tables missing. Running db push...')
      let schemaPath = ''
      if (app) {
        schemaPath = path.join(process.resourcesPath, 'prisma', 'schema.postgresql.prisma')
        if (!fs.existsSync(schemaPath)) {
          schemaPath = path.join(process.resourcesPath, 'prisma', 'schema.prisma')
        }
      } else {
        schemaPath = path.join(process.cwd(), 'prisma', 'schema.postgresql.prisma')
        if (!fs.existsSync(schemaPath)) {
          schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma')
        }
      }
      runDbPush(schemaPath, databaseUrl)
    }

    await seedDefaultData()
  } catch (error) {
    console.error('[DB Init] Initialization failed:', error)
    throw error
  }
}

async function seedDefaultData(): Promise<void> {
  const crypto = await import('crypto')
  try {
    const usersCount = await prisma.user.count()
    if (usersCount === 0) {
      console.log('[DB Seed] Seeding default admin user...')
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
      console.log('[DB Seed] Admin seeded. Login: admin / admin')

      await prisma.settings.upsert({
        where: { id: 1 },
        update: {},
        create: {
          id: 1,
          storeName: 'متجر التجزئة النموذجي (POS System)',
          storePhone: '0123456789',
          storeAddress: 'القاهرة، مصر',
          receiptFooter: 'شكراً لزيارتكم! Thank you for your business!'
        }
      })

      await prisma.vault.upsert({
        where: { id: 'main_vault' },
        update: {},
        create: {
          id: 'main_vault',
          name: 'الخزينة الرئيسية (Main Vault)',
          currentBalance: 0.0
        }
      })
      console.log('[DB Seed] Settings & Vault seeded.')
    }
  } catch (error) {
    console.error('[DB Seed] Failed:', error)
  }
}
