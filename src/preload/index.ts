import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  license: {
    status: () => ipcRenderer.invoke('license:status'),
    activate: (data) => ipcRenderer.invoke('license:activate', data)
  },
  auth: {
    login: (credentials) => ipcRenderer.invoke('auth:login', credentials),
    getCurrentUser: () => ipcRenderer.invoke('auth:getCurrentUser'),
    validateManager: (data: { pin: string }) => ipcRenderer.invoke('auth:validateManager', data)
  },
  users: {
    list: () => ipcRenderer.invoke('users:list'),
    create: (userData) => ipcRenderer.invoke('users:create', userData),
    delete: (id) => ipcRenderer.invoke('users:delete', id)
  },
  shift: {
    getActive: () => ipcRenderer.invoke('shift:getActive'),
    open: (data) => ipcRenderer.invoke('shift:open', data),
    close: (data) => ipcRenderer.invoke('shift:close', data)
  },
  settings: {
    get: () => ipcRenderer.invoke('settings:get'),
    update: (data) => ipcRenderer.invoke('settings:update', data),
    resetData: (data: { username: string; password: string }) => ipcRenderer.invoke('settings:resetData', data),
    getDbConfig: () => ipcRenderer.invoke('settings:getDbConfig'),
    saveDbConfig: (data: { databaseUrl: string; dbType?: string }) => ipcRenderer.invoke('settings:saveDbConfig', data),
    testDbConnection: (data: { databaseUrl: string; dbType: string }) => ipcRenderer.invoke('settings:testDbConnection', data),
    changeDbPassword: (data: { oldPass: string; newPass: string; host?: string; port?: number; database?: string }) => ipcRenderer.invoke('settings:changeDbPassword', data)
  },
  products: {
    list: () => ipcRenderer.invoke('products:list'),
    getByBarcode: (barcode) => ipcRenderer.invoke('products:getByBarcode', barcode),
    create: (data) => ipcRenderer.invoke('products:create', data),
    delete: (id) => ipcRenderer.invoke('products:delete', id)
  },
  vault: {
    get: () => ipcRenderer.invoke('vault:get'),
    transferFromPOS: (data) => ipcRenderer.invoke('vault:transferFromPOS', data)
  },
  expenses: {
    list: () => ipcRenderer.invoke('expenses:list'),
    create: (data) => ipcRenderer.invoke('expenses:create', data),
    delete: (id) => ipcRenderer.invoke('expenses:delete', id)
  },
  sales: {
    createInvoice: (data) => ipcRenderer.invoke('sales:createInvoice', data),
    listInvoices: () => ipcRenderer.invoke('sales:listInvoices')
  },
  returns: {
    create: (data) => ipcRenderer.invoke('returns:create', data)
  },
  purchases: {
    createInvoice: (data) => ipcRenderer.invoke('purchases:createInvoice', data),
    list: () => ipcRenderer.invoke('purchases:list'),
    createReturn: (data) => ipcRenderer.invoke('purchases:createReturn', data),
    listReturns: () => ipcRenderer.invoke('purchases:listReturns')
  },
  suppliers: {
    list: () => ipcRenderer.invoke('suppliers:list'),
    create: (data) => ipcRenderer.invoke('suppliers:create', data),
    delete: (id) => ipcRenderer.invoke('suppliers:delete', id)
  },
  ledger: {
    listEntries: () => ipcRenderer.invoke('ledger:listEntries'),
    getReport: () => ipcRenderer.invoke('ledger:getReport')
  },
  hardware: {
    printRaw: (data) => ipcRenderer.invoke('hardware:printRaw', data)
  },
  clients: {
    list: () => ipcRenderer.invoke('clients:list'),
    create: (data) => ipcRenderer.invoke('clients:create', data),
    delete: (id) => ipcRenderer.invoke('clients:delete', id)
  },
  categories: {
    list: () => ipcRenderer.invoke('categories:list'),
    create: (data) => ipcRenderer.invoke('categories:create', data),
    delete: (id) => ipcRenderer.invoke('categories:delete', id)
  },
  units: {
    list: () => ipcRenderer.invoke('units:list'),
    create: (data) => ipcRenderer.invoke('units:create', data),
    delete: (id) => ipcRenderer.invoke('units:delete', id)
  },
  warehouses: {
    list: () => ipcRenderer.invoke('warehouses:list'),
    create: (data) => ipcRenderer.invoke('warehouses:create', data),
    delete: (id) => ipcRenderer.invoke('warehouses:delete', id)
  },
  jobTitles: {
    list: () => ipcRenderer.invoke('jobTitles:list'),
    create: (data) => ipcRenderer.invoke('jobTitles:create', data),
    delete: (id) => ipcRenderer.invoke('jobTitles:delete', id)
  },
  employees: {
    list: () => ipcRenderer.invoke('employees:list'),
    create: (data) => ipcRenderer.invoke('employees:create', data),
    delete: (id) => ipcRenderer.invoke('employees:delete', id),
    addTransaction: (data) => ipcRenderer.invoke('employees:addTransaction', data),
    paySalary: (data) => ipcRenderer.invoke('employees:paySalary', data),
    getTransactions: (employeeId) => ipcRenderer.invoke('employees:getTransactions', employeeId)
  },
  revenues: {
    list: () => ipcRenderer.invoke('revenues:list'),
    create: (data) => ipcRenderer.invoke('revenues:create', data),
    delete: (id) => ipcRenderer.invoke('revenues:delete', id)
  },
  banks: {
    list: () => ipcRenderer.invoke('banks:list'),
    create: (data) => ipcRenderer.invoke('banks:create', data),
    delete: (id) => ipcRenderer.invoke('banks:delete', id),
    deposit: (data) => ipcRenderer.invoke('banks:deposit', data),
    withdraw: (data) => ipcRenderer.invoke('banks:withdraw', data),
    transferToVault: (data) => ipcRenderer.invoke('banks:transferToVault', data),
    getTransactions: (bankId) => ipcRenderer.invoke('banks:getTransactions', bankId)
  },
  supplierPayments: {
    create: (data) => ipcRenderer.invoke('supplierPayments:create', data),
    list: () => ipcRenderer.invoke('supplierPayments:list')
  },
  supplierCheques: {
    create: (data) => ipcRenderer.invoke('supplierCheques:create', data),
    list: () => ipcRenderer.invoke('supplierCheques:list'),
    updateStatus: (data) => ipcRenderer.invoke('supplierCheques:updateStatus', data)
  },
  clientPayments: {
    create: (data) => ipcRenderer.invoke('clientPayments:create', data),
    list: () => ipcRenderer.invoke('clientPayments:list')
  },
  clientCheques: {
    create: (data) => ipcRenderer.invoke('clientCheques:create', data),
    list: () => ipcRenderer.invoke('clientCheques:list'),
    updateStatus: (data) => ipcRenderer.invoke('clientCheques:updateStatus', data)
  },
  quotations: {
    create: (data) => ipcRenderer.invoke('quotations:create', data),
    list: () => ipcRenderer.invoke('quotations:list'),
    delete: (id) => ipcRenderer.invoke('quotations:delete', id)
  },
  transfers: {
    create: (data) => ipcRenderer.invoke('transfers:create', data),
    list: () => ipcRenderer.invoke('transfers:list')
  },
  inventory: {
    movement: (productId) => ipcRenderer.invoke('inventory:movement', productId),
    listAllMovements: () => ipcRenderer.invoke('inventory:listAllMovements'),
    createAudit: (data) => ipcRenderer.invoke('inventory:createAudit', data),
    listAudits: () => ipcRenderer.invoke('inventory:listAudits')
  },
  vaults: {
    list: () => ipcRenderer.invoke('vaults:list'),
    create: (data) => ipcRenderer.invoke('vaults:create', data),
    delete: (id) => ipcRenderer.invoke('vaults:delete', id),
    cashIn: (data) => ipcRenderer.invoke('vaults:cashIn', data),
    cashOut: (data) => ipcRenderer.invoke('vaults:cashOut', data),
    transferToVault: (data) => ipcRenderer.invoke('vaults:transferToVault', data),
    transferToBank: (data) => ipcRenderer.invoke('vaults:transferToBank', data),
    getTransactions: (vaultId) => ipcRenderer.invoke('vaults:getTransactions', vaultId)
  },
  profits: {
    getInvoiceProfits: () => ipcRenderer.invoke('profits:getInvoiceProfits'),
    getReport: (data) => ipcRenderer.invoke('profits:getReport', data)
  },
  activityLog: {
    list: (filters?) => ipcRenderer.invoke('activityLog:list', filters),
    clear: (data: { beforeDate: string }) => ipcRenderer.invoke('activityLog:clear', data)
  },
  db: {
    getStatus: () => ipcRenderer.invoke('db:getStatus')
  },
  app: {
    relaunch: () => ipcRenderer.invoke('app:relaunch')
  },
  permissions: {
    get: (data: { userId: string }) => ipcRenderer.invoke('permissions:get', data),
    save: (data: { userId: string; permissions: any[] }) => ipcRenderer.invoke('permissions:save', data)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
