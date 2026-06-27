const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const rootDir = path.join(__dirname, '..')
const schemaPath = path.join(rootDir, 'prisma', 'schema.prisma')
const pgSchemaPath = path.join(rootDir, 'prisma', 'schema.postgresql.prisma')
const sqliteSchemaPath = path.join(rootDir, 'prisma', 'schema.sqlite.prisma')

function main() {
  console.log('Reading base schema.prisma...')
  const schemaContent = fs.readFileSync(schemaPath, 'utf8')

  // Create PostgreSQL schema
  console.log('Creating schema.postgresql.prisma...')
  let pgContent = schemaContent.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"')
  pgContent = pgContent.replace(
    /generator client \{([\s\S]*?)\}/,
    `generator client {
  provider      = "prisma-client-js"
  output        = "../node_modules/@prisma/client-postgresql"
  binaryTargets = ["native", "windows", "linux-musl", "debian-openssl-3.0.x"]
}`
  )
  fs.writeFileSync(pgSchemaPath, pgContent, 'utf8')

  // Create SQLite schema
  console.log('Creating schema.sqlite.prisma...')
  let sqliteContent = schemaContent.replace(/provider\s*=\s*"sqlite"/g, 'provider = "sqlite"')
  sqliteContent = sqliteContent.replace(
    /generator client \{([\s\S]*?)\}/,
    `generator client {
  provider      = "prisma-client-js"
  output        = "../node_modules/@prisma/client-sqlite"
  binaryTargets = ["native", "windows", "linux-musl", "debian-openssl-3.0.x"]
}`
  )
  fs.writeFileSync(sqliteSchemaPath, sqliteContent, 'utf8')

  try {
    console.log('Generating PostgreSQL Client...')
    execSync(`npx prisma generate --schema="${pgSchemaPath}"`, { stdio: 'inherit', cwd: rootDir })

    console.log('Generating SQLite Client...')
    execSync(`npx prisma generate --schema="${sqliteSchemaPath}"`, { stdio: 'inherit', cwd: rootDir })

    console.log('Database clients generated successfully!')
  } catch (err) {
    console.error('Failed to generate clients:', err)
    process.exit(1)
  }
}

main()
