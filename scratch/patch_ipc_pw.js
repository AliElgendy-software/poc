const fs = require('fs');
const filePath = 'src/main/ipcHandlers.ts';
let content = fs.readFileSync(filePath, 'utf8');

const originalSaveDbConfig = `  ipcMain.handle('settings:saveDbConfig', async (_, { databaseUrl }) => {
    try {
      const { app } = require('electron')
      const path = require('path')
      const fs = require('fs')
      const configDir = app ? app.getPath('userData') : process.cwd()
      const configPath = path.join(configDir, 'database_config.json')

      fs.mkdirSync(configDir, { recursive: true })
      fs.writeFileSync(configPath, JSON.stringify({ databaseUrl }, null, 2), 'utf8')
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })`;

const replacementSaveDbConfig = `  ipcMain.handle('settings:saveDbConfig', async (_, { databaseUrl }) => {
    try {
      const { app } = require('electron')
      const path = require('path')
      const fs = require('fs')
      const configDir = app ? app.getPath('userData') : process.cwd()
      const configPath = path.join(configDir, 'database_config.json')

      fs.mkdirSync(configDir, { recursive: true })
      fs.writeFileSync(configPath, JSON.stringify({ databaseUrl }, null, 2), 'utf8')
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
      await client.query(\`ALTER USER postgres WITH PASSWORD '\${escapedPassword}'\`)
      await client.end()

      // Save the new connection string to configuration file
      const configDir = app ? app.getPath('userData') : process.cwd()
      const configPath = path.join(configDir, 'database_config.json')
      const newUrl = \`postgresql://postgres:\${encodeURIComponent(newPass)}@\${dbHost}:\${dbPort}/\${dbName}?schema=public\`

      fs.mkdirSync(configDir, { recursive: true })
      fs.writeFileSync(configPath, JSON.stringify({ databaseUrl: newUrl }, null, 2), 'utf8')

      return { success: true, databaseUrl: newUrl }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })`;

if (content.includes(originalSaveDbConfig)) {
  content = content.replace(originalSaveDbConfig, replacementSaveDbConfig);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("src/main/ipcHandlers.ts updated successfully with changeDbPassword handler!");
} else {
  console.error("originalSaveDbConfig not found in ipcHandlers.ts!");
}
