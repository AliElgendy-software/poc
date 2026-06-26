const fs = require('fs');
const filePath = 'src/preload/index.d.ts';
let content = fs.readFileSync(filePath, 'utf8');

const originalSettingsInterface = `  settings: {
    get: () => Promise<{ success: boolean; settings?: any; error?: string }>
    update: (data: any) => Promise<{ success: boolean; settings?: any; error?: string }>
    resetData: (data: { username: string; password: string }) => Promise<{ success: boolean; error?: string }>
    getDbConfig: () => Promise<{ success: boolean; databaseUrl?: string; localIps?: string[]; error?: string }>
    saveDbConfig: (data: { databaseUrl: string }) => Promise<{ success: boolean; error?: string }>
  }`;

const replacementSettingsInterface = `  settings: {
    get: () => Promise<{ success: boolean; settings?: any; error?: string }>
    update: (data: any) => Promise<{ success: boolean; settings?: any; error?: string }>
    resetData: (data: { username: string; password: string }) => Promise<{ success: boolean; error?: string }>
    getDbConfig: () => Promise<{ success: boolean; databaseUrl?: string; localIps?: string[]; error?: string }>
    saveDbConfig: (data: { databaseUrl: string }) => Promise<{ success: boolean; error?: string }>
    changeDbPassword: (data: { oldPass: string; newPass: string; host?: string; port?: number; database?: string }) => Promise<{ success: boolean; databaseUrl?: string; error?: string }>
  }`;

if (content.includes(originalSettingsInterface)) {
  content = content.replace(originalSettingsInterface, replacementSettingsInterface);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("src/preload/index.d.ts updated successfully with changeDbPassword!");
} else {
  console.error("originalSettingsInterface not found in index.d.ts!");
}
