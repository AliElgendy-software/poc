import { ElectronAPI } from '@electron-toolkit/preload'

export interface ApiBridge {
  license: {
    status: () => Promise<{ success: boolean; activated?: boolean; machineId?: string; expiryDate?: string; statusMessageAr?: string; statusMessageEn?: string; error?: string }>
    activate: (data: { licenseKey: string }) => Promise<{ success: boolean; errorAr?: string; errorEn?: string; error?: string }>
  }
  auth: {
    login: (credentials: { username: string; password: string }) => Promise<{ success: boolean; user?: any; error?: string }>
    getCurrentUser: () => Promise<{ success: boolean; user?: any; error?: string }>
    validateManager: (data: { pin: string }) => Promise<{ success: boolean; managerName?: string; error?: string }>
  }
  users: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (userData: any) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  shift: {
    getActive: () => Promise<{ success: boolean; shift?: any; error?: string }>
    open: (data: { userId: string; startingCash: number; notes?: string }) => Promise<{ success: boolean; shift?: any; error?: string }>
    close: (data: { shiftId: string; actualCash: number; notes?: string }) => Promise<{ success: boolean; shift?: any; error?: string }>
  }
  settings: {
    get: () => Promise<{ success: boolean; settings?: any; error?: string }>
    update: (data: any) => Promise<{ success: boolean; settings?: any; error?: string }>
    resetData: (data: { username: string; password: string }) => Promise<{ success: boolean; error?: string }>
    getDbConfig: () => Promise<{ success: boolean; databaseUrl?: string; dbType?: string; localIps?: string[]; error?: string }>
    saveDbConfig: (data: { databaseUrl: string; dbType?: string }) => Promise<{ success: boolean; error?: string }>
    testDbConnection: (data: { databaseUrl: string; dbType: string }) => Promise<{ success: boolean; messageAr?: string; messageEn?: string }>
    changeDbPassword: (data: { oldPass: string; newPass: string; host?: string; port?: number; database?: string }) => Promise<{ success: boolean; databaseUrl?: string; error?: string }>
  }
  products: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    getByBarcode: (barcode: string) => Promise<{ success: boolean; data?: any; error?: string }>
    create: (data: any) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  vault: {
    get: () => Promise<{ success: boolean; vault?: any; error?: string }>
    transferFromPOS: (data: { shiftId: string; userId: string; amount: number; notes?: string }) => Promise<{ success: boolean; vault?: any; error?: string }>
  }
  expenses: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: { category: string; amount: number; description?: string; userId: string; shiftId?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  sales: {
    createInvoice: (data: any) => Promise<{ success: boolean; data?: any; error?: string }>
    listInvoices: () => Promise<{ success: boolean; data?: any[]; error?: string }>
  }
  returns: {
    create: (data: any) => Promise<{ success: boolean; data?: any; error?: string }>
  }
  purchases: {
    createInvoice: (data: any) => Promise<{ success: boolean; data?: any; error?: string }>
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    createReturn: (data: any) => Promise<{ success: boolean; data?: any; error?: string }>
    listReturns: () => Promise<{ success: boolean; data?: any[]; error?: string }>
  }
  suppliers: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: any) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  ledger: {
    listEntries: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    getReport: () => Promise<{ success: boolean; data?: { revenue: number; cogs: number; expenses: number; netProfit: number }; error?: string }>
  }
  hardware: {
    printRaw: (data: { text: string }) => Promise<{ success: boolean; error?: string }>
  }
  clients: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: { name: string; phone?: string; address?: string; creditLimit?: number; currentBalance?: number }) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  categories: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: { name: string; description?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  units: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: { name: string; description?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  warehouses: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: { name: string; location?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  jobTitles: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: { title: string; description?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  employees: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: { name: string; phone?: string; email?: string; jobTitleId?: string; salary?: number }) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
    addTransaction: (data: { employeeId: string; type: string; amount: number; notes?: string; vaultId?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    paySalary: (data: { employeeId: string; amount: number; notes?: string; vaultId?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    getTransactions: (employeeId: string) => Promise<{ success: boolean; data?: any[]; error?: string }>
  }
  revenues: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: { category: string; amount: number; description?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  banks: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: { name: string; accountNumber?: string; currentBalance?: number }) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
    deposit: (data: { bankId: string; amount: number; notes?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    withdraw: (data: { bankId: string; amount: number; notes?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    transferToVault: (data: { bankId: string; vaultId: string; amount: number; notes?: string; userId?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    getTransactions: (bankId: string) => Promise<{ success: boolean; data?: any[]; error?: string }>
  }
  supplierPayments: {
    create: (data: { supplierId: string; amount: number; paymentMode: string; bankId?: string; vaultId?: string; notes?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
  }
  supplierCheques: {
    create: (data: { supplierId: string; chequeNumber: string; amount: number; dueDate: string; bankId?: string; notes?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    updateStatus: (data: { id: string; status: string }) => Promise<{ success: boolean; data?: any; error?: string }>
  }
  clientPayments: {
    create: (data: { clientId: string; amount: number; paymentMode: string; bankId?: string; vaultId?: string; notes?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
  }
  clientCheques: {
    create: (data: { clientId: string; chequeNumber: string; amount: number; dueDate: string; bankId?: string; notes?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    updateStatus: (data: { id: string; status: string }) => Promise<{ success: boolean; data?: any; error?: string }>
  }
  quotations: {
    create: (data: { quotationNumber: string; clientId?: string; clientName?: string; subtotal: number; discount: number; totalAmount: number; notes?: string; userId: string; items: any[] }) => Promise<{ success: boolean; data?: any; error?: string }>
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
  }
  transfers: {
    create: (data: { transferNumber: string; sourceWarehouseId: string; targetWarehouseId: string; notes?: string; userId: string; items: any[] }) => Promise<{ success: boolean; data?: any; error?: string }>
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
  }
  inventory: {
    movement: (productId: string) => Promise<{ success: boolean; data?: any[]; error?: string }>
    listAllMovements: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    createAudit: (data: { warehouseId: string; userId: string; notes?: string; items: any[] }) => Promise<{ success: boolean; data?: any; error?: string }>
    listAudits: () => Promise<{ success: boolean; data?: any[]; error?: string }>
  }
  vaults: {
    list: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    create: (data: { name: string; currentBalance?: number }) => Promise<{ success: boolean; data?: any; error?: string }>
    delete: (id: string) => Promise<{ success: boolean; error?: string }>
    cashIn: (data: { vaultId: string; amount: number; notes?: string; userId: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    cashOut: (data: { vaultId: string; amount: number; notes?: string; userId: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    transferToVault: (data: { fromVaultId: string; toVaultId: string; amount: number; notes?: string; userId: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    transferToBank: (data: { vaultId: string; bankId: string; amount: number; notes?: string; userId: string }) => Promise<{ success: boolean; data?: any; error?: string }>
    getTransactions: (vaultId: string) => Promise<{ success: boolean; data?: any[]; error?: string }>
  }
  profits: {
    getInvoiceProfits: () => Promise<{ success: boolean; data?: any[]; error?: string }>
    getReport: (data: { startDate?: string; endDate?: string }) => Promise<{ success: boolean; data?: any; error?: string }>
  }
  activityLog: {
    list: (filters?: {
      userId?: string
      module?: string
      severity?: string
      action?: string
      startDate?: string
      endDate?: string
      search?: string
      limit?: number
    }) => Promise<{ success: boolean; data?: any[]; error?: string }>
    clear: (data: { beforeDate: string }) => Promise<{ success: boolean; deletedCount?: number; error?: string }>
  }
  permissions: {
    get: (data: { userId: string }) => Promise<{ success: boolean; data?: any[]; error?: string }>
    save: (data: { userId: string; permissions: any[] }) => Promise<{ success: boolean; data?: any[]; error?: string }>
  }
  db: {
    getStatus: () => Promise<{ success: boolean; error: string | null; dbType: string; databaseUrl: string }>
  }
  app: {
    relaunch: () => Promise<void>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiBridge
  }
}
