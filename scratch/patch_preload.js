const fs = require('fs');
const filePath = 'src/preload/index.ts';
let content = fs.readFileSync(filePath, 'utf8');

const originalSettingsObject = `  settings: {
    get: () => ipcRenderer.invoke('settings:get'),
    update: (data) => ipcRenderer.invoke('settings:update', data),
    resetData: (data: { username: string; password: string }) => ipcRenderer.invoke('settings:resetData', data),
    getDbConfig: () => ipcRenderer.invoke('settings:getDbConfig'),
    saveDbConfig: (data: { databaseUrl: string }) => ipcRenderer.invoke('settings:saveDbConfig', data)
  }`;

const replacementSettingsObject = `  settings: {
    get: () => ipcRenderer.invoke('settings:get'),
    update: (data) => ipcRenderer.invoke('settings:update', data),
    resetData: (data: { username: string; password: string }) => ipcRenderer.invoke('settings:resetData', data),
    getDbConfig: () => ipcRenderer.invoke('settings:getDbConfig'),
    saveDbConfig: (data: { databaseUrl: string }) => ipcRenderer.invoke('settings:saveDbConfig', data),
    changeDbPassword: (data: { oldPass: string; newPass: string; host?: string; port?: number; database?: string }) => ipcRenderer.invoke('settings:changeDbPassword', data)
  }`;

if (content.includes(originalSettingsObject)) {
  content = content.replace(originalSettingsObject, replacementSettingsObject);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("src/preload/index.ts updated successfully with changeDbPassword hook!");
} else {
  console.error("originalSettingsObject not found in index.ts!");
}
