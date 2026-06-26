const fs = require('fs');
const filePath = 'src/main/ipcHandlers.ts';
let content = fs.readFileSync(filePath, 'utf8');

const originalGetDbConfig = `  ipcMain.handle('settings:getDbConfig', async () => {
    try {
      const { app } = require('electron')
      const path = require('path')
      const fs = require('fs')
      const configDir = app ? app.getPath('userData') : process.cwd()
      const configPath = path.join(configDir, 'database_config.json')

      if (fs.existsSync(configPath)) {
        const raw = fs.readFileSync(configPath, 'utf8')
        const parsed = JSON.parse(raw)
        return { success: true, databaseUrl: parsed.databaseUrl }
      }
      return { success: true, databaseUrl: 'postgresql://postgres:postgres@localhost:5432/pos_erp?schema=public' }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })`;

const replacementGetDbConfig = `  ipcMain.handle('settings:getDbConfig', async () => {
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
        return { success: true, databaseUrl: parsed.databaseUrl, localIps }
      }
      return { success: true, databaseUrl: 'postgresql://postgres:postgres@localhost:5432/pos_erp?schema=public', localIps }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  })`;

if (content.includes(originalGetDbConfig)) {
  content = content.replace(originalGetDbConfig, replacementGetDbConfig);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("src/main/ipcHandlers.ts updated successfully with localIps detection!");
} else {
  console.error("originalGetDbConfig not found in ipcHandlers.ts!");
}
