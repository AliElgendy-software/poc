import { app } from 'electron'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'

// Setup path to dynamic database configuration file
const configDir = app ? app.getPath('userData') : process.cwd()
const configPath = path.join(configDir, 'database_config.json')

let databaseUrl = 'postgresql://postgres:postgres@localhost:5432/pos_erp?schema=public'

// Ensure config exists or write default
if (!fs.existsSync(configPath)) {
  try {
    fs.mkdirSync(configDir, { recursive: true })
    fs.writeFileSync(configPath, JSON.stringify({ databaseUrl }, null, 2), 'utf8')
  } catch (err) {
    console.error('Failed to write database config:', err)
  }
} else {
  try {
    const rawConfig = fs.readFileSync(configPath, 'utf8')
    const parsed = JSON.parse(rawConfig)
    if (parsed.databaseUrl) {
      databaseUrl = parsed.databaseUrl
    }
  } catch (err) {
    console.error('Failed to read database config, using default:', err)
  }
}

// Dynamically set DATABASE_URL environment variable for Prisma
process.env.DATABASE_URL = databaseUrl

// Set database URL dynamically
export const prisma = new PrismaClient()

// Database initialization helper (programmatic migration)
export async function initializeDatabase(): Promise<void> {
  try {
    console.log(`Connecting to database: ${databaseUrl.replace(/:([^:@]+)@/, ':****@')}`)

    // Check if database is already initialized by checking if the 'User' table exists
    let isInitialized = false
    try {
      // Query information_schema in PostgreSQL to check if the User table exists
      const tableCheck: any[] = await prisma.$queryRawUnsafe(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name='User';"
      )
      isInitialized = tableCheck.length > 0
    } catch (e) {
      console.log('Database might not exist yet or User table is missing.')
    }

    if (!isInitialized) {
      console.log('Database not initialized. We rely on Prisma db push to generate tables on database setup.')
      // In production, we assume the PostgreSQL database structure is set up via prisma db push or manual migration beforehand.
      // However, to make it self-healing, we can inform the user or attempt to let them run migrate.
    } else {
      console.log('Database is already initialized.')
    }
    
    // Always check and seed default data if database tables are empty
    await seedDefaultData()
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
}

// Seed helper for initial admin credentials (default: admin / admin)
async function seedDefaultData(): Promise<void> {
  try {
    // Check if an admin exists
    const usersCount = await prisma.user.count()
    if (usersCount === 0) {
      console.log('No users found. Seeding default Admin user...')
      // SHA-256 of "admin": 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
      const adminPasswordHash = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' 

      await prisma.user.create({
        data: {
          username: 'admin',
          passwordHash: adminPasswordHash,
          role: 'ADMIN',
          name: 'System Admin',
          phone: '1234567890',
          isActive: true
        }
      })
      console.log('Default Admin seeded successfully. Username: admin / Password: admin')
      
      // Also seed general settings
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
      console.log('Default settings seeded successfully.')

      // Also seed main vault
      await prisma.vault.upsert({
        where: { id: 'main_vault' },
        update: {},
        create: {
          id: 'main_vault',
          name: 'الخزينة الرئيسية (Main Vault)',
          currentBalance: 0.0
        }
      })
      console.log('Main Vault seeded successfully.')
    }
  } catch (error) {
    console.error('Failed to seed default database values:', error)
  }
}
