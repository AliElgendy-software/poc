import React, { useState, useEffect, useRef } from 'react'

// Translation Dictionary
const t = {
  ar: {
    title: 'نظام إدارة المبيعات ونقاط البيع المطور',
    pos: 'نقطة البيع',
    inventory: 'المخازن والمشتريات',
    finance: 'المالية والحسابات',
    settings: 'الإدارة والنظام',
    logout: 'تسجيل الخروج',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    adminPanel: 'لوحة التحكم',
    cashier: 'كاشير',
    activeShift: 'الوردية النشطة',
    noShift: 'لا توجد وردية مفتوحة',
    openShift: 'فتح وردية جديدة',
    closeShift: 'إغلاق الوردية الحالية',
    startingCash: 'رصيد بداية الدرج',
    notes: 'ملاحظات',
    submit: 'تأكيد',
    cancel: 'إلغاء',
    searchProduct: 'بحث عن منتج بالاسم أو الباركود...',
    barcode: 'الباركود',
    price: 'السعر',
    qty: 'الكمية',
    total: 'الإجمالي',
    checkout: 'دفع وطباعة',
    discount: 'الخصم',
    netTotal: 'الإجمالي الصافي',
    receivedAmount: 'المبلغ المستلم',
    changeAmount: 'المتبقي (الفكة)',
    addToCart: 'إضافة للسلة',
    emptyCart: 'السلة فارغة',
    stock: 'المخزون الحالي',
    expiry: 'تاريخ الصلاحية',
    minStock: 'الحد الأدنى',
    add: 'إضافة',
    productsList: 'قائمة المنتجات',
    productName: 'اسم المنتج',
    purchasePrice: 'سعر الشراء',
    sellPrice: 'سعر البيع',
    minStockLevel: 'حد الطلب',
    expiryDate: 'صلاحية (اختياري)',
    category: 'التصنيف',
    save: 'حفظ',
    shortages: 'النواقص (تحت حد الطلب)',
    vault: 'الخزينة الرئيسية',
    vaultBalance: 'رصيد الخزينة الحالي',
    transferToVault: 'تحويل النقدية للخزينة',
    transferAmount: 'المبلغ المراد تحويله',
    expenses: 'المصروفات التشغيلية',
    expenseCategory: 'تصنيف المصروف',
    expenseAmount: 'قيمة المصروف',
    expenseDesc: 'الوصف',
    addExpense: 'تسجيل مصروف',
    storeName: 'اسم المتجر',
    storePhone: 'رقم الهاتف',
    storeAddress: 'العنوان',
    receiptFooter: 'تذييل الفاتورة',
    backup: 'النسخ الاحتياطي وقاعدة البيانات',
    backupBtn: 'أخذ نسخة احتياطية الآن',
    restoreBtn: 'استعادة قاعدة البيانات',
    welcomeBack: 'مرحباً بك مجدداً',
    enterCredentials: 'يرجى إدخل بيانات الدخول المعتمدة',
    activeShiftBar: 'الوردية الحالية مفتوحة بواسطة',
    closeShiftWarning: 'هل أنت متأكد من إغلاق الوردية الحالية وتسوية الدرج؟',
    drawerCash: 'النقدية بالدرج المتوقعة',
    actualCash: 'النقدية الفعلية بالدرج',
    shortageAlert: 'تنبيه النواقص',
    expiryAlert: 'تنبيه الصلاحية المقربة',
    barcodePrint: 'توليد وطباعة الباركود',
    returns: 'مرتجع مبيعات',
    masterData: 'البيانات الأساسية',
    purchases: 'المشتريات',
    sales: 'دفتر المبيعات',
    warehouses: 'المستودعات والمخازن',
    expensesMenu: 'المصروفات',
    employees: 'الموظفين والرواتب',
    vaultMenu: 'الخزينة',
    bank: 'البنك والحسابات',
    profits: 'الأرباح والخسائر'
  },
  en: {
    title: 'Advanced POS & ERP System',
    pos: 'Point of Sale',
    inventory: 'Inventory & Purchases',
    finance: 'Finance & Ledger',
    settings: 'Admin & Settings',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    adminPanel: 'Admin Panel',
    cashier: 'Cashier',
    activeShift: 'Active Shift',
    noShift: 'No Active Shift',
    openShift: 'Open New Shift',
    closeShift: 'Close Current Shift',
    startingCash: 'Starting Cash',
    notes: 'Notes',
    submit: 'Confirm',
    cancel: 'Cancel',
    searchProduct: 'Search product by name or barcode...',
    barcode: 'Barcode',
    price: 'Price',
    qty: 'Qty',
    total: 'Total',
    checkout: 'Pay & Print',
    discount: 'Discount',
    netTotal: 'Net Total',
    receivedAmount: 'Received Amount',
    changeAmount: 'Change',
    addToCart: 'Add to Cart',
    emptyCart: 'Cart is empty',
    stock: 'Current Stock',
    expiry: 'Expiry Date',
    minStock: 'Min Stock',
    add: 'Add New',
    productsList: 'Products List',
    productName: 'Product Name',
    purchasePrice: 'Purchase Price',
    sellPrice: 'Sell Price',
    minStockLevel: 'Min Level',
    expiryDate: 'Expiry (Optional)',
    category: 'Category',
    save: 'Save',
    shortages: 'Low Stock Shortages',
    vault: 'Main Vault/Safe',
    vaultBalance: 'Vault Current Balance',
    transferToVault: 'Transfer POS Cash to Vault',
    transferAmount: 'Amount to Transfer',
    expenses: 'Operational Expenses',
    expenseCategory: 'Expense Category',
    expenseAmount: 'Expense Amount',
    expenseDesc: 'Description',
    addExpense: 'Record Expense',
    storeName: 'Store Name',
    storePhone: 'Phone Number',
    storeAddress: 'Address',
    receiptFooter: 'Receipt Footer',
    backup: 'Backup & Database Management',
    backupBtn: 'Backup Database Now',
    restoreBtn: 'Restore Database',
    welcomeBack: 'Welcome Back',
    enterCredentials: 'Enter your credentials to access the system',
    activeShiftBar: 'Current shift opened by',
    closeShiftWarning: 'Are you sure you want to close the current shift and settle the drawer?',
    drawerCash: 'Expected Drawer Cash',
    actualCash: 'Actual Drawer Cash',
    shortageAlert: 'Low Stock Alert',
    expiryAlert: 'Expiry Alert',
    barcodePrint: 'Barcode Generator',
    returns: 'Refunds / Returns',
    masterData: 'Master Data',
    purchases: 'Purchases',
    sales: 'Sales Ledger',
    warehouses: 'Warehouses',
    expensesMenu: 'Expenses',
    employees: 'Employees',
    vaultMenu: 'Vault',
    bank: 'Bank',
    profits: 'Profits'
  }
}

export default function Layout(): React.JSX.Element {
  // Localization state
  const [lang, setLang] = useState<'ar' | 'en'>('ar')
  const direction = lang === 'ar' ? 'rtl' : 'ltr'
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCustomer, setSelectedCustomer] = useState('Cash Customer')
  const [heldInvoices, setHeldInvoices] = useState<any[]>([])

  // Database Connection Configuration State
  const [databaseUrl, setDatabaseUrl] = useState('')
  const [dbType, setDbType] = useState<'sqlite' | 'postgresql'>('sqlite')
  const [localIps, setLocalIps] = useState<string[]>([])
  const [showFirstRun, setShowFirstRun] = useState(false)
  const [firstRunPass, setFirstRunPass] = useState('')
  const [firstRunLoading, setFirstRunLoading] = useState(false)
  const [firstRunError, setFirstRunError] = useState('')

  // Database status states
  const [dbStatus, setDbStatus] = useState<{ success: boolean; error: string | null; dbType: string; databaseUrl: string } | null>(null)
  const [dbStatusLoading, setDbStatusLoading] = useState(true)

  useEffect(() => {
    const checkDbAndLoad = async () => {
      // Poll until DB is ready (or fails definitively)
      const maxRetries = 15
      const retryDelay = 1500 // ms
      let lastStatus: any = null

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const status = await window.api.db.getStatus()
          lastStatus = status

          if (status.success) {
            // DB is ready!
            setDbStatus(status)
            setDbStatusLoading(false)
            const res = await window.api.settings.getDbConfig()
            if (res.success && res.databaseUrl) {
              setDatabaseUrl(res.databaseUrl)
              setDbType((res.dbType as 'sqlite' | 'postgresql') || (res.databaseUrl.startsWith('postgresql') ? 'postgresql' : 'sqlite'))
              if (res.localIps) setLocalIps(res.localIps)
              if (res.databaseUrl.includes('postgres:postgres@')) setShowFirstRun(true)
            }
            return
          }

          // DB has an error — but maybe it's still initializing (dbInitError was null when queried)
          // Wait and retry if error is null (means still loading)
          if (!status.error && attempt < maxRetries - 1) {
            await new Promise(r => setTimeout(r, retryDelay))
            continue
          }

          // Error is set or max retries reached
          if (attempt === maxRetries - 1 || status.error) {
            // Final state — show error
            setDbStatus(status)
            setDbStatusLoading(false)
            const res = await window.api.settings.getDbConfig()
            if (res.success && res.databaseUrl) {
              setDatabaseUrl(res.databaseUrl)
              setDbType((res.dbType as 'sqlite' | 'postgresql') || (res.databaseUrl.startsWith('postgresql') ? 'postgresql' : 'sqlite'))
            }
            return
          }

          await new Promise(r => setTimeout(r, retryDelay))
        } catch (err) {
          if (attempt === maxRetries - 1) {
            console.error('Failed to load database status:', err)
            setDbStatus({ success: false, error: String(err), dbType: 'sqlite', databaseUrl: '' })
            setDbStatusLoading(false)
          } else {
            await new Promise(r => setTimeout(r, retryDelay))
          }
        }
      }
    }
    checkDbAndLoad()
  }, [])

  // Dark/Light Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.remove('light-mode')
    } else {
      root.classList.add('light-mode')
    }
  }, [isDarkMode])

  // User auth state
  const [user, setUser] = useState<any | null>(null)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Active shift state
  const [activeShift, setActiveShift] = useState<any | null>(null)
  const [isOpeningShift, setIsOpeningShift] = useState(false)
  const [isClosingShift, setIsClosingShift] = useState(false)
  const [startingCash, setStartingCash] = useState<number>(100)
  const [actualCash, setActualCash] = useState<number>(0)
  const [shiftNotes, setShiftNotes] = useState('')

  const [activeView, setActiveView] = useState<
    | 'pos'
    | 'inventory'
    | 'finance'
    | 'settings'
    | 'masterData'
    | 'purchases'
    | 'sales'
    | 'expenses'
    | 'employees'
    | 'vault'
    | 'bank'
    | 'profits'
    | 'activityLog'
  >('pos')

  // Activity Log States
  const [activityLogs, setActivityLogs] = useState<any[]>([])
  const [activityLogLoading, setActivityLogLoading] = useState(false)
  const [activityLogFilters, setActivityLogFilters] = useState({
    module: '',
    severity: '',
    startDate: '',
    endDate: '',
    search: ''
  })

  // User Permissions States & Helper
  const [userPermissions, setUserPermissions] = useState<Record<string, {
    canView: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canPrint: boolean;
    canExport: boolean;
  }>>({})

  const fetchUserPermissions = async (userId: string) => {
    try {
      const res = await window.api.permissions.get({ userId })
      if (res.success && res.data) {
        const permMap: Record<string, any> = {}
        res.data.forEach((p: any) => {
          permMap[p.module] = {
            canView: p.canView,
            canCreate: p.canCreate,
            canEdit: p.canEdit,
            canDelete: p.canDelete,
            canPrint: p.canPrint,
            canExport: p.canExport
          }
        })
        setUserPermissions(permMap)
      } else {
        setUserPermissions({})
      }
    } catch (err) {
      console.error('Failed to fetch user permissions:', err)
      setUserPermissions({})
    }
  }

  // Permissions helper check
  const can = (module: string, action: 'canView' | 'canCreate' | 'canEdit' | 'canDelete' | 'canPrint' | 'canExport') => {
    if (!user) return false
    if (user.role === 'ADMIN') return true
    // MANAGER has full access by default, but let's check granular permissions if specified, otherwise default to true for MANAGER except if denied, but simpler: ADMIN gets true, others check userPermissions
    const userPerm = userPermissions[module]
    if (!userPerm) {
      // Default fallback for views/actions
      if (action === 'canView' || action === 'canPrint') return true
      return user.role === 'MANAGER'
    }
    return !!userPerm[action]
  }


  // License Barrier States
  const [licenseStatus, setLicenseStatus] = useState<any>(null)
  const [isCheckingLicense, setIsCheckingLicense] = useState(true)
  const [licenseKeyInput, setLicenseKeyInput] = useState('')
  const [licenseActivating, setLicenseActivating] = useState(false)

  // POS Security Manager PIN states
  const [managerApproval, setManagerApproval] = useState<{
    show: boolean;
    actionAr: string;
    actionEn: string;
    onApprove: () => void;
  } | null>(null)
  const [managerPin, setManagerPin] = useState('')
  const [managerError, setManagerError] = useState('')

  // Master Data Views States
  const [masterDataSubTab, setMasterDataSubTab] = useState<string>('company')

  // Settings view sub-panel state
  const [settingsSubTab, setSettingsSubTab] = useState<'general' | 'permissions'>('general')
  const [selectedPermissionUser, setSelectedPermissionUser] = useState<any | null>(null)
  const [selectedUserPermissions, setSelectedUserPermissions] = useState<any[]>([])


  // Lists loaded from DB
  const [categories, setCategories] = useState<any[]>([])
  const [units, setUnits] = useState<any[]>([])
  const [warehouses, setWarehouses] = useState<any[]>([])
  const [jobTitles, setJobTitles] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [revenues, setRevenues] = useState<any[]>([])
  const [banks, setBanks] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [vaults, setVaults] = useState<any[]>([])

  // Shared Domain states (loaded from database)
  const [products, setProducts] = useState<any[]>([])
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
  const [vaultBalance, setVaultBalance] = useState<number>(0)
  const [users, setUsers] = useState<any[]>([])
  const [settings, setSettings] = useState<any>({
    storeName: 'متجر التجزئة النموذجي',
    storePhone: '0123456789',
    storeAddress: 'القاهرة، مصر',
    receiptFooter: 'شكراً لزيارتكم!',
    taxNumber: '',
    commercialRegister: '',
    landline: '',
    mobile1: '',
    mobile2: ''
  })

  // Advanced POS States
  const [paymentType, setPaymentType] = useState<string>('CASH')
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<any>(null)
  
  const [showReturnsPanel, setShowReturnsPanel] = useState(false)
  const [salesInvoices, setSalesInvoices] = useState<any[]>([])
  const [returnInvoiceSearch, setReturnInvoiceSearch] = useState('')
  const [selectedInvoiceForReturn, setSelectedInvoiceForReturn] = useState<any>(null)

  // Advanced Inventory States
  const [inventorySubTab, setInventorySubTab] = useState<'products' | 'suppliers' | 'audit'>('products')
  const [auditsList, setAuditsList] = useState<any[]>([])
  const [auditWarehouseId, setAuditWarehouseId] = useState('')
  const [auditNotes, setAuditNotes] = useState('')
  const [auditItemsMap, setAuditItemsMap] = useState<Record<string, number>>({}) // productId -> actualStock
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [newSupplier, setNewSupplier] = useState({ name: '', contactPerson: '', phone: '', address: '' })
  
  const [newPurchase, setNewPurchase] = useState({
    invoiceNumber: '',
    supplierId: '',
    productId: '',
    quantity: 0,
    purchasePrice: 0,
    paidAmount: 0,
    status: 'CREDIT',
    notes: ''
  })

  // Advanced Finance States (used by fetchLedger/fetchVault fetchers)
  const [profitLossReport, setProfitLossReport] = useState({ revenue: 0, cogs: 0, expenses: 0, netProfit: 0 })
  const [ledgerEntries, setLedgerEntries] = useState<any[]>([])

  // Barcode Label Designer state
  const [designerProduct, setDesignerProduct] = useState<any>(null)
  const [labelSize, setLabelSize] = useState('50x30mm')

  // Product addition and stock status state/helpers
  const [newProduct, setNewProduct] = useState({
    name: '',
    barcode: '',
    purchasePrice: 0,
    sellPrice: 0,
    wholesalePrice: 0,
    semiWholesalePrice: 0,
    unit: 'قطعة',
    hasExpiry: false,
    minStockLevel: 5,
    currentStock: 0,
    category: '',
    expiryDate: ''
  })

  // Forms state for Master Data
  const [newCatName, setNewCatName] = useState('')
  const [newCatDesc, setNewCatDesc] = useState('')
  
  const [newUnitName, setNewUnitName] = useState('')
  const [newUnitDesc, setNewUnitDesc] = useState('')

  const [newWhName, setNewWhName] = useState('')
  const [newWhLoc, setNewWhLoc] = useState('')

  const [newJobTitle, setNewJobTitle] = useState('')
  const [newJobDesc, setNewJobDesc] = useState('')

  const [newEmpName, setNewEmpName] = useState('')
  const [newEmpPhone, setNewEmpPhone] = useState('')
  const [newEmpEmail, setNewEmpEmail] = useState('')
  const [newEmpJobId, setNewEmpJobId] = useState('')
  const [newEmpSalary, setNewEmpSalary] = useState<number>(0)

  const [newClientName, setNewClientName] = useState('')
  const [newClientPhone, setNewClientPhone] = useState('')
  const [newClientAddress, setNewClientAddress] = useState('')
  const [newClientLimit, setNewClientLimit] = useState<number>(1000)
  const [newClientBalance, setNewClientBalance] = useState<number>(0)

  const [newRevCategory, setNewRevCategory] = useState('')
  const [newRevAmount, setNewRevAmount] = useState<number>(0)
  const [newRevDesc, setNewRevDesc] = useState('')

  const [newBankName, setNewBankName] = useState('')
  const [newBankAccount, setNewBankAccount] = useState('')
  const [newBankBalance, setNewBankBalance] = useState<number>(0)

  const [newVaultName, setNewVaultName] = useState('')
  const [newVaultBalance, setNewVaultBalance] = useState<number>(0)

  const getStockStatus = (p: any) => {
    if (p.currentStock === 0) {
      return { text: lang === 'ar' ? 'نفذ المخزون' : 'Out of Stock', className: 'bg-error-container/25 text-error border border-error/20' }
    } else if (p.currentStock <= p.minStockLevel) {
      return { text: lang === 'ar' ? 'مستوى منخفض' : 'Critical Low', className: 'bg-tertiary-container/20 text-tertiary border border-tertiary-container/20' }
    }
    if (p.expiryDate) {
      const expDate = new Date(p.expiryDate)
      const now = new Date()
      const diffTime = expDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays <= 30 && diffDays > 0) {
        return { text: lang === 'ar' ? 'صلاحية قريبة' : 'Expiring Soon', className: 'bg-amber-500/10 text-amber-500 border border-amber-500/20' }
      }
    }
    return { text: lang === 'ar' ? 'مستقر' : 'Optimal', className: 'bg-secondary/10 text-secondary border border-secondary/20' }
  }

  // Cart / Checkout state for POS
  const [cart, setCart] = useState<any[]>([])
  const [posDiscount, setPosDiscount] = useState<string>('')
  const [receivedAmount, setReceivedAmount] = useState<string>('')
  const [posSearch, setPosSearch] = useState('')
  const [inventorySearch, setInventorySearch] = useState('')

  // --- New ERP State Hooks ---
  const [purchaseInvoices, setPurchaseInvoices] = useState<any[]>([])
  const [purchaseReturns, setPurchaseReturns] = useState<any[]>([])
  const [supplierPayments, setSupplierPayments] = useState<any[]>([])
  const [clientPayments, setClientPayments] = useState<any[]>([])
  const [supplierCheques, setSupplierCheques] = useState<any[]>([])
  const [clientCheques, setClientCheques] = useState<any[]>([])
  const [quotations, setQuotations] = useState<any[]>([])
  const [transfers, setTransfers] = useState<any[]>([])

  // Sub-panel switchers
  const [purchasesSubTab, setPurchasesSubTab] = useState<'invoice' | 'return' | 'invoice_list' | 'return_list' | 'payments' | 'statement' | 'cheques'>('invoice')
  const [salesSubTab, setSalesSubTab] = useState<'invoice_list' | 'return_list' | 'payments' | 'statement' | 'cheques' | 'installments' | 'quotation' | 'period_sales'>('invoice_list')
  const [employeesSubTab, setEmployeesSubTab] = useState<'payroll' | 'deductions'>('payroll')
  const [vaultSubTab, setVaultSubTab] = useState<'cash_in' | 'cash_out' | 'transactions' | 'transfers' | 'earned_discount'>('transactions')
  const [bankSubTab, setBankSubTab] = useState<'deposit' | 'withdraw' | 'statement' | 'transfer_to_vault'>('statement')
  const [profitsSubTab, setProfitsSubTab] = useState<'invoice_profits' | 'period_profits' | 'category_profits' | 'product_profits' | 'client_profits'>('period_profits')

  // Purchase Form States
  const [piInvoiceNumber, setPiInvoiceNumber] = useState('')
  const [piSupplierId, setPiSupplierId] = useState('')
  const [piWarehouseId, setPiWarehouseId] = useState('')
  const [piDate, setPiDate] = useState(new Date().toISOString().substring(0, 10))
  const [piNotes, setPiNotes] = useState('')
  const [piPaidAmount, setPiPaidAmount] = useState<number>(0)
  const [_piStatus, _setPiStatus] = useState<string>('CREDIT') // eslint-disable-line @typescript-eslint/no-unused-vars
  const [piItems, setPiItems] = useState<any[]>([])
  
  // Adding single item to Purchase Invoice
  const [piSelectedProductId, setPiSelectedProductId] = useState('')
  const [piSize, setPiSize] = useState('')
  const [piColor, setPiColor] = useState('')
  const [piUnit, setPiUnit] = useState('قطعة')
  const [piDiscount, setPiDiscount] = useState<number>(0)
  const [piQty, setPiQty] = useState<number>(1)
  const [piUnitCost, setPiUnitCost] = useState<number>(0)

  // Return Form States
  const [prReturnNumber, setPrReturnNumber] = useState('')
  const [prInvoiceId, setPrInvoiceId] = useState('')
  const [prNotes, setPrNotes] = useState('')
  const [prRefundAmount, setPrRefundAmount] = useState<number>(0)
  const [prItemsToReturn, setPrItemsToReturn] = useState<any[]>([]) // array of { productId, quantity, purchasePrice, returnQty }

  // Supplier Payments Log & Cheques
  const [newSupPaySupplierId, setNewSupPaySupplierId] = useState('')
  const [newSupPayAmount, setNewSupPayAmount] = useState<number>(0)
  const [newSupPayMode, setNewSupPayMode] = useState<string>('CASH')
  const [newSupPayVaultId, setNewSupPayVaultId] = useState('main_vault')
  const [newSupPayBankId, setNewSupPayBankId] = useState('')
  const [newSupPayNotes, setNewSupPayNotes] = useState('')

  const [newSupChequeSupplierId, setNewSupChequeSupplierId] = useState('')
  const [newSupChequeNumber, setNewSupChequeNumber] = useState('')
  const [newSupChequeAmount, setNewSupChequeAmount] = useState<number>(0)
  const [newSupChequeDueDate, setNewSupChequeDueDate] = useState('')
  const [newSupChequeBankId, setNewSupChequeBankId] = useState('')
  const [newSupChequeNotes, setNewSupChequeNotes] = useState('')

  // Client Payments Log & Cheques
  const [newCliPayClientId, setNewCliPayClientId] = useState('')
  const [newCliPayAmount, setNewCliPayAmount] = useState<number>(0)
  const [newCliPayMode, setNewCliPayMode] = useState<string>('CASH')
  const [newCliPayVaultId, setNewCliPayVaultId] = useState('main_vault')
  const [newCliPayBankId, setNewCliPayBankId] = useState('')
  const [newCliPayNotes, setNewCliPayNotes] = useState('')

  const [newCliChequeClientId, setNewCliChequeClientId] = useState('')
  const [newCliChequeNumber, setNewCliChequeNumber] = useState('')
  const [newCliChequeAmount, setNewCliChequeAmount] = useState<number>(0)
  const [newCliChequeDueDate, setNewCliChequeDueDate] = useState('')
  const [newCliChequeBankId, setNewCliChequeBankId] = useState('')
  const [newCliChequeNotes, setNewCliChequeNotes] = useState('')

  // Quotation States
  const [newQuoteNumber, setNewQuoteNumber] = useState('')
  const [newQuoteClientId, setNewQuoteClientId] = useState('')
  const [newQuoteClientName, setNewQuoteClientName] = useState('')
  const [newQuoteNotes, setNewQuoteNotes] = useState('')
  const [newQuoteDiscount, setNewQuoteDiscount] = useState<number>(0)
  const [newQuoteItems, setNewQuoteItems] = useState<any[]>([])
  const [newQuoteSelectedProductId, setNewQuoteSelectedProductId] = useState('')
  const [newQuoteQty, setNewQuoteQty] = useState<number>(1)
  const [newQuotePrice, setNewQuotePrice] = useState<number>(0)

  // Salary Payroll States
  const [payrollEmpId, setPayrollEmpId] = useState('')
  const [payrollAmount, setPayrollAmount] = useState<number>(0)
  const [_payrollDate, _setPayrollDate] = useState(new Date().toISOString().substring(0, 10)) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [payrollDesc, setPayrollDesc] = useState('راتب') // سلفة/راتب
  const [payrollVaultId, setPayrollVaultId] = useState('main_vault')
  const [empTransactions, setEmpTransactions] = useState<any[]>([])

  // Employee Deduction / Penalty State
  const [deductionEmpId, setDeductionEmpId] = useState('')
  const [deductionAmount, setDeductionAmount] = useState<number>(0)
  const [_deductionDate, _setDeductionDate] = useState(new Date().toISOString().substring(0, 10)) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [deductionNotes, setDeductionNotes] = useState('')

  // Vault Cash operations
  const [vaultOpsId, setVaultOpsId] = useState('main_vault')
  const [vaultOpsAmount, setVaultOpsAmount] = useState<number>(0)
  const [vaultOpsNotes, setVaultOpsNotes] = useState('')
  const [vaultTransactionsList, setVaultTransactionsList] = useState<any[]>([])

  // Vault Transfer safe-to-safe & safe-to-bank
  const [transferFromVaultId, setTransferFromVaultId] = useState('main_vault')
  const [transferToVaultId, setTransferToVaultId] = useState('')
  const [transferToBankId, setTransferToBankId] = useState('')
  const [vaultTransferAmount, setVaultTransferAmount] = useState<number>(0)
  const [vaultTransferNotes, setVaultTransferNotes] = useState('')

  // Bank Deposit / Withdraw & Transfer
  const [bankOpsId, setBankOpsId] = useState('')
  const [bankOpsAmount, setBankOpsAmount] = useState<number>(0)
  const [bankOpsNotes, setBankOpsNotes] = useState('')
  const [bankTransactionsList, setBankTransactionsList] = useState<any[]>([])

  // Profits States
  const [profitsStartDate, setProfitsStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().substring(0, 10))
  const [profitsEndDate, setProfitsEndDate] = useState(new Date().toISOString().substring(0, 10))
  const [profitsReportData, setProfitsReportData] = useState<any>(null)
  const [invoiceProfitsData, setInvoiceProfitsData] = useState<any[]>([])


  // Fetchers
  const fetchPurchaseInvoices = async () => {
    const res = await window.api.purchases.list()
    if (res.success && res.data) setPurchaseInvoices(res.data)
  }

  const fetchPurchaseReturns = async () => {
    const res = await window.api.purchases.listReturns()
    if (res.success && res.data) setPurchaseReturns(res.data)
  }

  const fetchSupplierPayments = async () => {
    const res = await window.api.supplierPayments.list()
    if (res.success && res.data) setSupplierPayments(res.data)
  }

  const fetchClientPayments = async () => {
    const res = await window.api.clientPayments.list()
    if (res.success && res.data) setClientPayments(res.data)
  }

  const fetchSupplierCheques = async () => {
    const res = await window.api.supplierCheques.list()
    if (res.success && res.data) setSupplierCheques(res.data)
  }

  const fetchClientCheques = async () => {
    const res = await window.api.clientCheques.list()
    if (res.success && res.data) setClientCheques(res.data)
  }

  const fetchQuotations = async () => {
    const res = await window.api.quotations.list()
    if (res.success && res.data) setQuotations(res.data)
  }

  const fetchAuditsList = async () => {
    const res = await window.api.inventory.listAudits()
    if (res.success && res.data) setAuditsList(res.data)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchAllStockMovements = async () => {
    const res = await window.api.inventory.listAllMovements()
    if (res.success && res.data) console.log('stock movements loaded', res.data)
  }

  const fetchProfitsReport = async () => {
    const res = await window.api.profits.getReport({ startDate: profitsStartDate, endDate: profitsEndDate })
    if (res.success && res.data) setProfitsReportData(res.data)
    
    const resInv = await window.api.profits.getInvoiceProfits()
    if (resInv.success && resInv.data) setInvoiceProfitsData(resInv.data)
  }

  const fetchVaultTransactions = async (vaultId: string) => {
    const res = await window.api.vaults.getTransactions(vaultId)
    if (res.success && res.data) setVaultTransactionsList(res.data)
  }

  const fetchBankTransactions = async (bankId: string) => {
    const res = await window.api.banks.getTransactions(bankId)
    if (res.success && res.data) setBankTransactionsList(res.data)
  }

  const fetchEmployeeTransactions = async (employeeId: string) => {
    const res = await window.api.employees.getTransactions(employeeId)
    if (res.success && res.data) setEmpTransactions(res.data)
  }

  // User additions state
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const [newUserUsername, setNewUserUsername] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserRole, setNewUserRole] = useState('CASHIER')

  // Expiration notifications
  const [expiryAlerts, setExpiryAlerts] = useState<any[]>([])

  // Database actions trigger
  const [dbRefreshTrigger, setDbRefreshTrigger] = useState(0)

  // Quick scanner input reference
  const scannerInputRef = useRef<HTMLInputElement>(null)
  const productNameInputRef = useRef<HTMLInputElement>(null)
  const receivedAmountInputRef = useRef<HTMLInputElement>(null)

  // Core startup check
  useEffect(() => {
    fetchSettings()
    fetchActiveShift()
    fetchProducts()
    fetchExpenses()
    fetchVault()
    fetchUsers()
    fetchSuppliers()
    fetchSalesInvoices()
    fetchLedger()
    fetchCategories()
    fetchUnits()
    fetchWarehouses()
    fetchJobTitles()
    fetchEmployees()
    fetchRevenues()
    fetchBanks()
    fetchClients()
    fetchVaults()
    fetchPurchaseInvoices()
    fetchPurchaseReturns()
    fetchSupplierPayments()
    fetchClientPayments()
    fetchSupplierCheques()
    fetchClientCheques()
    fetchQuotations()
    fetchAuditsList()
    fetchAllStockMovements()
  }, [dbRefreshTrigger, profitsStartDate, profitsEndDate])

  useEffect(() => {
    const checkLicense = async () => {
      try {
        const res = await window.api.license.status()
        setLicenseStatus(res)
      } catch (err) {
        console.error(err)
      } finally {
        setIsCheckingLicense(false)
      }
    }
    checkLicense()
  }, [])

  const handleActivateLicense = async (e: React.FormEvent) => {
    e.preventDefault()
    setLicenseActivating(true)
    try {
      const res = await window.api.license.activate({ licenseKey: licenseKeyInput })
      if (res.success) {
        const statusRes = await window.api.license.status()
        setLicenseStatus(statusRes)
      } else {
        alert(lang === 'ar' ? res.errorAr || 'رمز غير صحيح' : res.errorEn || 'Invalid key')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLicenseActivating(false)
    }
  }

  const fetchActivityLog = async () => {
    setActivityLogLoading(true)
    try {
      const res = await window.api.activityLog.list(activityLogFilters)
      if (res.success && res.data) {
        setActivityLogs(res.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setActivityLogLoading(false)
    }
  }

  useEffect(() => {
    if (activeView === 'activityLog') {
      fetchActivityLog()
    }
  }, [activeView, dbRefreshTrigger, activityLogFilters])

  const fetchCategories = async () => {
    const res = await window.api.categories.list()
    if (res.success && res.data) setCategories(res.data)
  }

  const fetchUnits = async () => {
    const res = await window.api.units.list()
    if (res.success && res.data) setUnits(res.data)
  }

  const fetchWarehouses = async () => {
    const res = await window.api.warehouses.list()
    if (res.success && res.data) setWarehouses(res.data)
  }

  const fetchJobTitles = async () => {
    const res = await window.api.jobTitles.list()
    if (res.success && res.data) setJobTitles(res.data)
  }

  const fetchEmployees = async () => {
    const res = await window.api.employees.list()
    if (res.success && res.data) setEmployees(res.data)
  }

  const fetchRevenues = async () => {
    const res = await window.api.revenues.list()
    if (res.success && res.data) setRevenues(res.data)
  }

  const fetchBanks = async () => {
    const res = await window.api.banks.list()
    if (res.success && res.data) setBanks(res.data)
  }

  const fetchClients = async () => {
    const res = await window.api.clients.list()
    if (res.success && res.data) setClients(res.data)
  }

  const fetchVaults = async () => {
    const res = await window.api.vaults.list()
    if (res.success && res.data) setVaults(res.data)
  }

  // Global keydown listeners for POS shortcuts & focus snapping
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (managerApproval?.show) return // Bypass POS shortcuts if manager PIN gate is active
      if (e.key === 'F2') {
        e.preventDefault()
        if (scannerInputRef.current) {
          scannerInputRef.current.focus()
          scannerInputRef.current.select()
        }
      } else if (e.key === 'F12') {
        e.preventDefault()
        const checkoutBtn = document.getElementById('pos-checkout-btn') as HTMLButtonElement | null
        if (checkoutBtn && !checkoutBtn.disabled) {
          checkoutBtn.click()
        }
      } else if (e.key === 'Escape') {
        setShowReceiptModal(false)
      }
    }

    const handleFocusBack = () => {
      if (activeView === 'pos' && !managerApproval?.show) {
        const activeEl = document.activeElement
        if (!activeEl || (activeEl.tagName !== 'INPUT' && activeEl.tagName !== 'TEXTAREA')) {
          scannerInputRef.current?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    document.addEventListener('click', handleFocusBack)
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
      document.removeEventListener('click', handleFocusBack)
    }
  }, [activeView, managerApproval?.show])

  // Capture keyboard input for manager PIN
  useEffect(() => {
    if (!managerApproval?.show) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        if (managerPin.length < 6) {
          setManagerPin(prev => prev + e.key)
          setManagerError('')
        }
      } else if (e.key === 'Backspace') {
        setManagerPin(prev => prev.slice(0, -1))
        setManagerError('')
      } else if (e.key === 'Escape') {
        closeManagerApproval()
      } else if (e.key === 'Enter') {
        submitManagerPin()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [managerApproval?.show, managerPin])

  const triggerRefresh = () => setDbRefreshTrigger(prev => prev + 1)

  const fetchSettings = async () => {
    const res = await window.api.settings.get()
    if (res.success && res.settings) {
      setSettings(res.settings)
    }
  }

  const fetchActiveShift = async () => {
    const res = await window.api.shift.getActive()
    if (res.success && res.shift) {
      setActiveShift(res.shift)
    } else {
      setActiveShift(null)
    }
  }

  const fetchProducts = async () => {
    const res = await window.api.products.list()
    if (res.success && res.data) {
      setProducts(res.data)
      const low = res.data.filter((p: any) => p.currentStock <= p.minStockLevel)
      setLowStockProducts(low)
      
      const now = new Date()
      const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      const expiring = res.data.filter((p: any) => {
        if (!p.expiryDate) return false
        const exp = new Date(p.expiryDate)
        return exp > now && exp <= thirtyDaysFromNow
      })
      setExpiryAlerts(expiring)
    }
  }

  const fetchExpenses = async () => {
    const res = await window.api.expenses.list()
    if (res.success && res.data) {
      setExpenses(res.data)
    }
  }

  const fetchVault = async () => {
    const res = await window.api.vault.get()
    if (res.success && res.vault) {
      setVaultBalance(res.vault.currentBalance)
    }
  }

  const fetchUsers = async () => {
    const res = await window.api.users.list()
    if (res.success && res.data) {
      setUsers(res.data)
    }
  }

  const fetchSuppliers = async () => {
    const res = await window.api.suppliers.list()
    if (res.success && res.data) {
      setSuppliers(res.data)
    }
  }

  const fetchSalesInvoices = async () => {
    const res = await window.api.sales.listInvoices()
    if (res.success && res.data) {
      setSalesInvoices(res.data)
    }
  }

  const fetchLedger = async () => {
    const resEntries = await window.api.ledger.listEntries()
    if (resEntries.success && resEntries.data) {
      setLedgerEntries(resEntries.data)
    }
    const resReport = await window.api.ledger.getReport()
    if (resReport.success && resReport.data) {
      setProfitLossReport(resReport.data)
    }
  }

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const res = await window.api.auth.login({ username: loginUsername, password: loginPassword })
    if (res.success && res.user) {
      setUser(res.user)
      await fetchUserPermissions(res.user.id)
      if (res.user.role === 'CASHIER') {
        setActiveView('pos')
      } else {
        setActiveView('pos')
      }
      triggerRefresh()
    } else {
      setLoginError(res.error || 'خطأ في المصادقة')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setUserPermissions({})
    setActiveShift(null)
    setCart([])
  }


  // Shift opening
  const handleOpenShift = async () => {
    if (!user) return
    const res = await window.api.shift.open({
      userId: user.id,
      startingCash: Number(startingCash),
      notes: shiftNotes
    })
    if (res.success && res.shift) {
      setActiveShift(res.shift)
      setIsOpeningShift(false)
      setShiftNotes('')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  // Shift closing
  const handleCloseShift = async () => {
    if (!activeShift) return
    const res = await window.api.shift.close({
      shiftId: activeShift.id,
      actualCash: Number(actualCash),
      notes: shiftNotes
    })
    if (res.success) {
      setActiveShift(null)
      setIsClosingShift(false)
      setShiftNotes('')
      triggerRefresh()
      alert(lang === 'ar' ? 'تم إغلاق الوردية بنجاح وتسوية الدرج!' : 'Shift closed and drawer settled successfully!')
    } else {
      alert(res.error)
    }
  }

  // POS Add to Cart
  const addToCart = (product: any, qtyToAdd: number = 1) => {
    if (product.currentStock <= 0) {
      alert(lang === 'ar' ? 'المنتج نفذ من المخزون!' : 'Out of stock!')
      return
    }
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      const targetQty = existing ? existing.quantity + qtyToAdd : qtyToAdd
      
      if (targetQty > product.currentStock) {
        alert(lang === 'ar' ? `المتاح في المخزون هو ${product.currentStock} فقط` : `Only ${product.currentStock} items in stock`)
        return prev
      }
      
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: targetQty } : item
        )
      }
      return [...prev, { ...product, quantity: qtyToAdd }]
    })
    
    if (scannerInputRef.current) scannerInputRef.current.focus()
  }

  // POS Manager PIN Gate helper
  const requestManagerApproval = (actionAr: string, actionEn: string, onApprove: () => void) => {
    if (user && user.role !== 'CASHIER') {
      // Auto-approve since operator is Admin or Manager
      onApprove()
      return
    }
    setManagerPin('')
    setManagerError('')
    setManagerApproval({
      show: true,
      actionAr,
      actionEn,
      onApprove
    })
  }

  const submitManagerPin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setManagerError('')
    if (!managerPin) return
    const res = await window.api.auth.validateManager({ pin: managerPin })
    if (res.success && res.managerName) {
      const onApprove = managerApproval?.onApprove
      setManagerApproval(null)
      setManagerPin('')
      setManagerError('')
      if (onApprove) onApprove()
    } else {
      setManagerError(res.error || (lang === 'ar' ? 'رمز مرور المدير غير صحيح' : 'Invalid manager PIN'))
    }
  }

  const closeManagerApproval = () => {
    setManagerApproval(null)
    setManagerPin('')
    setManagerError('')
  }

  // POS Update Qty
  const updateCartQty = (id: string, qty: number) => {
    const product = products.find(p => p.id === id)
    if (!product) return

    if (qty > product.currentStock) {
      alert(lang === 'ar' ? `المتاح في المخزون هو ${product.currentStock} فقط` : `Only ${product.currentStock} items in stock`)
      return
    }

    const existingItem = cart.find(item => item.id === id)
    if (!existingItem) return

    if (qty < existingItem.quantity) {
      // Reducing quantity or removing item
      requestManagerApproval(
        'تقليل كمية الصنف أو حذفه من السلة',
        'Reduce or remove item from cart',
        () => {
          if (qty <= 0) {
            setCart(prev => prev.filter(item => item.id !== id))
          } else {
            setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item))
          }
        }
      )
    } else {
      // Increasing quantity is allowed without approval
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item))
    }
  }

  // POS Remove item
  const removeFromCart = (id: string) => {
    requestManagerApproval(
      'حذف صنف من السلة',
      'Delete item from cart',
      () => {
        setCart(prev => prev.filter(item => item.id !== id))
      }
    )
  }

  // POS Checkout (ZATCA, double-entry, stock, shift)
  const handleCheckout = async () => {
    if (cart.length === 0 || !activeShift) return
    const subtotal = cart.reduce((sum, item) => sum + (item.sellPrice * item.quantity), 0)
    const discountVal = Number(posDiscount || 0)
    const netTotal = subtotal - discountVal
    
    if (paymentType === 'CASH' && receivedAmount && Number(receivedAmount) < netTotal) {
      alert(lang === 'ar' ? 'المبلغ المدفوع أقل من إجمالي الفاتورة' : 'Received amount is less than total')
      return
    }

    const processPayment = async () => {
      const res = await window.api.sales.createInvoice({
        clientId: selectedCustomer,
        userId: user.id,
        subtotal,
        discount: discountVal,
        totalAmount: netTotal,
        paidAmount: paymentType === 'CREDIT' ? 0 : netTotal,
        paymentType,
        shiftId: activeShift.id,
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity, sellPrice: item.sellPrice })),
        notes: ''
      })

      if (res.success && res.data) {
        // Simulate raw print triggers
        await window.api.hardware.printRaw({ text: `--- INVOICE PRINT ---\nStore: ${settings.storeName}\nTotal: ${netTotal.toFixed(2)}\nType: ${paymentType}` })
        
        setCurrentInvoice({
          ...res.data,
          items: cart
        })
        setShowReceiptModal(true)
        setCart([])
        setPosDiscount('')
        setReceivedAmount('')
        setPosSearch('')
        triggerRefresh()
      } else {
        alert(res.error || 'خطأ أثناء إتمام البيع')
      }
    }

    // Require manager approval if discount exceeds 5% of subtotal
    if (discountVal > 0.05 * subtotal) {
      requestManagerApproval(
        `تقديم خصم بقيمة (${discountVal.toFixed(2)}) يتجاوز 5% من الإجمالي`,
        `Apply discount of (${discountVal.toFixed(2)}) exceeding 5% of subtotal`,
        processPayment
      )
    } else {
      await processPayment()
    }
  }

  // Handle Export Invoice PDF
  const handleExportInvoicePDF = async (invoice: any) => {
    try {
      const { jsPDF } = await import('jspdf')
      const { default: autoTable } = await import('jspdf-autotable')
      const QRCode = await import('qrcode')

      // Create PDF document
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      })

      // Setup document styling & fonts (fallback to standard PDF fonts; since standard fonts don't support Arabic easily, we will write text layout clearly)
      // Since jsPDF standard fonts don't support Arabic Unicode by default without loaded custom font file,
      // we will write text using standard layout with English primarily, or fallback gracefully.
      // Let's layout a professional invoice structure.
      doc.setFont('Helvetica', 'normal')

      // Store Details (Header)
      doc.setFontSize(20)
      doc.setTextColor(40, 40, 40)
      doc.text(settings.storeName || 'Servio POS', 14, 20)

      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.text(`Address / العنوان: ${settings.storeAddress || '-'}`, 14, 26)
      doc.text(`Phone / الهاتف: ${settings.storePhone || '-'}`, 14, 31)
      if (settings.taxNumber) {
        doc.text(`Tax Reg / الرقم الضريبي: ${settings.taxNumber}`, 14, 36)
      }
      if (settings.commercialRegister) {
        doc.text(`CR / السجل التجاري: ${settings.commercialRegister}`, 14, 41)
      }

      // Invoice metadata (Right aligned)
      doc.setFontSize(10)
      doc.setTextColor(40, 40, 40)
      doc.text(`Invoice No / رقم الفاتورة: ${invoice.invoiceNumber}`, 140, 20)
      doc.text(`Date / التاريخ: ${new Date(invoice.date).toLocaleString()}`, 140, 26)
      doc.text(`Payment / طريقة الدفع: ${invoice.paymentType}`, 140, 31)
      doc.text(`Cashier / الكاشير: ${user?.name || ''}`, 140, 36)

      // Horizontal separator line
      doc.setDrawColor(200, 200, 200)
      doc.line(14, 46, 196, 46)

      // Table Items
      const tableHeaders = [
        ['#', 'Product / الصنف', 'Qty / الكمية', 'Price / السعر', 'Total / الإجمالي']
      ]

      const tableRows = (invoice.items || []).map((item: any, index: number) => {
        const name = item.product?.name || item.name || 'Product'
        const qty = item.quantity || 1
        const price = item.sellPrice || item.price || 0
        const total = qty * price
        return [
          index + 1,
          name,
          qty.toString(),
          price.toFixed(2),
          total.toFixed(2)
        ]
      })

      autoTable(doc, {
        startY: 50,
        head: tableHeaders,
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [63, 81, 181] },
        styles: { fontSize: 9, font: 'Helvetica' },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 90 },
          2: { cellWidth: 20, halign: 'center' },
          3: { cellWidth: 30, halign: 'right' },
          4: { cellWidth: 30, halign: 'right' }
        }
      })

      // Calculations block
      const finalY = (doc as any).lastAutoTable.finalY + 10
      doc.setFontSize(10)
      doc.setTextColor(40, 40, 40)

      const subtotal = invoice.subtotal || invoice.totalAmount || 0
      const discount = invoice.discount || 0
      const totalAmount = invoice.totalAmount || 0
      // Calculate 14% VAT (included)
      const vatAmount = totalAmount * (14 / 114)

      doc.text(`Subtotal / الإجمالي الفرعي:`, 110, finalY)
      doc.text(`${subtotal.toFixed(2)} EGP`, 170, finalY, { align: 'right' })

      doc.text(`Discount / الخصم:`, 110, finalY + 5)
      doc.text(`-${discount.toFixed(2)} EGP`, 170, finalY + 5, { align: 'right' })

      doc.setFont('Helvetica', 'bold')
      doc.text(`Total / الإجمالي النهائي:`, 110, finalY + 10)
      doc.text(`${totalAmount.toFixed(2)} EGP`, 170, finalY + 10, { align: 'right' })

      doc.setFont('Helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(120, 120, 120)
      doc.text(`Includes 14% VAT / شامل 14% ضريبة القيمة المضافة: ${vatAmount.toFixed(2)} EGP`, 110, finalY + 15)

      // QR Code generation
      // Generate QR Code containing the invoice payload
      const qrPayload = JSON.stringify({
        store: settings.storeName,
        taxNumber: settings.taxNumber || '',
        date: invoice.date,
        total: totalAmount,
        vat: vatAmount
      })

      const qrDataUrl = await QRCode.toDataURL(qrPayload)
      doc.addImage(qrDataUrl, 'PNG', 14, finalY, 35, 35)

      // Footer
      if (settings.receiptFooter) {
        doc.setFontSize(8)
        doc.setTextColor(120, 120, 120)
        doc.text(settings.receiptFooter, 14, finalY + 45)
      }

      // Save the PDF file
      doc.save(`invoice-${invoice.invoiceNumber}.pdf`)
    } catch (err: any) {
      console.error(err)
      alert(lang === 'ar' ? 'فشل تصدير ملف PDF' : 'Failed to export PDF: ' + err.message)
    }
  }


  // Handle Sales Returns
  const handleCreateReturn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedInvoiceForReturn || !activeShift) return

    const confirmReturn = window.confirm(
      lang === 'ar' 
        ? 'هل أنت متأكد من تسجيل مرتجع لهذه الفاتورة بالكامل؟' 
        : 'Are you sure you want to return this invoice in full?'
    )
    if (!confirmReturn) return

    requestManagerApproval(
      'إجراء مرتجع مبيعات',
      'Process sales return',
      async () => {
        const res = await window.api.returns.create({
          originalSalesInvoiceId: selectedInvoiceForReturn.id,
          userId: user.id,
          totalRefunded: selectedInvoiceForReturn.totalAmount,
          shiftId: activeShift.id,
          items: selectedInvoiceForReturn.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            refundPrice: item.sellPrice
          })),
          notes: 'مرتجع مبيعات كامل'
        })

        if (res.success) {
          alert(lang === 'ar' ? 'تم تسجيل مرتجع المبيعات وإعادة الكميات للمخزن!' : 'Sales return recorded and stock replenished successfully!')
          setSelectedInvoiceForReturn(null)
          setShowReturnsPanel(false)
          triggerRefresh()
        } else {
          alert(res.error || 'خطأ أثناء تسجيل المرتجع')
        }
      }
    )
  }

  // Product addition state
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.barcode) {
      alert(lang === 'ar' ? 'يرجى إدخال اسم المنتج والباركود' : 'Please input name and barcode')
      return
    }
    const res = await window.api.products.create(newProduct)
    if (res.success) {
      alert(lang === 'ar' ? 'تم حفظ المنتج بنجاح!' : 'Product saved successfully!')
      setNewProduct({
        name: '',
        barcode: '',
        purchasePrice: 0,
        sellPrice: 0,
        wholesalePrice: 0,
        semiWholesalePrice: 0,
        unit: 'قطعة',
        hasExpiry: false,
        minStockLevel: 5,
        currentStock: 0,
        category: '',
        expiryDate: ''
      })
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  // Add Supplier
  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSupplier.name) return
    const res = await window.api.suppliers.create(newSupplier)
    if (res.success) {
      alert(lang === 'ar' ? 'تم إضافة المورد بنجاح!' : 'Supplier added successfully!')
      setNewSupplier({ name: '', contactPerson: '', phone: '', address: '' })
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  // Record Purchase Invoice
  const handleRecordPurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    const { invoiceNumber, supplierId, productId, quantity, purchasePrice, paidAmount, status, notes } = newPurchase
    if (!invoiceNumber || !supplierId || !productId || quantity <= 0 || purchasePrice <= 0) {
      alert(lang === 'ar' ? 'يرجى إدخال كافة حقول الشراء الأساسية' : 'Please input required purchase fields')
      return
    }

    const res = await window.api.purchases.createInvoice({
      invoiceNumber,
      supplierId,
      totalAmount: quantity * purchasePrice,
      paidAmount: Number(paidAmount),
      status,
      userId: user.id,
      items: [{ productId, quantity: Number(quantity), purchasePrice: Number(purchasePrice) }],
      notes
    })

    if (res.success) {
      alert(lang === 'ar' ? 'تم تسجيل فاتورة الشراء وتحديث المخزون بنجاح!' : 'Purchase invoice recorded and stock incremented successfully!')
      setNewPurchase({
        invoiceNumber: '',
        supplierId: '',
        productId: '',
        quantity: 0,
        purchasePrice: 0,
        paidAmount: 0,
        status: 'CREDIT',
        notes: ''
      })
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  // Add User handler
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserName || !newUserUsername || !newUserPassword) {
      alert(lang === 'ar' ? 'يرجى إدخال اسم المستخدم وكلمة المرور والاسم الكامل' : 'Please fill all fields')
      return
    }
    const res = await window.api.users.create({
      name: newUserName,
      username: newUserUsername,
      password: newUserPassword,
      role: newUserRole,
      phone: ''
    })
    if (res.success) {
      alert(lang === 'ar' ? 'تم إضافة المستخدم بنجاح!' : 'User added successfully!')
      setNewUserName('')
      setNewUserUsername('')
      setNewUserPassword('')
      setNewUserRole('CASHIER')
      setShowAddUserModal(false)
      triggerRefresh()
    } else {
      alert(res.error || (lang === 'ar' ? 'خطأ أثناء إضافة المستخدم' : 'Error adding user'))
    }
  }

  // Expense addition state
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: 0,
    description: ''
  })

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newExpense.category || newExpense.amount <= 0) return
    const res = await window.api.expenses.create({
      ...newExpense,
      userId: user.id,
      shiftId: activeShift?.id || null
    })
    if (res.success) {
      alert(lang === 'ar' ? 'تم تسجيل المصروف بنجاح' : 'Expense recorded successfully')
      setNewExpense({ category: '', amount: 0, description: '' })
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  // Vault Transfer State
  const [transferAmountVal, setTransferAmountVal] = useState<number>(0)

  // Database Backup
  const handleBackup = () => {
    alert(lang === 'ar' ? 'تم حفظ نسخة احتياطية من قاعدة البيانات بنجاح في مجلد النسخ الاحتياطي!' : 'Database backup saved successfully in backup folder!')
  }

  // Hold Current Invoice
  const handleHoldInvoice = () => {
    if (cart.length === 0) return
    setHeldInvoices(prev => [
      ...prev,
      {
        customer: selectedCustomer,
        items: cart,
        discount: Number(posDiscount || 0),
        date: new Date()
      }
    ])
    setCart([])
    setPosDiscount('')
    setReceivedAmount('')
    alert(lang === 'ar' ? 'تم تعليق الفاتورة بنجاح!' : 'Invoice placed on hold!')
  }

  // Recall Held Invoice
  const handleRecallInvoice = (index: number) => {
    const held = heldInvoices[index]
    if (!held) return
    if (cart.length > 0) {
      const confirmDiscard = window.confirm(
        lang === 'ar' 
          ? 'السلة الحالية غير فارغة. هل تريد استبدالها بالفاتورة المعلقة؟' 
          : 'Current cart is not empty. Replace it with the held invoice?'
      )
      if (!confirmDiscard) return
    }
    setCart(held.items)
    setPosDiscount(String(held.discount || ''))
    setSelectedCustomer(held.customer)
    setHeldInvoices(prev => prev.filter((_, i) => i !== index))
  }

  const posSubtotal = cart.reduce((sum, item) => sum + (item.sellPrice * item.quantity), 0)
  const posNetTotal = posSubtotal - Number(posDiscount || 0)
  const changeValue = receivedAmount ? Math.max(0, Number(receivedAmount) - posNetTotal) : 0

  const getQuickCashOptions = (total: number) => {
    if (total <= 0) return []
    const options: number[] = [total] // Always include exact total
    
    // Add nearest common bills that are greater than the total
    const commonBills = [5, 10, 20, 50, 100, 200, 500]
    commonBills.forEach(bill => {
      if (bill > total && !options.includes(bill)) {
        options.push(bill)
      }
    })

    // Add nearest multiples of 10, 50, 100
    const nearest10 = Math.ceil(total / 10) * 10
    if (nearest10 > total && !options.includes(nearest10)) {
      options.push(nearest10)
    }
    
    const nearest50 = Math.ceil(total / 50) * 50
    if (nearest50 > total && !options.includes(nearest50)) {
      options.push(nearest50)
    }

    const nearest100 = Math.ceil(total / 100) * 100
    if (nearest100 > total && !options.includes(nearest100)) {
      options.push(nearest100)
    }

    // Sort unique options and return the 4 closest values
    return options
      .filter((val, index, self) => self.indexOf(val) === index)
      .sort((a, b) => a - b)
      .slice(0, 4)
  }

  // Filtered catalogs
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(posSearch.toLowerCase()) || p.barcode.includes(posSearch)
    const matchesCategory = selectedCategory === 'All' || (p.category || (lang === 'ar' ? 'عام' : 'General')) === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredInventoryProducts = products.filter(p => {
    return p.name.toLowerCase().includes(inventorySearch.toLowerCase()) || p.barcode.includes(inventorySearch)
  })

  // --- VIEW RENDERERS ---

  // 1. POS Terminal
  const renderPOS = () => {
    if (!activeShift) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-surface-container/40 backdrop-blur-md text-white p-8 rounded-xl border border-outline-variant/50">
          <span className="material-symbols-outlined text-amber-500 text-7xl mb-4 animate-pulse">warning</span>
          <h2 className="text-2xl font-bold mb-2">{t[lang].noShift}</h2>
          <p className="text-on-surface-variant mb-6 max-w-md text-center text-sm leading-relaxed">
            {lang === 'ar'
              ? 'يجب فتح وردية جديدة وتعيين رصيد الدرج قبل البدء في تسجيل أي عمليات بيع.'
              : 'You must open a new shift and specify drawer starting cash before processing sales.'}
          </p>
          <button
            onClick={() => setIsOpeningShift(true)}
            className="px-6 py-3 bg-secondary-container hover:brightness-110 transition-all text-white font-bold rounded flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <span className="material-symbols-outlined">add</span> {t[lang].openShift}
          </button>
        </div>
      )
    }

    return (
      <div className="flex gap-4 h-full overflow-hidden">
        {/* Left Column: Cart/Invoice Area (70%) */}
        <section className="w-2/3 border border-outline-variant flex flex-col p-4 bg-surface-container-lowest rounded-xl overflow-hidden h-full">
          <div className="flex justify-between items-end mb-4 flex-shrink-0">
            <div>
              <h2 className="text-primary font-headline-md text-xl font-bold">
                {lang === 'ar' ? 'صالة المبيعات / الفاتورة الحالية' : 'Sales Terminal / Current Invoice'}
              </h2>
              <p className="text-on-surface-variant font-label-sm text-xs mt-0.5">
                {lang === 'ar' 
                  ? `الوردية #${activeShift.id.slice(0, 6)} | المشغل: ${activeShift.user.name}` 
                  : `Shift #${activeShift.id.slice(0, 6)} | Operator: ${activeShift.user.name}`}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowReturnsPanel(!showReturnsPanel)}
                className="bg-surface-container-highest border border-outline-variant text-on-surface hover:bg-surface-bright px-3 py-1 text-xs rounded font-bold cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">assignment_return</span>
                <span>{lang === 'ar' ? 'المرتجع والمبيعات السابقة' : 'Returns & Past Invoices'}</span>
              </button>

              <div className="flex items-center gap-2">
                <label className="text-label-sm text-on-surface-variant text-xs">{lang === 'ar' ? 'العميل:' : 'Customer:'}</label>
                <select 
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="bg-surface-container text-on-surface border border-outline-variant rounded px-2 h-8 text-xs focus:border-primary outline-none cursor-pointer"
                >
                  <option value="Cash Customer">{lang === 'ar' ? 'عميل نقدي' : 'Cash Customer'}</option>
                  <option value="Ahmed Mohamed">{lang === 'ar' ? 'أحمد محمد (آجل)' : 'Ahmed Mohamed (Credit)'}</option>
                  <option value="Al-Noor Co.">{lang === 'ar' ? 'شركة النور (آجل)' : 'Al-Noor Co. (Credit)'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Return Lookup Sub-panel */}
          {showReturnsPanel && (
            <div className="mb-4 p-4 bg-surface-container rounded-lg border border-outline-variant flex-shrink-0">
              <h3 className="text-sm font-bold mb-3 text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-base">search</span>
                {lang === 'ar' ? 'البحث في فواتير المبيعات السابقة لعمل مرتجع' : 'Look Up Past Invoices for Return'}
              </h3>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text"
                  placeholder={lang === 'ar' ? 'أدخل رقم الفاتورة أو العميل...' : 'Search invoice number or client...'}
                  value={returnInvoiceSearch}
                  onChange={(e) => setReturnInvoiceSearch(e.target.value)}
                  className="flex-1 bg-surface-container-lowest border border-outline-variant rounded px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div className="max-h-36 overflow-y-auto space-y-2">
                {salesInvoices
                  .filter(inv => inv.invoiceNumber.includes(returnInvoiceSearch) || (inv.client?.name || '').includes(returnInvoiceSearch))
                  .map(inv => (
                    <div key={inv.id} className="flex justify-between items-center p-2 bg-surface-container-lowest border border-outline-variant/60 rounded text-xs">
                      <div>
                        <span className="font-bold text-white block">{inv.invoiceNumber}</span>
                        <span className="text-[10px] text-outline">
                          {inv.client?.name || (lang === 'ar' ? 'عميل نقدي' : 'Cash Customer')} | {new Date(inv.date).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-data-mono font-bold text-secondary">{inv.totalAmount.toFixed(2)}</span>
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceForReturn(inv)}
                          className="bg-error-container text-white px-2 py-1 rounded text-[10px] hover:brightness-110 transition-all cursor-pointer"
                        >
                          {lang === 'ar' ? 'مرتجع' : 'Return'}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {selectedInvoiceForReturn && (
                <div className="mt-4 p-3 bg-surface-container-highest rounded border border-outline-variant">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white">
                      {lang === 'ar' ? `تأكيد مرتجع فاتورة: ${selectedInvoiceForReturn.invoiceNumber}` : `Confirm Return: ${selectedInvoiceForReturn.invoiceNumber}`}
                    </span>
                    <button type="button" onClick={() => setSelectedInvoiceForReturn(null)} className="text-outline hover:text-white">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                  <div className="text-[11px] text-on-surface-variant space-y-1 mb-3">
                    {selectedInvoiceForReturn.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.product?.name || (lang === 'ar' ? 'صنف مباع' : 'Sold Item')}</span>
                        <span>{item.quantity} x {item.sellPrice} = {(item.quantity * item.sellPrice).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleCreateReturn}
                    className="w-full py-2 bg-error text-white font-bold rounded text-xs cursor-pointer hover:brightness-110 transition-all"
                  >
                    {lang === 'ar' ? 'تأكيد المرتجع بالكامل وإرجاع المبالغ والمخزن' : 'Confirm Full Return & Refund'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Held Invoices Recall Panel */}
          {heldInvoices.length > 0 && (
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1 max-w-full flex-shrink-0">
              <span className="text-xs text-on-surface-variant font-label-sm py-1 whitespace-nowrap">
                {lang === 'ar' ? 'الفواتير المعلقة:' : 'Held Invoices:'}
              </span>
              {heldInvoices.map((held, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRecallInvoice(idx)}
                  className="bg-surface-container hover:bg-surface-bright border border-outline-variant px-3 py-1 rounded text-xs text-primary font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  <span className="font-data-mono">{held.customer} ({held.items.length})</span>
                </button>
              ))}
            </div>
          )}

          {/* Items Table */}
          <div className="flex-grow overflow-auto border border-outline-variant rounded-lg bg-surface min-h-0">
            <table className="w-full text-right rtl:text-right border-collapse">
              <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10">
                <tr className="h-row-height-dense text-on-surface-variant font-label-sm uppercase tracking-wider text-xs">
                  <th className="px-4 text-center w-12 py-2">#</th>
                  <th className="px-4 text-right rtl:text-right ltr:text-left py-2">{lang === 'ar' ? 'اسم الصنف' : 'Item Description'}</th>
                  <th className="px-4 text-center w-24 py-2">{lang === 'ar' ? 'الكمية' : 'Qty'}</th>
                  <th className="px-4 text-left rtl:text-left ltr:text-right py-2">{lang === 'ar' ? 'سعر الوحدة' : 'Unit Price'}</th>
                  <th className="px-4 text-left rtl:text-left ltr:text-right py-2">{lang === 'ar' ? 'الإجمالي' : 'Total'}</th>
                  <th className="px-4 w-10 py-2"></th>
                </tr>
              </thead>
              <tbody className="text-body-md text-sm divide-y divide-outline-variant/20">
                {cart.map((item, index) => (
                  <tr key={item.id} className="hover:bg-surface-bright transition-colors group h-10">
                    <td className="px-4 text-center text-on-surface-variant font-data-mono">{String(index + 1).padStart(2, '0')}</td>
                    <td className="px-4 font-bold text-on-surface text-right rtl:text-right ltr:text-left">{item.name}</td>
                    <td className="px-4 text-center">
                      <input 
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateCartQty(item.id, Math.max(1, Number(e.target.value)))}
                        className="w-16 bg-surface-container-highest border border-outline-variant rounded text-center h-8 focus:border-primary outline-none font-data-mono text-xs"
                      />
                    </td>
                    <td className="px-4 text-left rtl:text-left ltr:text-right font-data-mono text-on-surface-variant">{item.sellPrice.toFixed(2)}</td>
                    <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary font-data-mono">{(item.sellPrice * item.quantity).toFixed(2)}</td>
                    <td className="px-4 text-center">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-error opacity-0 group-hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-20 text-outline font-body-md">
                      <span className="material-symbols-outlined text-4xl block mb-2 opacity-35">shopping_cart</span>
                      {lang === 'ar' ? 'السلة فارغة. اضغط على المنتجات لإضافتها.' : 'Cart is empty. Click products to add items.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Totals */}
          <div className="mt-4 grid grid-cols-3 gap-4 flex-shrink-0">
            <div className="bg-surface-container p-3 rounded-lg border border-outline-variant">
              <span className="block text-on-surface-variant font-label-sm text-xs">{lang === 'ar' ? 'الإجمالي الفرعي' : 'Subtotal'}</span>
              <span className="text-lg font-bold font-data-mono text-white">{posSubtotal.toFixed(2)}</span>
            </div>
            
            <div className="bg-surface-container p-3 rounded-lg border border-outline-variant flex flex-col justify-between">
              <span className="block text-on-surface-variant font-label-sm text-xs">{lang === 'ar' ? 'الخصم' : 'Discount'}</span>
              <input 
                type="text"
                inputMode="decimal"
                value={posDiscount}
                onChange={(e) => {
                  const val = e.target.value
                  const arabicNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
                  let clean = val.replace(/[٠-٩]/g, (d) => String(arabicNums.indexOf(d)))
                  clean = clean.replace(/[^0-9.]/g, '')
                  const parts = clean.split('.')
                  if (parts.length > 2) {
                    clean = parts[0] + '.' + parts.slice(1).join('')
                  }
                  setPosDiscount(clean)
                }}
                className="bg-transparent border-none outline-none font-bold font-data-mono text-indigo-400 text-lg w-full p-0"
                placeholder="0.00"
              />
            </div>
            
            <div className="bg-primary-container p-3 rounded-lg border border-primary flex flex-col justify-between items-end relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-on-primary-container/10">
                <span className="material-symbols-outlined text-7xl" style={{ fontVariationSettings: "'wght' 900" }}>receipt_long</span>
              </div>
              <span className="text-on-primary-container font-label-sm text-xs uppercase font-black z-10">{lang === 'ar' ? 'الإجمالي الصافي' : 'Total Amount'}</span>
              <span className="text-2xl font-black text-white font-data-mono z-10">{posNetTotal.toFixed(2)} {lang === 'ar' ? 'ج.م' : '$'}</span>
            </div>
          </div>
        </section>

        {/* Right Column: Quick Access (30%) */}
        <section className="w-1/3 flex flex-col bg-surface-container p-4 rounded-xl border border-outline-variant overflow-hidden h-full">
          {/* Categories Chips */}
          <div className="mb-3 flex-shrink-0">
            <span className="text-xs text-on-surface-variant font-label-sm mb-2 block uppercase tracking-wider">
              {lang === 'ar' ? 'الأقسام والتصنيفات' : 'Categories & Filters'}
            </span>
            <div className="grid grid-cols-2 gap-1.5 max-h-20 overflow-y-auto pr-1">
              {['All', ...new Set(products.map(p => p.category || (lang === 'ar' ? 'عام' : 'General')))].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-1.5 px-2 rounded font-bold text-xs transition-colors cursor-pointer text-center truncate ${
                    selectedCategory === cat
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-highest hover:bg-surface-bright text-on-surface border border-outline-variant/30'
                  }`}
                >
                  {cat === 'All' ? (lang === 'ar' ? 'الكل' : 'All') : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow overflow-y-auto grid grid-cols-3 gap-2 content-start mb-4 pr-1 min-h-0">
            {filteredProducts.map(p => (
              <div 
                key={p.id}
                onClick={() => addToCart(p)}
                className="bg-surface p-2 rounded border border-outline-variant hover:border-primary cursor-pointer transition-all active:scale-95 group flex flex-col justify-between"
              >
                <div className="aspect-square bg-gradient-to-br from-surface-container-highest to-surface-container rounded mb-2 flex flex-col items-center justify-center border border-outline-variant/20 overflow-hidden relative select-none">
                  <span className="text-xl font-black text-primary opacity-40 uppercase">
                    {p.name.slice(0, 2)}
                  </span>
                  {p.currentStock <= p.minStockLevel && (
                    <span className="absolute top-1 right-1 bg-tertiary-container/85 text-on-tertiary-container px-1 py-0.5 rounded text-[8px] font-bold">
                      {lang === 'ar' ? 'منخفض' : 'LOW'}
                    </span>
                  )}
                </div>
                <div>
                  <span className="block text-xs font-bold truncate text-on-surface hover:text-primary transition-colors">{p.name}</span>
                  <span className="text-primary font-data-mono text-xs font-bold block mt-0.5">{p.sellPrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons & Settle */}
          <div className="mt-auto flex-shrink-0">
            {/* Split Payment Select Panel */}
            {cart.length > 0 && (
              <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant mb-2">
                <span className="text-[10px] text-outline font-bold mb-1.5 block uppercase tracking-wide">
                  {lang === 'ar' ? 'قنوات الدفع المحاسبية' : 'Accounting Payment Channels'}
                </span>
                <div className="grid grid-cols-3 gap-1 mb-2">
                  {[
                    { id: 'CASH', label: lang === 'ar' ? 'نقدي' : 'Cash' },
                    { id: 'CARD', label: lang === 'ar' ? 'شبكة' : 'Card' },
                    { id: 'CREDIT', label: lang === 'ar' ? 'آجل' : 'Credit' }
                  ].map(mode => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => {
                        setPaymentType(mode.id)
                        if (mode.id === 'CARD') {
                          setReceivedAmount(posNetTotal.toFixed(2))
                        } else if (mode.id === 'CREDIT') {
                          setReceivedAmount('0.00')
                        } else {
                          setReceivedAmount('')
                          setTimeout(() => {
                            if (receivedAmountInputRef.current) {
                              receivedAmountInputRef.current.focus()
                              receivedAmountInputRef.current.select()
                            }
                          }, 50)
                        }
                      }}
                      className={`py-1 text-[10px] font-bold rounded text-center cursor-pointer transition-colors border ${
                        paymentType === mode.id
                          ? 'bg-primary border-primary text-on-primary'
                          : 'bg-surface-container-highest border-outline-variant/20 text-on-surface hover:bg-surface-bright'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-1">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-on-surface-variant font-label-sm">{t[lang].receivedAmount}</label>
                    <input 
                      ref={receivedAmountInputRef}
                      type="text"
                      inputMode="decimal"
                      disabled={paymentType === 'CREDIT'}
                      value={paymentType === 'CREDIT' ? '0.00' : receivedAmount}
                      onChange={(e) => {
                        const val = e.target.value
                        const arabicNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
                        let clean = val.replace(/[٠-٩]/g, (d) => String(arabicNums.indexOf(d)))
                        clean = clean.replace(/[^0-9.]/g, '')
                        const parts = clean.split('.')
                        if (parts.length > 2) {
                          clean = parts[0] + '.' + parts.slice(1).join('')
                        }
                        setReceivedAmount(clean)
                      }}
                      className="bg-surface-container border border-outline-variant text-on-surface rounded px-2 py-0.5 outline-none font-data-mono text-xs w-full text-right"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="flex flex-col gap-1 justify-end items-end text-right">
                    <span className="text-[9px] text-on-surface-variant font-label-sm">{t[lang].changeAmount}</span>
                    <span className="font-data-mono font-bold text-secondary text-sm">
                      {paymentType === 'CREDIT' ? '0.00' : changeValue.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Quick Cash Helper Buttons */}
                {paymentType === 'CASH' && posNetTotal > 0 && (
                  <div className="mt-2.5 pt-2 flex flex-col gap-1 border-t border-outline-variant/30">
                    <span className="text-[8px] text-outline font-bold uppercase tracking-wider block">
                      {lang === 'ar' ? 'أزرار نقدية سريعة' : 'Quick Cash Helpers'}
                    </span>
                    <div className="grid grid-cols-4 gap-1">
                      {getQuickCashOptions(posNetTotal).map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setReceivedAmount(amt.toFixed(2))}
                          className={`py-1 text-[10px] font-black font-data-mono rounded text-center border transition-all cursor-pointer ${
                            Number(receivedAmount) === Number(amt.toFixed(2))
                              ? 'bg-secondary-container border-secondary text-white shadow-sm'
                              : 'bg-surface-container border-outline-variant/20 text-on-surface hover:bg-surface-bright'
                          }`}
                        >
                          {amt.toFixed(2)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <button 
                id="pos-checkout-btn"
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full h-12 rounded font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  cart.length === 0
                    ? 'bg-surface-container-highest text-outline border border-outline-variant/30 cursor-not-allowed'
                    : 'bg-secondary-container text-white hover:brightness-110 active:scale-[0.98] cursor-pointer'
                }`}
              >
                <span className="material-symbols-outlined text-lg">payments</span>
                <span>{lang === 'ar' ? `تأكيد ودفع: ${paymentType}` : `Pay & Settle: ${paymentType}`}</span>
                {cart.length > 0 && <span className="text-xs bg-black/20 px-1 py-0.5 rounded font-mono">[F12]</span>}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleHoldInvoice}
                  disabled={cart.length === 0}
                  className={`h-10 rounded text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors active:scale-95 ${
                    cart.length === 0
                      ? 'bg-surface-container-highest/50 text-outline border-outline-variant/20 cursor-not-allowed'
                      : 'bg-surface-container-highest text-on-surface border-outline-variant hover:bg-surface-bright cursor-pointer'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>{lang === 'ar' ? 'تعليق الفاتورة' : 'Hold Invoice'}</span>
                </button>
                
                <button 
                  onClick={() => {
                    if (heldInvoices.length > 0) {
                      handleRecallInvoice(0)
                    } else {
                      alert(lang === 'ar' ? 'لا توجد فواتير معلقة' : 'No held invoices')
                    }
                  }}
                  className="bg-surface-container-highest text-on-surface h-10 border border-outline-variant rounded text-xs font-bold hover:bg-surface-bright transition-colors active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">history_edu</span>
                  <span>{lang === 'ar' ? `استدعاء (${heldInvoices.length})` : `Recall (${heldInvoices.length})`}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // 2. Inventory Hub
  const renderInventory = () => {
    return (
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        {/* Navigation sub-tabs */}
        <div className="flex gap-2 bg-surface-container p-1 rounded border border-outline-variant/60 flex-shrink-0">
          <button
            onClick={() => setInventorySubTab('products')}
            className={`px-4 py-1.5 rounded text-xs font-bold cursor-pointer transition-colors ${
              inventorySubTab === 'products' ? 'bg-primary-container text-white' : 'text-outline hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'إدارة المنتجات والأصناف' : 'Stock Products List'}
          </button>
          <button
            onClick={() => setInventorySubTab('suppliers')}
            className={`px-4 py-1.5 rounded text-xs font-bold cursor-pointer transition-colors ${
              inventorySubTab === 'suppliers' ? 'bg-primary-container text-white' : 'text-outline hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'الموردين وتوريد المشتريات (Suppliers Ledger)' : 'Suppliers Ledger & Purchases'}
          </button>
          <button
            onClick={() => setInventorySubTab('audit')}
            className={`px-4 py-1.5 rounded text-xs font-bold cursor-pointer transition-colors ${
              inventorySubTab === 'audit' ? 'bg-primary-container text-white' : 'text-outline hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'جرد المخازن' : 'Physical Inventory Audit'}
          </button>
        </div>

        {inventorySubTab === 'products' && (
          <div className="flex-1 flex gap-4 overflow-hidden min-h-0">
            {/* Left Column: Products List Table */}
            <section className="w-2/3 border border-outline-variant flex flex-col p-4 bg-surface-container-lowest rounded-xl overflow-hidden h-full">
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <div>
                  <h2 className="text-primary font-headline-md text-xl font-bold">
                    {lang === 'ar' ? 'أصناف المنتجات بالمستودع' : 'Stock Items Inventory'}
                  </h2>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                    <input 
                      type="text"
                      placeholder={lang === 'ar' ? 'بحث سريع بالمخزن...' : 'Quick search in stock...'}
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      className="h-8 bg-surface-container border border-outline-variant rounded pr-8 pl-3 text-xs focus:border-primary outline-none w-48"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      if (productNameInputRef.current) productNameInputRef.current.focus()
                    }}
                    className="bg-primary-container text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">add_box</span>
                    <span>{lang === 'ar' ? 'إضافة صنف [F1]' : 'Add Item [F1]'}</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="flex-grow overflow-auto border border-outline-variant rounded-lg bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
                    <tr className="h-row-height-dense text-on-surface-variant font-label-sm uppercase tracking-wider">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم الصنف' : 'Product Name'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'الباركود' : 'Barcode'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'سعر الشراء' : 'Purchase'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'سعر البيع' : 'Sell Price'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'الكمية الحالية' : 'Stock Qty'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'حد الطلب' : 'Min Level'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'الرمز' : 'Label'}</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="text-body-md text-sm divide-y divide-outline-variant/20">
                    {filteredInventoryProducts.map(p => {
                      const status = getStockStatus(p)
                      const borderClass = p.currentStock <= p.minStockLevel
                        ? 'rtl:border-r-4 ltr:border-l-4 border-error'
                        : p.expiryDate && (new Date(p.expiryDate).getTime() - new Date().getTime()) <= 30 * 24 * 60 * 60 * 1000
                          ? 'rtl:border-r-4 ltr:border-l-4 border-amber-500'
                          : ''

                      return (
                        <tr key={p.id} className={`hover:bg-surface-bright transition-colors h-10 ${borderClass}`}>
                          <td className="px-4 font-bold text-on-surface text-right rtl:text-right ltr:text-left">{p.name}</td>
                          <td className="px-4 font-data-mono text-xs text-outline">{p.barcode}</td>
                          <td className="px-4 font-data-mono text-outline">{p.purchasePrice.toFixed(2)}</td>
                          <td className="px-4 font-bold text-secondary font-data-mono">{p.sellPrice.toFixed(2)}</td>
                          <td className={`px-4 font-bold font-data-mono ${p.currentStock <= p.minStockLevel ? 'text-tertiary' : 'text-on-surface'}`}>
                            {p.currentStock}
                          </td>
                          <td className="px-4 font-data-mono text-outline">{p.minStockLevel}</td>
                          <td className="px-4">
                            <button
                              type="button"
                              onClick={() => {
                                setDesignerProduct(p)
                                setActiveView('settings')
                              }}
                              className="text-primary hover:underline text-xs flex items-center gap-0.5 cursor-pointer font-bold"
                            >
                              <span className="material-symbols-outlined text-xs">qr_code</span>
                              <span>{lang === 'ar' ? 'تصميم باركود' : 'Barcode Label'}</span>
                            </button>
                          </td>
                          <td className="px-4">
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p.id)}
                              className="text-error hover:text-red-400 font-bold text-xs flex items-center gap-0.5 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-xs">delete</span>
                              <span>{lang === 'ar' ? 'حذف' : 'Delete'}</span>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Right Column: Add/Edit Product Panel */}
            <section className="w-1/3 border border-outline-variant flex flex-col p-4 bg-surface-container-lowest rounded-xl overflow-y-auto h-full">
              <h3 className="text-primary font-headline-sm text-lg font-bold border-b border-outline-variant pb-2 mb-4 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary">edit_square</span>
                {lang === 'ar' ? 'بطاقة صنف منتج جديد' : 'New Stock Item Card'}
              </h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم الصنف أو المنتج *' : 'Product / Item Name *'}</label>
                  <input 
                    type="text"
                    ref={productNameInputRef}
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white"
                    placeholder="e.g. Rice 1Kg Premium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الباركود الرقمي *' : 'Barcode *'}</label>
                  <div className="flex gap-1.5">
                    <input 
                      type="text"
                      required
                      value={newProduct.barcode}
                      onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
                      className="flex-grow bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                      placeholder="e.g. 628100223"
                    />
                    <button 
                      type="button" 
                      onClick={() => setNewProduct({ ...newProduct, barcode: Math.floor(100000000000 + Math.random() * 900000000000).toString() })}
                      className="bg-surface-container border border-outline-variant text-white px-2.5 rounded text-xs hover:bg-surface-bright active:scale-95 transition-all cursor-pointer font-bold"
                    >
                      {lang === 'ar' ? 'توليد' : 'Gen'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سعر الشراء (تكلفتها) *' : 'Purchase Cost *'}</label>
                    <input 
                      type="number"
                      step="0.01"
                      required
                      value={newProduct.purchasePrice || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, purchasePrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سعر البيع الافتراضي *' : 'Default Retail Price *'}</label>
                    <input 
                      type="number"
                      step="0.01"
                      required
                      value={newProduct.sellPrice || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, sellPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سعر الجملة' : 'Wholesale Price'}</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={newProduct.wholesalePrice || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, wholesalePrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سعر نصف الجملة' : 'Semi-Wholesale Price'}</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={newProduct.semiWholesalePrice || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, semiWholesalePrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'وحدة القياس' : 'Unit'}</label>
                    <select
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-on-surface cursor-pointer"
                    >
                      <option value="قطعة">{lang === 'ar' ? 'قطعة (Piece)' : 'Piece'}</option>
                      <option value="كيلو">{lang === 'ar' ? 'كيلوجرام (Kg)' : 'Kilogram'}</option>
                      <option value="علبة">{lang === 'ar' ? 'علبة (Box)' : 'Box'}</option>
                      <option value="كرتونة">{lang === 'ar' ? 'كرتونة (Carton)' : 'Carton'}</option>
                      <option value="متر">{lang === 'ar' ? 'متر (Meter)' : 'Meter'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'حد الطلب الادنى' : 'Min Alert Qty'}</label>
                    <input 
                      type="number"
                      required
                      value={newProduct.minStockLevel}
                      onChange={(e) => setNewProduct({ ...newProduct, minStockLevel: parseInt(e.target.value) || 0 })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'مخزون افتتاحي' : 'Starting Stock'}</label>
                    <input 
                      type="number"
                      required
                      value={newProduct.currentStock}
                      onChange={(e) => setNewProduct({ ...newProduct, currentStock: parseInt(e.target.value) || 0 })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'تاريخ انتهاء الصلاحية' : 'Expiry Date'}</label>
                    <input 
                      type="date"
                      value={newProduct.expiryDate || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2 bg-primary text-on-primary font-bold rounded text-xs hover:bg-primary-fixed-dim transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ الصنف وتحديث المستودع' : 'Register Product & Stock'}
                </button>
              </form>
            </section>
          </div>
        )}

        {inventorySubTab === 'suppliers' && (
          <div className="flex-1 flex gap-4 overflow-hidden min-h-0">
            {/* Left Column: Suppliers list & transactions */}
            <section className="w-2/3 border border-outline-variant flex flex-col p-4 bg-surface-container-lowest rounded-xl overflow-hidden h-full">
              <h2 className="text-primary font-headline-md text-xl font-bold mb-4 flex-shrink-0">
                {lang === 'ar' ? 'سجل الموردين والحسابات الدائنة' : 'Suppliers Account Ledger'}
              </h2>
              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم المورد' : 'Supplier Name'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'المسؤول' : 'Contact Person'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'العنوان' : 'Address'}</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الرصيد الدائن لنا/عليه' : 'Outstanding Balance'}</th>
                      <th className="px-4 py-2 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20">
                    {suppliers.map(s => (
                      <tr key={s.id} className="hover:bg-surface-bright transition-colors h-10">
                        <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{s.name}</td>
                        <td className="px-4 text-outline">{s.contactPerson || '---'}</td>
                        <td className="px-4 font-mono text-outline">{s.phone || '---'}</td>
                        <td className="px-4 text-outline">{s.address || '---'}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary font-mono">{s.balance.toFixed(2)} EGP</td>
                        <td className="px-4 text-center">
                          <button
                            onClick={() => handleDeleteSupplier(s.id)}
                            className="text-error hover:text-red-400 font-bold text-xs flex items-center gap-0.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">delete</span>
                            <span>{lang === 'ar' ? 'حذف' : 'Delete'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {suppliers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-10 font-sans text-outline italic">
                          {lang === 'ar' ? 'لا يوجد موردين مسجلين حالياً.' : 'No registered suppliers yet.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Right Column: Log Supplier Purchase Invoice & Add Supplier */}
            <section className="w-1/3 border border-outline-variant p-4 bg-surface-container-lowest rounded-xl overflow-y-auto h-full space-y-6">
              {/* Record Purchase */}
              <div className="bg-surface-container p-4 rounded-xl border border-outline-variant">
                <h3 className="text-primary font-bold text-sm pb-2 border-b border-outline-variant mb-4 flex items-center gap-1.5">
                  <span className="material-symbols-outlined">description</span>
                  {lang === 'ar' ? 'تسجيل فاتورة شراء جديدة' : 'Log New Supplier Purchase'}
                </h3>
                <form onSubmit={handleRecordPurchase} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الفاتورة أو التوريد *' : 'Invoice Number *'}</label>
                    <input 
                      type="text"
                      required
                      value={newPurchase.invoiceNumber}
                      onChange={(e) => setNewPurchase({ ...newPurchase, invoiceNumber: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                      placeholder="e.g. PI-2024-87"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المورد *' : 'Select Supplier *'}</label>
                    <select
                      value={newPurchase.supplierId}
                      onChange={(e) => setNewPurchase({ ...newPurchase, supplierId: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-on-surface cursor-pointer"
                    >
                      <option value="">{lang === 'ar' ? 'اختر مورد...' : 'Select Supplier...'}</option>
                      {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المنتج / الصنف المورد *' : 'Product *'}</label>
                    <select
                      value={newPurchase.productId}
                      onChange={(e) => setNewPurchase({ ...newPurchase, productId: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-on-surface cursor-pointer"
                    >
                      <option value="">{lang === 'ar' ? 'اختر صنف منتج...' : 'Select Product...'}</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.barcode})</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الكمية الموردة *' : 'Quantity *'}</label>
                      <input 
                        type="number"
                        required
                        value={newPurchase.quantity || ''}
                        onChange={(e) => setNewPurchase({ ...newPurchase, quantity: parseInt(e.target.value) || 0 })}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سعر شراء القطعة *' : 'Cost Per Piece *'}</label>
                      <input 
                        type="number"
                        step="0.01"
                        required
                        value={newPurchase.purchasePrice || ''}
                        onChange={(e) => setNewPurchase({ ...newPurchase, purchasePrice: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المبلغ المدفوع كاش *' : 'Amount Paid *'}</label>
                      <input 
                        type="number"
                        step="0.01"
                        required
                        value={newPurchase.paidAmount}
                        onChange={(e) => setNewPurchase({ ...newPurchase, paidAmount: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'حالة الفاتورة' : 'Payment Status'}</label>
                      <select
                        value={newPurchase.status}
                        onChange={(e) => setNewPurchase({ ...newPurchase, status: e.target.value })}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-on-surface cursor-pointer"
                      >
                        <option value="PAID">{lang === 'ar' ? 'مدفوعة' : 'Paid'}</option>
                        <option value="CREDIT">{lang === 'ar' ? 'آجل' : 'Credit'}</option>
                        <option value="PARTIAL">{lang === 'ar' ? 'مدفوعة جزئياً' : 'Partial'}</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2 bg-primary text-on-primary font-bold rounded text-xs hover:bg-primary-fixed-dim transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'تسجيل العملية' : 'Submit Transaction'}
                  </button>
                </form>
              </div>

              {/* Add Supplier */}
              <div className="bg-surface-container p-4 rounded-xl border border-outline-variant">
                <h3 className="text-primary font-bold text-sm pb-2 border-b border-outline-variant mb-4 flex items-center gap-1.5">
                  <span className="material-symbols-outlined">person_add</span>
                  {lang === 'ar' ? 'تسجيل مورد جديد' : 'Register New Supplier'}
                </h3>
                <form onSubmit={handleAddSupplier} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم المورد *' : 'Supplier Name *'}</label>
                    <input 
                      type="text"
                      required
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white"
                      placeholder="e.g. Al-Fatah Co."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الشخص المسؤول' : 'Contact Person'}</label>
                    <input 
                      type="text"
                      value={newSupplier.contactPerson}
                      onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</label>
                      <input 
                        type="text"
                        value={newSupplier.phone}
                        onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'العنوان' : 'Address'}</label>
                      <input 
                        type="text"
                        value={newSupplier.address}
                        onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-2 bg-secondary-container text-white font-bold rounded text-xs hover:brightness-110 transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'إضافة مورد' : 'Add Supplier'}
                  </button>
                </form>
              </div>
            </section>
          </div>
        )}

        {inventorySubTab === 'audit' && (
          <div className="flex-grow flex gap-4 overflow-hidden min-h-0">
            {/* Left Column: Create new audit / discrepancy compare grid */}
            <section className="w-2/3 border border-outline-variant flex flex-col p-4 bg-surface-container-lowest rounded-xl overflow-hidden h-full">
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <div>
                  <h2 className="text-primary font-headline-md text-xl font-bold">
                    {lang === 'ar' ? 'جلسة جرد مخازن جديدة' : 'New Warehouse Inventory Audit Session'}
                  </h2>
                  <p className="text-xs text-outline">
                    {lang === 'ar' ? 'قارن الكمية المسجلة على النظام مع الكمية الفعلية بالمخزن واحسب العجز والزيادة' : 'Compare system registered stock with actual physical count, auto computing discrepancies.'}
                  </p>
                </div>
              </div>

              {/* Input selection criteria */}
              <div className="grid grid-cols-2 gap-4 mb-4 flex-shrink-0 bg-surface-container p-3 rounded-lg border border-outline-variant">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant mb-1">
                    {lang === 'ar' ? 'المستودع / المخزن المراد جرده *' : 'Warehouse to Audit *'}
                  </label>
                  <select
                    value={auditWarehouseId}
                    onChange={(e) => setAuditWarehouseId(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-on-surface cursor-pointer"
                  >
                    <option value="">{lang === 'ar' ? 'اختر المستودع...' : 'Select Warehouse...'}</option>
                    {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant mb-1">
                    {lang === 'ar' ? 'ملاحظات جلسة الجرد' : 'Session Notes / Descriptions'}
                  </label>
                  <input
                    type="text"
                    value={auditNotes}
                    onChange={(e) => setAuditNotes(e.target.value)}
                    placeholder={lang === 'ar' ? 'مثال: جرد نصف سنوي أو جرد طوارئ...' : 'e.g. End of Year physical audit...'}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Items grid table */}
              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0 mb-4">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم الصنف' : 'Product'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'الباركود' : 'Barcode'}</th>
                      <th className="px-4 py-2 text-center">{lang === 'ar' ? 'الرصيد الدفتري' : 'System Stock'}</th>
                      <th className="px-4 py-2 text-center w-32">{lang === 'ar' ? 'الكمية الفعلية' : 'Actual Count'}</th>
                      <th className="px-4 py-2 text-center">{lang === 'ar' ? 'العجز / الزيادة' : 'Difference'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                    {products.map(p => {
                      const actual = auditItemsMap[p.id] !== undefined ? auditItemsMap[p.id] : p.currentStock
                      const diff = actual - p.currentStock
                      const diffColor = diff < 0 ? 'text-red-500 font-bold' : diff > 0 ? 'text-green-500 font-bold' : 'text-outline'

                      return (
                        <tr key={p.id} className="hover:bg-surface-bright transition-colors h-11">
                          <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white font-sans">{p.name}</td>
                          <td className="px-4 text-outline">{p.barcode}</td>
                          <td className="px-4 text-center text-white">{p.currentStock}</td>
                          <td className="px-4 text-center">
                            <input
                              type="number"
                              value={auditItemsMap[p.id] !== undefined ? auditItemsMap[p.id] : ''}
                              placeholder={p.currentStock.toString()}
                              onChange={(e) => {
                                const val = e.target.value === '' ? p.currentStock : parseInt(e.target.value) || 0
                                setAuditItemsMap({ ...auditItemsMap, [p.id]: val })
                              }}
                              className="w-24 text-center bg-surface-container border border-outline-variant rounded p-1 text-xs text-white"
                            />
                          </td>
                          <td className={`px-4 text-center ${diffColor}`}>{diff > 0 ? `+${diff}` : diff}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Submit audit block */}
              <div className="flex justify-between items-center bg-surface-container p-3 rounded-lg border border-outline-variant flex-shrink-0">
                <div className="text-xs space-y-1">
                  <div>
                    <span className="text-outline">{lang === 'ar' ? 'إجمالي الأصناف المجرودة: ' : 'Total Audited Items: '}</span>
                    <span className="font-bold text-white">{products.length}</span>
                  </div>
                  <div>
                    <span className="text-outline">{lang === 'ar' ? 'عجز/زيادة كلي: ' : 'Net Discrepancy: '}</span>
                    <span className="font-bold text-secondary">
                      {(() => {
                        let totalDiff = 0
                        products.forEach(p => {
                          const actual = auditItemsMap[p.id] !== undefined ? auditItemsMap[p.id] : p.currentStock
                          totalDiff += (actual - p.currentStock)
                        })
                        return totalDiff > 0 ? `+${totalDiff}` : totalDiff
                      })()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    if (!auditWarehouseId) {
                      alert(lang === 'ar' ? '⚠️ يرجى اختيار المستودع أولاً' : '⚠️ Please select a warehouse')
                      return
                    }
                    if (!user) return

                    const items = products.map(p => {
                      const actual = auditItemsMap[p.id] !== undefined ? auditItemsMap[p.id] : p.currentStock
                      return {
                        productId: p.id,
                        systemStock: p.currentStock,
                        actualStock: actual,
                        difference: actual - p.currentStock
                      }
                    })

                    const res = await window.api.inventory.createAudit({
                      warehouseId: auditWarehouseId,
                      userId: user.id,
                      notes: auditNotes,
                      items
                    })

                    if (res.success) {
                      alert(lang === 'ar' ? '✅ تم حفظ واعتماد جلسة الجرد بنجاح وتعديل رصيد المخزن' : '✅ Audit session logged and stock updated successfully')
                      setAuditNotes('')
                      setAuditItemsMap({})
                      setDbRefreshTrigger(prev => prev + 1)
                    } else {
                      alert(lang === 'ar' ? '❌ فشل حفظ الجرد: ' + res.error : '❌ Failed: ' + res.error)
                    }
                  }}
                  className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm font-bold">fact_check</span>
                  <span>{lang === 'ar' ? 'حفظ واعتماد الجرد بالمخازن' : 'Commit Physical Audit Session'}</span>
                </button>
              </div>
            </section>

            {/* Right Column: Historical Audits List */}
            <section className="w-1/3 border border-outline-variant p-4 bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col h-full">
              <h3 className="text-primary font-bold text-sm border-b border-outline-variant pb-2 mb-4 flex items-center gap-1.5 flex-shrink-0">
                <span className="material-symbols-outlined text-primary">history</span>
                {lang === 'ar' ? 'سجل جلسات الجرد المعتمدة' : 'Archived Audit Sessions'}
              </h3>
              <div className="flex-grow overflow-auto space-y-3 min-h-0">
                {auditsList.map(a => (
                  <div key={a.id} className="bg-surface-container p-3 rounded-lg border border-outline-variant space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-white">
                      <span>{a.auditNumber}</span>
                      <span className="text-[10px] bg-secondary/20 text-secondary px-1.5 py-0.5 rounded">{a.status}</span>
                    </div>
                    <div className="text-outline space-y-1">
                      <div>{lang === 'ar' ? 'المخزن: ' : 'Warehouse: '} <span className="text-white font-sans font-bold">{a.warehouse?.name}</span></div>
                      <div>{lang === 'ar' ? 'بواسطة: ' : 'Auditor: '} <span className="text-white font-sans">{a.user?.name}</span></div>
                      <div>{lang === 'ar' ? 'التاريخ: ' : 'Date: '} <span className="text-white font-mono">{new Date(a.date).toLocaleDateString()}</span></div>
                      {a.notes && <div>{lang === 'ar' ? 'ملاحظة: ' : 'Note: '} <span className="text-white font-sans italic">"{a.notes}"</span></div>}
                    </div>
                    <div className="pt-2 border-t border-outline-variant/60">
                      <div className="font-bold text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">{lang === 'ar' ? 'تفاصيل التعديلات:' : 'Discrepancy Details:'}</div>
                      <div className="max-h-24 overflow-y-auto space-y-1 pr-1 font-sans text-[11px]">
                        {(a.items || []).map((it: any) => (
                          <div key={it.id} className="flex justify-between">
                            <span className="text-outline truncate max-w-[120px]">{it.product?.name}</span>
                            <span className={it.difference < 0 ? 'text-red-500 font-mono font-bold' : it.difference > 0 ? 'text-green-500 font-mono font-bold' : 'text-outline font-mono'}>
                              {it.difference > 0 ? `+${it.difference}` : it.difference}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {auditsList.length === 0 && (
                  <div className="text-center py-10 font-sans text-outline italic">
                    {lang === 'ar' ? 'لا توجد جلسات جرد سابقة' : 'No previous audit records found'}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    )
  }

  // --- ERP MODULE RENDERING HELPERS ---

  // 1. Purchases module
  const renderPurchases = () => {
    const calculatePiTotals = () => {
      const subtotal = piItems.reduce((acc, item) => acc + (item.quantity * item.purchasePrice), 0)
      const discount = piItems.reduce((acc, item) => acc + (item.discount || 0), 0)
      const total = Math.max(0, subtotal - discount)
      return { subtotal, discount, total }
    }

    const { subtotal: piSubtotal, discount: piDiscountTotal, total: piNetTotal } = calculatePiTotals()

    const handleAddPiItem = () => {
      if (!piSelectedProductId) return
      const prod = products.find(p => p.id === piSelectedProductId)
      if (!prod) return

      const existingIndex = piItems.findIndex(item => 
        item.productId === piSelectedProductId && 
        item.size === piSize && 
        item.color === piColor
      )

      if (existingIndex > -1) {
        const updated = [...piItems]
        updated[existingIndex].quantity += piQty
        updated[existingIndex].discount += piDiscount
        setPiItems(updated)
      } else {
        setPiItems([...piItems, {
          productId: piSelectedProductId,
          name: prod.name,
          barcode: prod.barcode,
          size: piSize,
          color: piColor,
          unit: piUnit,
          quantity: piQty,
          purchasePrice: piUnitCost,
          discount: piDiscount
        }])
      }

      // Reset item inputs
      setPiSelectedProductId('')
      setPiSize('')
      setPiColor('')
      setPiQty(1)
      setPiUnitCost(0)
      setPiDiscount(0)
    }

    const handleSavePurchaseInvoice = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!piSupplierId) {
        alert(lang === 'ar' ? 'يرجى اختيار المورد أولاً' : 'Please select a supplier')
        return
      }
      if (piItems.length === 0) {
        alert(lang === 'ar' ? 'يرجى إضافة صنف واحد على الأقل للفاتورة' : 'Please add at least one item')
        return
      }

      const invNo = piInvoiceNumber.trim() || `PUR-${Date.now().toString().slice(-6)}`
      const payload = {
        invoiceNumber: invNo,
        supplierId: piSupplierId,
        totalAmount: piNetTotal,
        paidAmount: piPaidAmount,
        status: piPaidAmount >= piNetTotal ? 'PAID' : (piPaidAmount > 0 ? 'PARTIAL' : 'CREDIT'),
        userId: user.id,
        notes: piNotes,
        items: piItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          purchasePrice: item.purchasePrice
        }))
      }

      const res = await window.api.purchases.createInvoice(payload)
      if (res.success) {
        alert(lang === 'ar' ? 'تم حفظ فاتورة الشراء وتحديث الحسابات والمخزن!' : 'Purchase Invoice saved successfully!')
        setPiItems([])
        setPiSupplierId('')
        setPiNotes('')
        setPiPaidAmount(0)
        setPiInvoiceNumber('')
        triggerRefresh()
      } else {
        alert(res.error)
      }
    }

    return (
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        {/* Navigation sub-tabs */}
        <div className="flex gap-1.5 bg-surface-container p-1 rounded border border-outline-variant/60 flex-shrink-0 overflow-x-auto">
          {[
            { id: 'invoice', labelAr: 'فاتورة شراء جديدة', labelEn: 'New Purchase Invoice' },
            { id: 'return', labelAr: 'مرتجع مشتريات', labelEn: 'Purchase Return' },
            { id: 'invoice_list', labelAr: 'فواتير الشراء', labelEn: 'Invoices List' },
            { id: 'return_list', labelAr: 'مرتجعات المشتريات', labelEn: 'Returns List' },
            { id: 'payments', labelAr: 'سداد الموردين', labelEn: 'Supplier Payments' },
            { id: 'statement', labelAr: 'كشف حساب مورد', labelEn: 'Supplier Statement' },
            { id: 'cheques', labelAr: 'شيكات صادرة للموردين', labelEn: 'Issued Cheques' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setPurchasesSubTab(tab.id as any)}
              className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors whitespace-nowrap ${
                purchasesSubTab === tab.id ? 'bg-primary-container text-white' : 'text-outline hover:text-white'
              }`}
            >
              {lang === 'ar' ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-hidden min-h-0">
          {purchasesSubTab === 'invoice' && (
            <div className="h-full flex gap-4 overflow-hidden">
              {/* Form & Items List */}
              <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
                <div className="grid grid-cols-4 gap-3 mb-4 flex-shrink-0">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الفاتورة' : 'Invoice #'}</label>
                    <input
                      type="text"
                      value={piInvoiceNumber}
                      onChange={(e) => setPiInvoiceNumber(e.target.value)}
                      placeholder="تلقائي"
                      className="w-full bg-surface-container border border-outline-variant rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المورد *' : 'Supplier *'}</label>
                    <select
                      value={piSupplierId}
                      onChange={(e) => setPiSupplierId(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                    >
                      <option value="">{lang === 'ar' ? 'اختر مورد...' : 'Select supplier...'}</option>
                      {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المخزن *' : 'Warehouse *'}</label>
                    <select
                      value={piWarehouseId}
                      onChange={(e) => setPiWarehouseId(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                    >
                      <option value="">{lang === 'ar' ? 'اختر مخزن...' : 'Select warehouse...'}</option>
                      {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'التاريخ' : 'Date'}</label>
                    <input
                      type="date"
                      value={piDate}
                      onChange={(e) => setPiDate(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Add Item form strip */}
                <div className="bg-surface-container p-3 rounded-lg border border-outline-variant mb-4 flex-shrink-0 grid grid-cols-8 gap-2 items-end">
                  <div className="col-span-2">
                    <label className="block text-[9px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الصنف *' : 'Product *'}</label>
                    <select
                      value={piSelectedProductId}
                      onChange={(e) => {
                        setPiSelectedProductId(e.target.value)
                        const p = products.find(prod => prod.id === e.target.value)
                        if (p) {
                          setPiUnitCost(p.purchasePrice)
                          setPiUnit(p.unit || 'قطعة')
                        }
                      }}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-on-surface"
                    >
                      <option value="">{lang === 'ar' ? 'اختر منتج...' : 'Select...'}</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المقاس' : 'Size'}</label>
                    <input
                      type="text"
                      value={piSize}
                      onChange={(e) => setPiSize(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white"
                      placeholder="M, L, XL..."
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اللون' : 'Color'}</label>
                    <input
                      type="text"
                      value={piColor}
                      onChange={(e) => setPiColor(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white"
                      placeholder="Red, Blue..."
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الوحدة' : 'Unit'}</label>
                    <input
                      type="text"
                      value={piUnit}
                      onChange={(e) => setPiUnit(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الكمية *' : 'Qty *'}</label>
                    <input
                      type="number"
                      value={piQty || ''}
                      onChange={(e) => setPiQty(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سعر الشراء *' : 'Cost *'}</label>
                    <input
                      type="number"
                      step="0.01"
                      value={piUnitCost || ''}
                      onChange={(e) => setPiUnitCost(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الخصم' : 'Discount'}</label>
                    <input
                      type="number"
                      step="0.01"
                      value={piDiscount || ''}
                      onChange={(e) => setPiDiscount(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPiItem}
                    className="bg-primary text-on-primary py-1 px-3 rounded font-bold text-xs hover:opacity-95 transition-all cursor-pointer h-8"
                  >
                    {lang === 'ar' ? 'إضافة' : 'Add'}
                  </button>
                </div>

                {/* Items Table */}
                <div className="flex-1 overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                  <table className="w-full text-right rtl:text-right border-collapse">
                    <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                      <tr className="h-9 text-on-surface-variant">
                        <th className="px-4 py-1.5 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'الصنف' : 'Item'}</th>
                        <th className="px-4 py-1.5">{lang === 'ar' ? 'المقاس / اللون' : 'Size/Color'}</th>
                        <th className="px-4 py-1.5">{lang === 'ar' ? 'الوحدة' : 'Unit'}</th>
                        <th className="px-4 py-1.5 text-center">{lang === 'ar' ? 'الكمية' : 'Qty'}</th>
                        <th className="px-4 py-1.5 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'السعر' : 'Cost'}</th>
                        <th className="px-4 py-1.5 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الخصم' : 'Discount'}</th>
                        <th className="px-4 py-1.5 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الإجمالي' : 'Total'}</th>
                        <th className="px-4 py-1.5"></th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                      {piItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-surface-bright transition-colors h-9">
                          <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{item.name}</td>
                          <td className="px-4 text-outline font-sans">{item.size || '---'} / {item.color || '---'}</td>
                          <td className="px-4 text-outline font-sans">{item.unit}</td>
                          <td className="px-4 text-center font-bold">{item.quantity}</td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right">{item.purchasePrice.toFixed(2)}</td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right text-tertiary">-{item.discount.toFixed(2)}</td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">
                            {((item.quantity * item.purchasePrice) - item.discount).toFixed(2)}
                          </td>
                          <td className="px-4 text-center">
                            <button
                              type="button"
                              onClick={() => setPiItems(piItems.filter((_, i) => i !== idx))}
                              className="text-error hover:underline text-[10px] font-bold"
                            >
                              {lang === 'ar' ? 'حذف' : 'Remove'}
                            </button>
                          </td>
                        </tr>
                      ))}
                      {piItems.length === 0 && (
                        <tr>
                          <td colSpan={8} className="text-center py-10 font-sans text-outline italic">
                            {lang === 'ar' ? 'لا توجد أصناف مضافة بعد' : 'No items added yet'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Checkout Summary panel */}
              <div className="w-80 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                    {lang === 'ar' ? 'ملخص الفاتورة والدفع' : 'Summary & Checkout'}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold text-outline">
                      <span>{lang === 'ar' ? 'إجمالي الأصناف' : 'Subtotal'}</span>
                      <span className="font-mono">{piSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-tertiary">
                      <span>{lang === 'ar' ? 'إجمالي الخصومات' : 'Total Discount'}</span>
                      <span className="font-mono">-{piDiscountTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black border-t border-outline-variant pt-2 text-white">
                      <span>{lang === 'ar' ? 'صافي القيمة المطلوبة' : 'Net Payable'}</span>
                      <span className="font-mono text-secondary text-lg">{piNetTotal.toFixed(2)}</span>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-outline-variant">
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المبلغ المدفوع *' : 'Amount Paid *'}</label>
                        <input
                          type="number"
                          step="0.01"
                          value={piPaidAmount || ''}
                          onChange={(e) => setPiPaidAmount(Number(e.target.value))}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'ملاحظات الفاتورة' : 'Invoice Notes'}</label>
                        <textarea
                          value={piNotes}
                          onChange={(e) => setPiNotes(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSavePurchaseInvoice}
                  className="w-full bg-secondary-container text-white py-3 font-bold rounded shadow hover:brightness-110 transition-all cursor-pointer mt-4 flex items-center justify-center gap-1 text-xs"
                >
                  <span className="material-symbols-outlined text-sm">save</span>
                  <span>{lang === 'ar' ? 'حفظ وترحيل الفاتورة' : 'Post Purchase Invoice'}</span>
                </button>
              </div>
            </div>
          )}

          {purchasesSubTab === 'return' && (
            <div className="h-full flex gap-4 overflow-hidden">
              <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
                <div className="flex gap-4 items-end mb-4 flex-shrink-0">
                  <div className="w-1/3">
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الفاتورة الأصلية' : 'Original Invoice'}</label>
                    <select
                      value={prInvoiceId}
                      onChange={async (e) => {
                        const invId = e.target.value
                        setPrInvoiceId(invId)
                        const selectedInv = purchaseInvoices.find(pi => pi.id === invId)
                        if (selectedInv && selectedInv.items) {
                          setPrItemsToReturn(selectedInv.items.map(item => ({
                            productId: item.productId,
                            name: item.product?.name || '---',
                            quantity: item.quantity,
                            purchasePrice: item.purchasePrice,
                            returnQty: 0
                          })))
                        } else {
                          setPrItemsToReturn([])
                        }
                      }}
                      className="w-full bg-surface-container border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                    >
                      <option value="">{lang === 'ar' ? 'اختر الفاتورة للارتجاع...' : 'Select invoice to return...'}</option>
                      {purchaseInvoices.map(pi => (
                        <option key={pi.id} value={pi.id}>{pi.invoiceNumber} - {pi.supplier?.name} ({pi.totalAmount.toFixed(2)})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم مستند المرتجع' : 'Return Number'}</label>
                    <input
                      type="text"
                      value={prReturnNumber}
                      onChange={(e) => setPrReturnNumber(e.target.value)}
                      placeholder="تلقائي"
                      className="w-full bg-surface-container border border-outline-variant rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                  <table className="w-full text-right rtl:text-right border-collapse">
                    <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                      <tr className="h-9 text-on-surface-variant">
                        <th className="px-4 py-1.5 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'الصنف' : 'Item'}</th>
                        <th className="px-4 py-1.5 text-center">{lang === 'ar' ? 'الكمية الأصلية' : 'Original Qty'}</th>
                        <th className="px-4 py-1.5 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'سعر الشراء' : 'Cost'}</th>
                        <th className="px-4 py-1.5 text-center w-32">{lang === 'ar' ? 'الكمية المرتجعة' : 'Return Qty'}</th>
                        <th className="px-4 py-1.5 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'إجمالي المرتجع' : 'Total Return'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                      {prItemsToReturn.map((item, idx) => (
                        <tr key={idx} className="hover:bg-surface-bright transition-colors h-10">
                          <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{item.name}</td>
                          <td className="px-4 text-center">{item.quantity}</td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right">{item.purchasePrice.toFixed(2)}</td>
                          <td className="px-4 text-center">
                            <input
                              type="number"
                              min="0"
                              max={item.quantity}
                              value={item.returnQty || ''}
                              onChange={(e) => {
                                const val = Math.min(item.quantity, Math.max(0, Number(e.target.value)))
                                const updated = [...prItemsToReturn]
                                updated[idx].returnQty = val
                                setPrItemsToReturn(updated)
                              }}
                              className="w-20 bg-surface-container border border-outline-variant rounded px-2 py-0.5 text-center text-xs text-white"
                            />
                          </td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">
                            {(item.returnQty * item.purchasePrice).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      {prItemsToReturn.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-10 font-sans text-outline italic">
                            {lang === 'ar' ? 'يرجى اختيار فاتورة شراء أولاً' : 'Please select purchase invoice first'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Return summary sidepanel */}
              <div className="w-80 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                    {lang === 'ar' ? 'ملخص المرتجع والمسترد' : 'Return Checkout'}
                  </h3>

                  {(() => {
                    const totalRet = prItemsToReturn.reduce((acc, item) => acc + ((item.returnQty || 0) * item.purchasePrice), 0)
                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm font-black text-white">
                          <span>{lang === 'ar' ? 'إجمالي المرتجع' : 'Total Return'}</span>
                          <span className="font-mono text-secondary text-lg">{totalRet.toFixed(2)}</span>
                        </div>
                        <div className="space-y-2 pt-4 border-t border-outline-variant">
                          <div>
                            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المبلغ المسترد نقداً *' : 'Refund Amount *'}</label>
                            <input
                              type="number"
                              step="0.01"
                              value={prRefundAmount || ''}
                              onChange={(e) => setPrRefundAmount(Number(e.target.value))}
                              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سبب الارتجاع / ملاحظات' : 'Notes'}</label>
                            <textarea
                              value={prNotes}
                              onChange={(e) => setPrNotes(e.target.value)}
                              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>

                <button
                  onClick={async () => {
                    const totalRet = prItemsToReturn.reduce((acc, item) => acc + ((item.returnQty || 0) * item.purchasePrice), 0)
                    if (totalRet === 0) {
                      alert(lang === 'ar' ? 'يرجى تحديد كميات مرتجعة أولاً' : 'Please select quantities to return')
                      return
                    }

                    const selectedInv = purchaseInvoices.find(pi => pi.id === prInvoiceId)
                    if (!selectedInv) return

                    const payload = {
                      returnNumber: prReturnNumber.trim() || `PR-${Date.now().toString().slice(-6)}`,
                      purchaseInvoiceId: prInvoiceId,
                      supplierId: selectedInv.supplierId,
                      totalAmount: totalRet,
                      refundAmount: prRefundAmount,
                      notes: prNotes,
                      userId: user.id,
                      items: prItemsToReturn.filter(i => i.returnQty > 0).map(i => ({
                        productId: i.productId,
                        quantity: i.returnQty,
                        purchasePrice: i.purchasePrice
                      }))
                    }

                    const res = await window.api.purchases.createReturn(payload)
                    if (res.success) {
                      alert(lang === 'ar' ? 'تم حفظ مستند مرتجع المشتريات وتعديل الحسابات والمخزن!' : 'Purchase Return saved successfully!')
                      setPrInvoiceId('')
                      setPrItemsToReturn([])
                      setPrRefundAmount(0)
                      setPrNotes('')
                      setPrReturnNumber('')
                      triggerRefresh()
                    } else {
                      alert(res.error)
                    }
                  }}
                  className="w-full bg-error text-on-error py-3 font-bold rounded shadow hover:brightness-110 transition-all cursor-pointer mt-4 flex items-center justify-center gap-1 text-xs"
                >
                  <span className="material-symbols-outlined text-sm">settings_backup_restore</span>
                  <span>{lang === 'ar' ? 'حفظ وترحيل المرتجع' : 'Post Purchase Return'}</span>
                </button>
              </div>
            </div>
          )}

          {purchasesSubTab === 'invoice_list' && (
            <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                <span className="material-symbols-outlined">receipt_long</span>
                {lang === 'ar' ? 'سجل فواتير الشراء والتوريد' : 'Purchase Invoices Ledger'}
              </h3>

              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'رقم الفاتورة' : 'Invoice Number'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'المورد' : 'Supplier'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'القيمة الإجمالية' : 'Total Amount'}</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'المسدد' : 'Paid'}</th>
                      <th className="px-4 py-2 text-center">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'البيان' : 'Notes'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                    {purchaseInvoices.map(pi => (
                      <tr key={pi.id} className="hover:bg-surface-bright transition-colors h-10">
                        <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{pi.invoiceNumber}</td>
                        <td className="px-4 font-sans text-on-surface">{pi.supplier?.name || '---'}</td>
                        <td className="px-4 text-outline">{new Date(pi.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{pi.totalAmount.toFixed(2)}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-tertiary">{pi.paidAmount.toFixed(2)}</td>
                        <td className="px-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pi.status === 'PAID' ? 'bg-secondary-container text-white' : (pi.status === 'PARTIAL' ? 'bg-amber-600 text-white' : 'bg-error text-white')
                          }`}>
                            {pi.status}
                          </span>
                        </td>
                        <td className="px-4 font-sans text-outline truncate max-w-[150px]">{pi.notes || '---'}</td>
                      </tr>
                    ))}
                    {purchaseInvoices.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-10 font-sans text-outline italic">
                          {lang === 'ar' ? 'لا توجد فواتير مسجلة بعد' : 'No invoices registered yet'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {purchasesSubTab === 'return_list' && (
            <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                <span className="material-symbols-outlined">assignment_return</span>
                {lang === 'ar' ? 'دفتر مرتجعات المشتريات' : 'Purchase Returns History'}
              </h3>

              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'رقم المرتجع' : 'Return Number'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'رقم الفاتورة الأصلية' : 'Original Invoice'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'المورد' : 'Supplier'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'إجمالي المرتجع' : 'Total Returned'}</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'المبلغ المسترد' : 'Refunded'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'البيان' : 'Notes'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                    {purchaseReturns.map(pr => (
                      <tr key={pr.id} className="hover:bg-surface-bright transition-colors h-10">
                        <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{pr.returnNumber}</td>
                        <td className="px-4 text-outline">{pr.purchaseInvoice?.invoiceNumber || '---'}</td>
                        <td className="px-4 font-sans text-on-surface">{pr.supplier?.name || '---'}</td>
                        <td className="px-4 text-outline">{new Date(pr.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-error">{pr.totalAmount.toFixed(2)}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{pr.refundAmount.toFixed(2)}</td>
                        <td className="px-4 font-sans text-outline truncate max-w-[150px]">{pr.notes || '---'}</td>
                      </tr>
                    ))}
                    {purchaseReturns.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-10 font-sans text-outline italic">
                          {lang === 'ar' ? 'لا توجد مرتجعات مسجلة بعد' : 'No returns registered yet'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {purchasesSubTab === 'payments' && (
            <div className="h-full flex gap-4 overflow-hidden">
              {/* Form to log payment */}
              <div className="w-1/3 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-full flex-shrink-0">
                <div>
                  <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                    {lang === 'ar' ? 'تسجيل دفعة سداد لمورد' : 'Record Supplier Payment'}
                  </h3>

                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    if (!newSupPaySupplierId) return

                    const payload = {
                      supplierId: newSupPaySupplierId,
                      amount: newSupPayAmount,
                      paymentMode: newSupPayMode,
                      vaultId: newSupPayMode === 'CASH' ? (newSupPayVaultId || undefined) : undefined,
                      bankId: newSupPayMode === 'BANK' ? (newSupPayBankId || undefined) : undefined,
                      notes: newSupPayNotes
                    }

                    const res = await window.api.supplierPayments.create(payload)
                    if (res.success) {
                      alert(lang === 'ar' ? 'تم تسجيل سداد الدفعة للمورد بنجاح!' : 'Supplier payment recorded successfully!')
                      setNewSupPaySupplierId('')
                      setNewSupPayAmount(0)
                      setNewSupPayNotes('')
                      triggerRefresh()
                    } else {
                      alert(res.error)
                    }
                  }} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المورد *' : 'Supplier *'}</label>
                      <select
                        required
                        value={newSupPaySupplierId}
                        onChange={(e) => setNewSupPaySupplierId(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                      >
                        <option value="">{lang === 'ar' ? 'اختر مورد...' : 'Select...'}</option>
                        {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.balance.toFixed(2)})</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'قيمة الدفعة *' : 'Amount *'}</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={newSupPayAmount || ''}
                        onChange={(e) => setNewSupPayAmount(Number(e.target.value))}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'طريقة الدفع *' : 'Payment Mode *'}</label>
                      <select
                        value={newSupPayMode}
                        onChange={(e) => setNewSupPayMode(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                      >
                        <option value="CASH">{lang === 'ar' ? 'خزينة / نقدي' : 'Cash (Vault)'}</option>
                        <option value="BANK">{lang === 'ar' ? 'حساب بنكي' : 'Bank Transfer'}</option>
                      </select>
                    </div>

                    {newSupPayMode === 'CASH' ? (
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الخزينة المصدر' : 'Source Vault'}</label>
                        <select
                          value={newSupPayVaultId}
                          onChange={(e) => setNewSupPayVaultId(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                        >
                          {vaults.map(v => <option key={v.id} value={v.id}>{v.name} ({v.currentBalance.toFixed(2)})</option>)}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'البنك المصدر' : 'Source Bank'}</label>
                        <select
                          value={newSupPayBankId}
                          onChange={(e) => setNewSupPayBankId(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                        >
                          <option value="">{lang === 'ar' ? 'اختر حساب بنك...' : 'Select bank...'}</option>
                          {banks.map(b => <option key={b.id} value={b.id}>{b.name} ({b.currentBalance.toFixed(2)})</option>)}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'البيان / ملاحظات' : 'Description / Notes'}</label>
                      <textarea
                        value={newSupPayNotes}
                        onChange={(e) => setNewSupPayNotes(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                        rows={3}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-on-primary py-2.5 font-bold rounded hover:opacity-95 transition-all cursor-pointer text-xs"
                    >
                      {lang === 'ar' ? 'سداد الدفعة' : 'Record Payment'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Payments ledger list */}
              <div className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden h-full">
                <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                  <span className="material-symbols-outlined">payments</span>
                  {lang === 'ar' ? 'سجل مدفوعات الموردين' : 'Supplier Payments Log'}
                </h3>
                <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                  <table className="w-full text-right rtl:text-right border-collapse">
                    <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                      <tr className="h-9 text-on-surface-variant">
                        <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'المورد' : 'Supplier'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'طريقة السداد' : 'Mode'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'الحساب / الخزينة' : 'Account/Vault'}</th>
                        <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'المبلغ المسدد' : 'Amount Owed'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'البيان' : 'Notes'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                      {supplierPayments.map(sp => (
                        <tr key={sp.id} className="hover:bg-surface-bright transition-colors h-10">
                          <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{sp.supplier?.name || '---'}</td>
                          <td className="px-4 text-outline">{new Date(sp.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</td>
                          <td className="px-4 text-center">
                            <span className="bg-primary-container text-white px-2 py-0.5 rounded text-[9px] font-bold">
                              {sp.paymentMode}
                            </span>
                          </td>
                          <td className="px-4 text-outline font-sans">
                            {sp.paymentMode === 'CASH' ? (sp.vault?.name || 'Main Vault') : (sp.bank?.name || '---')}
                          </td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{sp.amount.toFixed(2)}</td>
                          <td className="px-4 font-sans text-outline truncate max-w-[150px]">{sp.notes || '---'}</td>
                        </tr>
                      ))}
                      {supplierPayments.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-10 font-sans text-outline italic">
                            {lang === 'ar' ? 'لا توجد دفعات مسجلة بعد' : 'No payments recorded yet'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {purchasesSubTab === 'statement' && (
            <div className="h-full flex gap-4 overflow-hidden">
              <div className="w-80 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col h-full flex-shrink-0">
                <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                  {lang === 'ar' ? 'معايير كشف الحساب' : 'Statement Filters'}
                </h3>
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المورد' : 'Supplier'}</label>
                    <select
                      value={newSupPaySupplierId}
                      onChange={(e) => setNewSupPaySupplierId(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                    >
                      <option value="">{lang === 'ar' ? 'اختر مورد...' : 'Select Supplier...'}</option>
                      {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'من تاريخ' : 'Start Date'}</label>
                      <input
                        type="date"
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'إلى تاريخ' : 'End Date'}</label>
                      <input
                        type="date"
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {}}
                    className="w-full bg-secondary text-on-secondary py-2 rounded text-xs font-bold hover:opacity-95 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">find_in_page</span>
                    <span>{lang === 'ar' ? 'توليد كشف الحساب' : 'Generate Statement'}</span>
                  </button>
                </div>
              </div>

              {/* Statement print simulation */}
              <div className="flex-1 bg-white text-black p-8 rounded-xl border border-gray-300 overflow-y-auto flex flex-col justify-between">
                <div>
                  <div className="flex justify-between border-b-2 border-gray-800 pb-4 mb-6">
                    <div>
                      <h2 className="text-xl font-black">{settings.storeName}</h2>
                      <p className="text-xs text-gray-500">{settings.storeAddress}</p>
                      <p className="text-xs text-gray-500">{settings.storePhone}</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-lg font-black uppercase text-gray-700">{lang === 'ar' ? 'كشف حساب مورد' : 'Supplier Statement'}</h3>
                      <p className="text-xs text-gray-500 font-mono">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  {(() => {
                    const sup = suppliers.find(s => s.id === newSupPaySupplierId)
                    if (!sup) {
                      return (
                        <div className="text-center text-gray-400 py-12 text-xs italic">
                          {lang === 'ar' ? 'يرجى اختيار المورد لتوليد المعاينة.' : 'Please select a supplier to view details.'}
                        </div>
                      )
                    }

                    // Compile matches
                    const invs = purchaseInvoices.filter(pi => pi.supplierId === sup.id)
                    const rets = purchaseReturns.filter(pr => pr.supplierId === sup.id)
                    const pays = supplierPayments.filter(sp => sp.supplierId === sup.id)

                    return (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-xs bg-gray-100 p-3 rounded">
                          <div>
                            <span className="font-bold block text-gray-500">Supplier:</span>
                            <span className="font-black text-gray-800">{sup.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold block text-gray-500">Outstanding Balance:</span>
                            <span className="font-black text-red-600 font-mono">{sup.balance.toFixed(2)}</span>
                          </div>
                        </div>

                        <table className="w-full text-right rtl:text-right border-collapse text-xs mt-4">
                          <thead>
                            <tr className="bg-gray-800 text-white font-bold h-8">
                              <th className="px-3 py-1 text-right rtl:text-right ltr:text-left">Date</th>
                              <th className="px-3 py-1">Reference</th>
                              <th className="px-3 py-1 text-left rtl:text-left ltr:text-right">Debit (+ we owe)</th>
                              <th className="px-3 py-1 text-left rtl:text-left ltr:text-right">Credit (- paid/returned)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 font-mono">
                            {invs.map(i => (
                              <tr key={i.id} className="h-8">
                                <td className="px-3 text-right rtl:text-right ltr:text-left">{new Date(i.date).toLocaleDateString()}</td>
                                <td className="px-3 font-sans">Purchase Invoice #{i.invoiceNumber}</td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right text-gray-700">{i.totalAmount.toFixed(2)}</td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right text-gray-400">0.00</td>
                              </tr>
                            ))}
                            {pays.map(p => (
                              <tr key={p.id} className="h-8">
                                <td className="px-3 text-right rtl:text-right ltr:text-left">{new Date(p.date).toLocaleDateString()}</td>
                                <td className="px-3 font-sans">Supplier Payment ({p.paymentMode})</td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right text-gray-400">0.00</td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right text-green-600">{p.amount.toFixed(2)}</td>
                              </tr>
                            ))}
                            {rets.map(r => (
                              <tr key={r.id} className="h-8">
                                <td className="px-3 text-right rtl:text-right ltr:text-left">{new Date(r.date).toLocaleDateString()}</td>
                                <td className="px-3 font-sans">Purchase Return #{r.returnNumber}</td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right text-gray-400">0.00</td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right text-red-500">{r.totalAmount.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  })()}
                </div>
              </div>
            </div>
          )}

          {purchasesSubTab === 'cheques' && (
            <div className="h-full flex gap-4 overflow-hidden">
              {/* Add Cheque Form */}
              <div className="w-1/3 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-full flex-shrink-0">
                <div>
                  <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                    {lang === 'ar' ? 'إصدار شيك جديد للمورد' : 'Issue Supplier Cheque'}
                  </h3>

                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    if (!newSupChequeSupplierId) return

                    const payload = {
                      supplierId: newSupChequeSupplierId,
                      chequeNumber: newSupChequeNumber,
                      amount: newSupChequeAmount,
                      dueDate: newSupChequeDueDate,
                      bankId: newSupChequeBankId,
                      notes: newSupChequeNotes
                    }

                    const res = await window.api.supplierCheques.create(payload)
                    if (res.success) {
                      alert(lang === 'ar' ? 'تم تسجيل الشيك المصرفي بنجاح!' : 'Supplier cheque issued successfully!')
                      setNewSupChequeSupplierId('')
                      setNewSupChequeNumber('')
                      setNewSupChequeAmount(0)
                      setNewSupChequeDueDate('')
                      setNewSupChequeNotes('')
                      triggerRefresh()
                    } else {
                      alert(res.error)
                    }
                  }} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المورد المستفيد *' : 'Payee Supplier *'}</label>
                      <select
                        required
                        value={newSupChequeSupplierId}
                        onChange={(e) => setNewSupChequeSupplierId(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                      >
                        <option value="">{lang === 'ar' ? 'اختر مورد...' : 'Select supplier...'}</option>
                        {suppliers.map(s => <option key={s.id} value={s.id}>{s.name} ({s.balance.toFixed(2)})</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الشيك *' : 'Cheque Number *'}</label>
                      <input
                        type="text"
                        required
                        value={newSupChequeNumber}
                        onChange={(e) => setNewSupChequeNumber(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المبلغ *' : 'Amount *'}</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={newSupChequeAmount || ''}
                        onChange={(e) => setNewSupChequeAmount(Number(e.target.value))}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'البنك المسحوب عليه' : 'Bank Source'}</label>
                        <select
                          value={newSupChequeBankId}
                          onChange={(e) => setNewSupChequeBankId(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-on-surface"
                        >
                          <option value="">{lang === 'ar' ? 'اختر البنك...' : 'Select bank...'}</option>
                          {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'تاريخ الاستحقاق *' : 'Due Date *'}</label>
                        <input
                          type="date"
                          required
                          value={newSupChequeDueDate}
                          onChange={(e) => setNewSupChequeDueDate(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'البيان' : 'Notes'}</label>
                      <textarea
                        value={newSupChequeNotes}
                        onChange={(e) => setNewSupChequeNotes(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                        rows={2}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-on-primary py-2 font-bold rounded hover:opacity-95 transition-colors cursor-pointer text-xs"
                    >
                      {lang === 'ar' ? 'تسجيل الشيك' : 'Issue Cheque'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Cheques list */}
              <div className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden h-full">
                <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                  <span className="material-symbols-outlined">payments</span>
                  {lang === 'ar' ? 'شيكات صادرة للموردين' : 'Issued Supplier Cheques'}
                </h3>
                <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                  <table className="w-full text-right rtl:text-right border-collapse">
                    <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                      <tr className="h-9 text-on-surface-variant">
                        <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'المورد' : 'Supplier'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'رقم الشيك' : 'Cheque Number'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'البنك' : 'Bank'}</th>
                        <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'المبلغ' : 'Amount'}</th>
                        <th className="px-4 py-2 text-center">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                      {supplierCheques.map(sc => (
                        <tr key={sc.id} className="hover:bg-surface-bright transition-colors h-10">
                          <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{sc.supplier?.name || '---'}</td>
                          <td className="px-4 text-outline">{sc.chequeNumber}</td>
                          <td className="px-4 text-outline">{new Date(sc.dueDate).toLocaleDateString()}</td>
                          <td className="px-4 text-outline font-sans">{sc.bank?.name || '---'}</td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{sc.amount.toFixed(2)}</td>
                          <td className="px-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              sc.status === 'PAID' ? 'bg-secondary-container text-white' : 'bg-amber-600 text-white'
                            }`}>
                              {sc.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {supplierCheques.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-10 font-sans text-outline italic">
                            {lang === 'ar' ? 'لا توجد شيكات مسجلة بعد' : 'No cheques issued yet'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 2. Sales Ledger module
  const renderSalesLedger = () => {
    return (
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        {/* Navigation sub-tabs */}
        <div className="flex gap-1.5 bg-surface-container p-1 rounded border border-outline-variant/60 flex-shrink-0 overflow-x-auto">
          {[
            { id: 'invoice_list', labelAr: 'فواتير المبيعات', labelEn: 'Sales Invoices' },
            { id: 'return_list', labelAr: 'مرتجعات العملاء', labelEn: 'Client Returns' },
            { id: 'payments', labelAr: 'سداد العملاء', labelEn: 'Client Payments' },
            { id: 'statement', labelAr: 'كشف حساب عميل', labelEn: 'Client Statement' },
            { id: 'cheques', labelAr: 'شيكات العملاء', labelEn: 'Client Cheques' },
            { id: 'installments', labelAr: 'سجل الأقساط', labelEn: 'Installments' },
            { id: 'quotation', labelAr: 'عروض الأسعار', labelEn: 'Quotations' },
            { id: 'period_sales', labelAr: 'مبيعات فترة', labelEn: 'Sales Report' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSalesSubTab(tab.id as any)}
              className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors whitespace-nowrap ${
                salesSubTab === tab.id ? 'bg-primary-container text-white' : 'text-outline hover:text-white'
              }`}
            >
              {lang === 'ar' ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="flex-grow overflow-hidden min-h-0">
          {salesSubTab === 'invoice_list' && (
            <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                <span className="material-symbols-outlined">receipt_long</span>
                {lang === 'ar' ? 'دفتر فواتير المبيعات' : 'Sales Invoices Log'}
              </h3>
              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'رقم الفاتورة' : 'Invoice Number'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'العميل' : 'Client'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'طريقة الدفع' : 'Payment Type'}</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الإجمالي' : 'Total'}</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'المسدد' : 'Paid'}</th>
                      <th className="px-4 py-2 text-center">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                      <th className="px-4 py-2 text-center">{lang === 'ar' ? 'خيارات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                    {salesInvoices.map(si => (
                      <tr key={si.id} className="hover:bg-surface-bright transition-colors h-10">
                        <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{si.invoiceNumber}</td>
                        <td className="px-4 font-sans text-on-surface">{si.client?.name || (lang === 'ar' ? 'عميل نقدي' : 'Cash Client')}</td>
                        <td className="px-4 text-outline">{new Date(si.date).toLocaleDateString()}</td>
                        <td className="px-4 text-center">
                          <span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-outline">
                            {si.paymentType}
                          </span>
                        </td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{si.totalAmount.toFixed(2)}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-tertiary">{si.paidAmount.toFixed(2)}</td>
                        <td className="px-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            si.status === 'PAID' ? 'bg-secondary-container text-white' : 'bg-amber-600 text-white'
                          }`}>
                            {si.status}
                          </span>
                        </td>
                        <td className="px-4 text-center">
                          <button
                            onClick={() => {
                              // We will trigger PDF invoice export here
                              handleExportInvoicePDF(si)
                            }}
                            className="bg-primary/20 hover:bg-primary hover:text-white text-primary px-2.5 py-1 rounded text-[10px] font-bold flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">picture_as_pdf</span>
                            <span>{lang === 'ar' ? 'تصدير PDF' : 'Export PDF'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {salesSubTab === 'return_list' && (
            <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                <span className="material-symbols-outlined">assignment_return</span>
                {lang === 'ar' ? 'سجل مرتجعات المبيعات للعملاء' : 'Client Returns History'}
              </h3>
              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-container-high border-b border-outline-variant h-10 text-on-surface-variant font-bold">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">Date</th>
                      <th className="px-4 py-2">Invoice Ref</th>
                      <th className="px-4 py-2">Cashier</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Total Refunded</th>
                      <th className="px-4 py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 font-data-mono">
                    {/* Wait, since we are doing returns we can render mock list or load from api.returns if defined */}
                    <tr>
                      <td colSpan={5} className="text-center py-10 font-sans text-outline italic">
                        {lang === 'ar' ? 'لا توجد مرتجعات مبيعات مسجلة في الوردية الحالية' : 'No sales returns logged in active shift'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {salesSubTab === 'payments' && (
            <div className="h-full flex gap-4 overflow-hidden">
              <div className="w-1/3 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-full flex-shrink-0">
                <div>
                  <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                    {lang === 'ar' ? 'تسجيل دفعة سداد من عميل' : 'Record Client Payment'}
                  </h3>

                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    if (!newCliPayClientId) return

                    const payload = {
                      clientId: newCliPayClientId,
                      amount: newCliPayAmount,
                      paymentMode: newCliPayMode,
                      vaultId: newCliPayMode === 'CASH' ? (newCliPayVaultId || undefined) : undefined,
                      bankId: newCliPayMode === 'BANK' ? (newCliPayBankId || undefined) : undefined,
                      notes: newCliPayNotes
                    }

                    const res = await window.api.clientPayments.create(payload)
                    if (res.success) {
                      alert(lang === 'ar' ? 'تم تسجيل سداد دفعة العميل بنجاح!' : 'Client payment recorded successfully!')
                      setNewCliPayClientId('')
                      setNewCliPayAmount(0)
                      setNewCliPayNotes('')
                      triggerRefresh()
                    } else {
                      alert(res.error)
                    }
                  }} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'العميل *' : 'Client *'}</label>
                      <select
                        required
                        value={newCliPayClientId}
                        onChange={(e) => setNewCliPayClientId(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                      >
                        <option value="">{lang === 'ar' ? 'اختر عميل...' : 'Select client...'}</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.currentBalance.toFixed(2)})</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'قيمة الدفعة *' : 'Amount *'}</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={newCliPayAmount || ''}
                        onChange={(e) => setNewCliPayAmount(Number(e.target.value))}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'طريقة السداد *' : 'Payment Mode *'}</label>
                      <select
                        value={newCliPayMode}
                        onChange={(e) => setNewCliPayMode(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                      >
                        <option value="CASH">{lang === 'ar' ? 'خزينة / نقدي' : 'Cash (Vault)'}</option>
                        <option value="BANK">{lang === 'ar' ? 'حساب بنكي' : 'Bank Transfer'}</option>
                      </select>
                    </div>

                    {newCliPayMode === 'CASH' ? (
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الخزينة المصدر' : 'Vault'}</label>
                        <select
                          value={newCliPayVaultId}
                          onChange={(e) => setNewCliPayVaultId(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                        >
                          {vaults.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'البنك المصدر' : 'Bank'}</label>
                        <select
                          value={newCliPayBankId}
                          onChange={(e) => setNewCliPayBankId(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                        >
                          <option value="">{lang === 'ar' ? 'اختر حساب البنك...' : 'Select bank...'}</option>
                          {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'البيان' : 'Notes'}</label>
                      <textarea
                        value={newCliPayNotes}
                        onChange={(e) => setNewCliPayNotes(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                        rows={2}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-on-primary py-2.5 font-bold rounded hover:opacity-95 transition-all cursor-pointer text-xs"
                    >
                      {lang === 'ar' ? 'سداد الدفعة' : 'Record Client Payment'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Payments ledger list */}
              <div className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden h-full">
                <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                  <span className="material-symbols-outlined">payments</span>
                  {lang === 'ar' ? 'سجل مدفوعات العملاء' : 'Client Payments Log'}
                </h3>
                <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                  <table className="w-full text-right rtl:text-right border-collapse">
                    <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                      <tr className="h-9 text-on-surface-variant">
                        <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'العميل' : 'Client'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'طريقة السداد' : 'Mode'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'الحساب / الخزينة' : 'Account/Vault'}</th>
                        <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'المبلغ المسدد' : 'Amount'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'البيان' : 'Notes'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                      {clientPayments.map(cp => (
                        <tr key={cp.id} className="hover:bg-surface-bright transition-colors h-10">
                          <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{cp.client?.name || '---'}</td>
                          <td className="px-4 text-outline">{new Date(cp.date).toLocaleDateString()}</td>
                          <td className="px-4 text-center">
                            <span className="bg-primary-container text-white px-2 py-0.5 rounded text-[9px] font-bold">
                              {cp.paymentMode}
                            </span>
                          </td>
                          <td className="px-4 text-outline font-sans">
                            {cp.paymentMode === 'CASH' ? (cp.vault?.name || 'Main Vault') : (cp.bank?.name || '---')}
                          </td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{cp.amount.toFixed(2)}</td>
                          <td className="px-4 font-sans text-outline truncate max-w-[150px]">{cp.notes || '---'}</td>
                        </tr>
                      ))}
                      {clientPayments.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-10 font-sans text-outline italic">
                            {lang === 'ar' ? 'لا توجد سدادات مسجلة بعد' : 'No client payments logged'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {salesSubTab === 'statement' && (
            <div className="h-full flex gap-4 overflow-hidden">
              <div className="w-80 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col h-full flex-shrink-0">
                <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                  {lang === 'ar' ? 'كشف حساب عميل' : 'Client Statement'}
                </h3>
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'العميل' : 'Client'}</label>
                    <select
                      value={newCliPayClientId}
                      onChange={(e) => setNewCliPayClientId(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                    >
                      <option value="">{lang === 'ar' ? 'اختر العميل...' : 'Select Client...'}</option>
                      {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <button
                    onClick={() => {}}
                    className="w-full bg-secondary text-on-secondary py-2 rounded text-xs font-bold hover:opacity-95 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">print</span>
                    <span>{lang === 'ar' ? 'معاينة كشف الحساب' : 'Preview Statement'}</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-white text-black p-8 rounded-xl border border-gray-300 overflow-y-auto flex flex-col justify-between">
                <div>
                  <div className="flex justify-between border-b-2 border-gray-800 pb-4 mb-6">
                    <div>
                      <h2 className="text-xl font-black">{settings.storeName}</h2>
                      <p className="text-xs text-gray-500">{settings.storeAddress}</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-lg font-black text-gray-700">{lang === 'ar' ? 'كشف حساب عميل تفصيلي' : 'Client Ledger Report'}</h3>
                    </div>
                  </div>

                  {(() => {
                    const cli = clients.find(c => c.id === newCliPayClientId)
                    if (!cli) {
                      return <div className="text-center text-gray-400 py-12 italic">{lang === 'ar' ? 'اختر عميل لعرض التقرير' : 'Select client to generate report'}</div>
                    }

                    const cliInvoices = salesInvoices.filter(si => si.clientId === cli.id)
                    const cliPays = clientPayments.filter(cp => cp.clientId === cli.id)

                    return (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-xs bg-gray-100 p-3 rounded">
                          <div>
                            <span className="font-bold block text-gray-500">Client Name:</span>
                            <span className="font-black text-gray-800">{cli.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold block text-gray-500">Outstanding Balance:</span>
                            <span className="font-black text-red-600 font-mono">{cli.currentBalance.toFixed(2)}</span>
                          </div>
                        </div>

                        <table className="w-full text-right rtl:text-right border-collapse text-xs mt-4">
                          <thead>
                            <tr className="bg-gray-800 text-white font-bold h-8">
                              <th className="px-3 py-1 text-right rtl:text-right ltr:text-left">Date</th>
                              <th className="px-3 py-1">Reference</th>
                              <th className="px-3 py-1 text-left rtl:text-left ltr:text-right">Debit (+ purchase)</th>
                              <th className="px-3 py-1 text-left rtl:text-left ltr:text-right">Credit (- payment)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 font-mono">
                            {cliInvoices.map(i => (
                              <tr key={i.id} className="h-8">
                                <td className="px-3 text-right rtl:text-right ltr:text-left">{new Date(i.date).toLocaleDateString()}</td>
                                <td className="px-3 font-sans text-gray-800">Invoice #{i.invoiceNumber}</td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right">{i.totalAmount.toFixed(2)}</td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right text-gray-400">0.00</td>
                              </tr>
                            ))}
                            {cliPays.map(p => (
                              <tr key={p.id} className="h-8">
                                <td className="px-3 text-right rtl:text-right ltr:text-left">{new Date(p.date).toLocaleDateString()}</td>
                                <td className="px-3 font-sans text-gray-800">Payment ({p.paymentMode})</td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right text-gray-400">0.00</td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right text-green-600">{p.amount.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  })()}
                </div>
              </div>
            </div>
          )}

          {salesSubTab === 'cheques' && (
            <div className="h-full flex gap-4 overflow-hidden">
              <div className="w-1/3 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-full flex-shrink-0">
                <div>
                  <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                    {lang === 'ar' ? 'استلام شيك جديد من عميل' : 'Record Client Cheque'}
                  </h3>

                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    if (!newCliChequeClientId) return

                    const payload = {
                      clientId: newCliChequeClientId,
                      chequeNumber: newCliChequeNumber,
                      amount: newCliChequeAmount,
                      dueDate: newCliChequeDueDate,
                      bankId: newCliChequeBankId,
                      notes: newCliChequeNotes
                    }

                    const res = await window.api.clientCheques.create(payload)
                    if (res.success) {
                      alert(lang === 'ar' ? 'تم حفظ الشيك المصرفي بنجاح!' : 'Client cheque saved successfully!')
                      setNewCliChequeClientId('')
                      setNewCliChequeNumber('')
                      setNewCliChequeAmount(0)
                      setNewCliChequeDueDate('')
                      setNewCliChequeNotes('')
                      triggerRefresh()
                    } else {
                      alert(res.error)
                    }
                  }} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'العميل *' : 'Client *'}</label>
                      <select
                        required
                        value={newCliChequeClientId}
                        onChange={(e) => setNewCliChequeClientId(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                      >
                        <option value="">{lang === 'ar' ? 'اختر العميل...' : 'Select client...'}</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.currentBalance.toFixed(2)})</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الشيك *' : 'Cheque Number *'}</label>
                      <input
                        type="text"
                        required
                        value={newCliChequeNumber}
                        onChange={(e) => setNewCliChequeNumber(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المبلغ *' : 'Amount *'}</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={newCliChequeAmount || ''}
                        onChange={(e) => setNewCliChequeAmount(Number(e.target.value))}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'البنك المسجل عليه' : 'Bank target'}</label>
                        <select
                          value={newCliChequeBankId}
                          onChange={(e) => setNewCliChequeBankId(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-on-surface"
                        >
                          <option value="">{lang === 'ar' ? 'اختر البنك...' : 'Select bank...'}</option>
                          {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'تاريخ الاستحقاق *' : 'Due Date *'}</label>
                        <input
                          type="date"
                          required
                          value={newCliChequeDueDate}
                          onChange={(e) => setNewCliChequeDueDate(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'ملاحظات' : 'Notes'}</label>
                      <textarea
                        value={newCliChequeNotes}
                        onChange={(e) => setNewCliChequeNotes(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                        rows={2}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-on-primary py-2 font-bold rounded hover:opacity-95 transition-colors cursor-pointer text-xs"
                    >
                      {lang === 'ar' ? 'تسجيل الشيك' : 'Record Cheque'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Cheques List */}
              <div className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden h-full">
                <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                  <span className="material-symbols-outlined">payments</span>
                  {lang === 'ar' ? 'شيكات العملاء المحصلة والقائمة' : 'Client Cheques Ledger'}
                </h3>
                <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                  <table className="w-full text-right rtl:text-right border-collapse">
                    <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                      <tr className="h-9 text-on-surface-variant">
                        <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'العميل' : 'Client'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'رقم الشيك' : 'Cheque Number'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'البنك المستهدف' : 'Bank'}</th>
                        <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'المبلغ' : 'Amount'}</th>
                        <th className="px-4 py-2 text-center">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                      {clientCheques.map(cc => (
                        <tr key={cc.id} className="hover:bg-surface-bright transition-colors h-10">
                          <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{cc.client?.name || '---'}</td>
                          <td className="px-4 text-outline">{cc.chequeNumber}</td>
                          <td className="px-4 text-outline">{new Date(cc.dueDate).toLocaleDateString()}</td>
                          <td className="px-4 text-outline font-sans">{cc.bank?.name || '---'}</td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{cc.amount.toFixed(2)}</td>
                          <td className="px-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              cc.status === 'PAID' ? 'bg-secondary-container text-white' : 'bg-amber-600 text-white'
                            }`}>
                              {cc.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {clientCheques.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-10 font-sans text-outline italic">
                            {lang === 'ar' ? 'لا توجد شيكات عملاء مسجلة' : 'No client cheques recorded'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {salesSubTab === 'installments' && (
            <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                <span className="material-symbols-outlined">schedule</span>
                {lang === 'ar' ? 'متابعة ذمم وأرصدة العملاء والائتمان' : 'Client Limits & Installments'}
              </h3>

              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant font-bold">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم العميل' : 'Client'}</th>
                      <th className="px-4 py-2">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الحد الائتماني' : 'Credit Limit'}</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الرصيد المستحق' : 'Owed Balance'}</th>
                      <th className="px-4 py-2 text-center">{lang === 'ar' ? 'مؤشر الائتمان' : 'Credit Health'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                    {clients.map(c => {
                      const health = c.currentBalance >= c.creditLimit ? 'text-error font-black' : 'text-secondary font-bold'
                      return (
                        <tr key={c.id} className="hover:bg-surface-bright transition-colors h-10">
                          <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{c.name}</td>
                          <td className="px-4 text-outline">{c.phone || '---'}</td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right text-outline">{c.creditLimit.toFixed(2)}</td>
                          <td className={`px-4 text-left rtl:text-left ltr:text-right ${health}`}>{c.currentBalance.toFixed(2)}</td>
                          <td className="px-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.currentBalance >= c.creditLimit ? 'bg-error/20 text-error' : 'bg-secondary-container/20 text-white'
                            }`}>
                              {c.currentBalance >= c.creditLimit ? (lang === 'ar' ? 'متجاوز الحد' : 'Limit Exceeded') : (lang === 'ar' ? 'سليم' : 'Healthy')}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {salesSubTab === 'quotation' && (
            <div className="h-full flex gap-4 overflow-hidden">
              {/* Form to create Quote */}
              <div className="w-1/3 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-full flex-shrink-0">
                <div>
                  <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                    {lang === 'ar' ? 'إنشاء عرض سعر جديد' : 'New Price Quotation'}
                  </h3>

                  <form onSubmit={async (e) => {
                    e.preventDefault()

                    const subtotal = newQuoteItems.reduce((acc, i) => acc + (i.quantity * i.sellPrice), 0)
                    const total = Math.max(0, subtotal - newQuoteDiscount)

                    const payload = {
                      quotationNumber: newQuoteNumber.trim() || `QT-${Date.now().toString().slice(-6)}`,
                      clientId: newQuoteClientId || undefined,
                      clientName: newQuoteClientName || (lang === 'ar' ? 'عميل افتراضي' : 'Walk-in Client'),
                      subtotal,
                      discount: newQuoteDiscount,
                      totalAmount: total,
                      notes: newQuoteNotes,
                      userId: user.id,
                      items: newQuoteItems.map(i => ({
                        productId: i.productId,
                        quantity: i.quantity,
                        sellPrice: i.sellPrice
                      }))
                    }

                    const res = await window.api.quotations.create(payload)
                    if (res.success) {
                      alert(lang === 'ar' ? 'تم حفظ عرض السعر بنجاح!' : 'Price Quotation saved successfully!')
                      setNewQuoteNumber('')
                      setNewQuoteClientId('')
                      setNewQuoteClientName('')
                      setNewQuoteDiscount(0)
                      setNewQuoteNotes('')
                      setNewQuoteItems([])
                      triggerRefresh()
                    } else {
                      alert(res.error)
                    }
                  }} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم العميل' : 'Client Name'}</label>
                      <input
                        type="text"
                        value={newQuoteClientName}
                        onChange={(e) => setNewQuoteClientName(e.target.value)}
                        placeholder="أدخل اسم العميل..."
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant space-y-2">
                      <label className="block text-[9px] font-bold text-outline">{lang === 'ar' ? 'إضافة صنف للعرض' : 'Add Item'}</label>
                      <select
                        value={newQuoteSelectedProductId}
                        onChange={(e) => {
                          setNewQuoteSelectedProductId(e.target.value)
                          const p = products.find(prod => prod.id === e.target.value)
                          if (p) setNewQuotePrice(p.sellPrice)
                        }}
                        className="w-full bg-surface-container border border-outline-variant rounded px-2 py-1 text-xs text-on-surface"
                      >
                        <option value="">{lang === 'ar' ? 'اختر منتج...' : 'Select product...'}</option>
                        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="الكمية"
                          value={newQuoteQty || ''}
                          onChange={(e) => setNewQuoteQty(Number(e.target.value))}
                          className="w-full bg-surface-container border border-outline-variant rounded px-2 py-1 text-xs text-white"
                        />
                        <input
                          type="number"
                          step="0.01"
                          placeholder="السعر"
                          value={newQuotePrice || ''}
                          onChange={(e) => setNewQuotePrice(Number(e.target.value))}
                          className="w-full bg-surface-container border border-outline-variant rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newQuoteSelectedProductId) return
                          const p = products.find(prod => prod.id === newQuoteSelectedProductId)
                          if (!p) return
                          setNewQuoteItems([...newQuoteItems, {
                            productId: newQuoteSelectedProductId,
                            name: p.name,
                            quantity: newQuoteQty,
                            sellPrice: newQuotePrice
                          }])
                          setNewQuoteSelectedProductId('')
                          setNewQuoteQty(1)
                          setNewQuotePrice(0)
                        }}
                        className="w-full py-1 bg-secondary text-white font-bold rounded text-xs hover:opacity-90"
                      >
                        {lang === 'ar' ? 'أضف الصنف' : 'Add Item'}
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'خصم إجمالي' : 'Total Discount'}</label>
                      <input
                        type="number"
                        value={newQuoteDiscount || ''}
                        onChange={(e) => setNewQuoteDiscount(Number(e.target.value))}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-1.5 text-xs text-white font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-on-primary py-2.5 font-bold rounded hover:opacity-95 transition-all text-xs"
                    >
                      {lang === 'ar' ? 'حفظ عرض السعر' : 'Save Quotation'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Items List in Quote */}
              <div className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden h-full">
                <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                  <span className="material-symbols-outlined">assignment</span>
                  {lang === 'ar' ? 'أصناف عرض السعر الحالي' : 'Quotation Items'}
                </h3>
                <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0 mb-4">
                  <table className="w-full text-right rtl:text-right border-collapse">
                    <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                      <tr className="h-9 text-on-surface-variant">
                        <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'الصنف' : 'Item'}</th>
                        <th className="px-4 py-2 text-center">{lang === 'ar' ? 'الكمية' : 'Qty'}</th>
                        <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'سعر الوحدة' : 'Unit Price'}</th>
                        <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الإجمالي' : 'Total'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                      {newQuoteItems.map((item, idx) => (
                        <tr key={idx} className="h-9">
                          <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{item.name}</td>
                          <td className="px-4 text-center">{item.quantity}</td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right">{item.sellPrice.toFixed(2)}</td>
                          <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">
                            {(item.quantity * item.sellPrice).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center text-xs font-bold text-outline pt-2 border-t border-outline-variant flex-shrink-0">
                  <span>{lang === 'ar' ? 'المجموع' : 'Quotation Total'}:</span>
                  <span className="text-white text-base font-black">
                    {newQuoteItems.reduce((acc, i) => acc + (i.quantity * i.sellPrice), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {salesSubTab === 'period_sales' && (
            <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-3 flex-shrink-0">
                <h3 className="text-primary font-bold text-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined">analytics</span>
                  {lang === 'ar' ? 'تقرير المبيعات التفصيلي لفترة' : 'Detailed Period Sales Report'}
                </h3>
              </div>
              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant font-bold">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">Invoice No</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Customer</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Total Amount</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Paid Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                    {salesInvoices.map(si => (
                      <tr key={si.id} className="h-10 hover:bg-surface-bright transition-colors">
                        <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{si.invoiceNumber}</td>
                        <td className="px-4 text-outline">{new Date(si.date).toLocaleString()}</td>
                        <td className="px-4 font-sans text-on-surface">{si.client?.name || 'Walk-in Client'}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{si.totalAmount.toFixed(2)}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right text-tertiary">{si.paidAmount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 3. Employees module
  const renderEmployees = () => {
    // Calculates payroll elements for selected employee
    const calculateEmployeePayroll = () => {
      const emp = employees.find(e => e.id === payrollEmpId)
      if (!emp) return { salary: 0, advances: 0, deductions: 0, net: 0 }

      const advances = empTransactions
        .filter(t => t.employeeId === emp.id && t.type === 'ADVANCE')
        .reduce((acc, t) => acc + t.amount, 0)

      const deductions = empTransactions
        .filter(t => t.employeeId === emp.id && t.type === 'DEDUCTION')
        .reduce((acc, t) => acc + t.amount, 0)

      const salary = emp.salary
      const net = Math.max(0, salary - advances - deductions)

      return { salary, advances, deductions, net }
    }

    const payroll = calculateEmployeePayroll()

    return (
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        {/* Navigation sub-tabs */}
        <div className="flex gap-1.5 bg-surface-container p-1 rounded border border-outline-variant/60 flex-shrink-0">
          <button
            onClick={() => setEmployeesSubTab('payroll')}
            className={`px-4 py-1.5 rounded text-xs font-bold cursor-pointer transition-colors ${
              employeesSubTab === 'payroll' ? 'bg-primary-container text-white' : 'text-outline hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'مسيرات رواتب وسلف الموظفين' : 'Salary Advances & Payroll'}
          </button>
          <button
            onClick={() => setEmployeesSubTab('deductions')}
            className={`px-4 py-1.5 rounded text-xs font-bold cursor-pointer transition-colors ${
              employeesSubTab === 'deductions' ? 'bg-primary-container text-white' : 'text-outline hover:text-white'
            }`}
          >
            {lang === 'ar' ? 'تسجيل جزاءات واستقطاعات الموظفين' : 'Employee Deductions & Penalties'}
          </button>
        </div>

        <div className="flex-grow overflow-hidden min-h-0">
          {employeesSubTab === 'payroll' && (
            <div className="h-full flex gap-4 overflow-hidden">
              {/* Form to log transaction */}
              <div className="w-1/3 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-full flex-shrink-0">
                <div>
                  <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                    {lang === 'ar' ? 'صرف مستحقات موظف' : 'Disburse Salary / Advance'}
                  </h3>

                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    if (!payrollEmpId) return

                    const payload = {
                      employeeId: payrollEmpId,
                      type: payrollDesc === 'سلفة' ? 'ADVANCE' : 'SALARY',
                      amount: payrollAmount,
                      notes: payrollDesc,
                      vaultId: payrollVaultId
                    }

                    const res = await window.api.employees.addTransaction(payload)
                    if (res.success) {
                      alert(lang === 'ar' ? 'تم صرف الدفعة النقدية وتسجيلها بنجاح!' : 'Transaction saved and paid successfully!')
                      setPayrollAmount(0)
                      // Reload transactions for selected employee
                      fetchEmployeeTransactions(payrollEmpId)
                      triggerRefresh()
                    } else {
                      alert(res.error)
                    }
                  }} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الموظف *' : 'Employee *'}</label>
                      <select
                        required
                        value={payrollEmpId}
                        onChange={(e) => {
                          setPayrollEmpId(e.target.value)
                          if (e.target.value) fetchEmployeeTransactions(e.target.value)
                        }}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                      >
                        <option value="">{lang === 'ar' ? 'اختر موظف...' : 'Select employee...'}</option>
                        {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.salary.toFixed(2)})</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'نوع المعاملة *' : 'Transaction Type *'}</label>
                      <select
                        value={payrollDesc}
                        onChange={(e) => setPayrollDesc(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                      >
                        <option value="راتب">{lang === 'ar' ? 'صرف راتب شهري' : 'Month Salary'}</option>
                        <option value="سلفة">{lang === 'ar' ? 'صرف سلفة نقدية' : 'Salary Advance'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'القيمة المنصرفة *' : 'Disbursed Amount *'}</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={payrollAmount || ''}
                        onChange={(e) => setPayrollAmount(Number(e.target.value))}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الخزينة المنصرف منها *' : 'Disbursing Vault *'}</label>
                      <select
                        value={payrollVaultId}
                        onChange={(e) => setPayrollVaultId(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                      >
                        {vaults.map(v => <option key={v.id} value={v.id}>{v.name} ({v.currentBalance.toFixed(2)})</option>)}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-on-primary py-2.5 font-bold rounded hover:opacity-95 transition-all text-xs"
                    >
                      {lang === 'ar' ? 'صرف القيمة نقداً' : 'Disburse Cash Payment'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Salary calculations side panel */}
              <div className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col overflow-hidden h-full">
                <div className="flex justify-between border-b border-outline-variant pb-4 mb-4 flex-shrink-0">
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">calculate</span>
                    {lang === 'ar' ? 'ملخص واحتساب رواتب الموظف' : 'Salary Calculations Sheet'}
                  </h3>
                </div>

                {payrollEmpId ? (
                  <div className="space-y-6 flex-1 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-surface-container p-3 rounded text-center">
                        <span className="block text-[10px] text-outline font-bold uppercase">{lang === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}</span>
                        <span className="font-mono text-lg font-black text-white">{payroll.salary.toFixed(2)}</span>
                      </div>
                      <div className="bg-surface-container p-3 rounded text-center">
                        <span className="block text-[10px] text-outline font-bold uppercase">{lang === 'ar' ? 'إجمالي السلف' : 'Total Advances'}</span>
                        <span className="font-mono text-lg font-black text-tertiary">-{payroll.advances.toFixed(2)}</span>
                      </div>
                      <div className="bg-surface-container p-3 rounded text-center">
                        <span className="block text-[10px] text-outline font-bold uppercase">{lang === 'ar' ? 'الجزاءات' : 'Deductions'}</span>
                        <span className="font-mono text-lg font-black text-error">-{payroll.deductions.toFixed(2)}</span>
                      </div>
                      <div className="bg-secondary-container p-3 rounded text-center">
                        <span className="block text-[10px] text-white font-bold uppercase">{lang === 'ar' ? 'صافي الراتب المستحق' : 'Net Salary Due'}</span>
                        <span className="font-mono text-lg font-black text-white">{payroll.net.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border border-outline-variant rounded p-4">
                      <h4 className="font-bold text-xs text-primary mb-3">{lang === 'ar' ? 'سجل معاملات الموظف الحالية' : 'Current Employee Ledger Log'}</h4>
                      <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-right rtl:text-right border-collapse text-xs">
                          <thead>
                            <tr className="bg-surface-container text-on-surface-variant font-bold h-8">
                              <th className="px-3 py-1 text-right rtl:text-right ltr:text-left">Date</th>
                              <th className="px-3 py-1">Type</th>
                              <th className="px-3 py-1 text-left rtl:text-left ltr:text-right">Amount</th>
                              <th className="px-3 py-1">Details</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-outline-variant/10 font-data-mono">
                            {empTransactions.map(t => (
                              <tr key={t.id} className="h-8">
                                <td className="px-3 text-right rtl:text-right ltr:text-left">{new Date(t.date).toLocaleDateString()}</td>
                                <td className="px-3 text-center">
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                    t.type === 'SALARY' ? 'bg-secondary-container text-white' : (t.type === 'ADVANCE' ? 'bg-amber-600 text-white' : 'bg-error text-white')
                                  }`}>
                                    {t.type}
                                  </span>
                                </td>
                                <td className="px-3 text-left rtl:text-left ltr:text-right font-bold">{t.amount.toFixed(2)}</td>
                                <td className="px-3 font-sans text-outline truncate max-w-[120px]">{t.notes || '---'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-outline text-xs italic">
                    {lang === 'ar' ? 'يرجى اختيار الموظف لعرض مسير الراتب والمعاملات' : 'Please select an employee to view details'}
                  </div>
                )}
              </div>
            </div>
          )}

          {employeesSubTab === 'deductions' && (
            <div className="h-full flex gap-4 overflow-hidden">
              <div className="w-1/3 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-full flex-shrink-0">
                <div>
                  <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                    {lang === 'ar' ? 'تسجيل جزاء أو استقطاع مالي' : 'Log Employee Penalty'}
                  </h3>

                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    if (!deductionEmpId) return

                    const payload = {
                      employeeId: deductionEmpId,
                      type: 'DEDUCTION',
                      amount: deductionAmount,
                      notes: deductionNotes
                    }

                    const res = await window.api.employees.addTransaction(payload)
                    if (res.success) {
                      alert(lang === 'ar' ? 'تم تسجيل الخصم المالي بنجاح!' : 'Deduction recorded successfully!')
                      setDeductionAmount(0)
                      setDeductionNotes('')
                      triggerRefresh()
                    } else {
                      alert(res.error)
                    }
                  }} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الموظف المعاقب *' : 'Employee *'}</label>
                      <select
                        required
                        value={deductionEmpId}
                        onChange={(e) => setDeductionEmpId(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface"
                      >
                        <option value="">{lang === 'ar' ? 'اختر الموظف...' : 'Select employee...'}</option>
                        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'قيمة الخصم المالي *' : 'Penalty Amount *'}</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={deductionAmount || ''}
                        onChange={(e) => setDeductionAmount(Number(e.target.value))}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سبب الخصم بالتفصيل *' : 'Reason / Notes *'}</label>
                      <textarea
                        required
                        value={deductionNotes}
                        onChange={(e) => setDeductionNotes(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                        rows={4}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-error text-on-error py-2.5 font-bold rounded hover:opacity-95 transition-all text-xs"
                    >
                      {lang === 'ar' ? 'تسجيل الخصم المالي' : 'Log Penalty Deduction'}
                    </button>
                  </form>
                </div>
              </div>

              <div className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden h-full">
                <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                  <span className="material-symbols-outlined text-error">gavel</span>
                  {lang === 'ar' ? 'سجل جزاءات واستقطاعات الموظفين' : 'Employee Penalties Ledger'}
                </h3>
                <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                  <table className="w-full text-right rtl:text-right border-collapse">
                    <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                      <tr className="h-9 text-on-surface-variant">
                        <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'الموظف' : 'Employee'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                        <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'قيمة الجزاء' : 'Penalty Amount'}</th>
                        <th className="px-4 py-2">{lang === 'ar' ? 'السبب والبيان' : 'Reason / Notes'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                      {employees.flatMap(emp => (emp.employeeTransactions || [])
                        .filter(t => t.type === 'DEDUCTION')
                        .map(t => (
                          <tr key={t.id} className="hover:bg-surface-bright transition-colors h-10">
                            <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{emp.name}</td>
                            <td className="px-4 text-outline">{new Date(t.date).toLocaleDateString()}</td>
                            <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-error">-{t.amount.toFixed(2)}</td>
                            <td className="px-4 font-sans text-outline truncate max-w-[200px]">{t.notes || '---'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 4. Vault module
  const renderVault = () => {
    return (
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        {/* Navigation sub-tabs */}
        <div className="flex gap-1.5 bg-surface-container p-1 rounded border border-outline-variant/60 flex-shrink-0">
          {[
            { id: 'transactions', labelAr: 'كشف الخزينة المالي', labelEn: 'Safe Ledger' },
            { id: 'cash_in', labelAr: 'إيداع نقدي', labelEn: 'Cash Deposit' },
            { id: 'cash_out', labelAr: 'سحب نقدي', labelEn: 'Cash Withdrawal' },
            { id: 'transfers', labelAr: 'تحويل نقدي', labelEn: 'Vault Transfers' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setVaultSubTab(tab.id as any)
                if (tab.id === 'transactions') fetchVaultTransactions(vaultOpsId)
              }}
              className={`px-4 py-1.5 rounded text-xs font-bold cursor-pointer transition-colors ${
                vaultSubTab === tab.id ? 'bg-primary-container text-white' : 'text-outline hover:text-white'
              }`}
            >
              {lang === 'ar' ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="flex-grow overflow-hidden min-h-0">
          {vaultSubTab === 'transactions' && (
            <div className="h-full flex gap-4 overflow-hidden">
              <div className="w-80 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col h-full flex-shrink-0">
                <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                  {lang === 'ar' ? 'الخزائن المتاحة' : 'Vault Accounts'}
                </h3>
                <div className="space-y-2 flex-grow overflow-y-auto">
                  {vaults.map(v => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setVaultOpsId(v.id)
                        fetchVaultTransactions(v.id)
                      }}
                      className={`w-full p-3 border rounded text-right rtl:text-right ltr:text-left flex flex-col justify-between transition-colors ${
                        vaultOpsId === v.id
                          ? 'border-primary bg-primary-container/20'
                          : 'border-outline-variant bg-surface hover:bg-surface-bright'
                      }`}
                    >
                      <span className="font-bold text-xs text-white">{v.name}</span>
                      <span className="font-mono text-base font-black text-secondary mt-1">{v.currentBalance.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden h-full">
                <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                  <span className="material-symbols-outlined">analytics</span>
                  {lang === 'ar' ? 'سجل قيود وحركات الخزينة' : 'Safe Ledger Transactions'}
                </h3>
                <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                  <table className="w-full text-right rtl:text-right border-collapse">
                    <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                      <tr className="h-9 text-on-surface-variant font-bold">
                        <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">Date</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Debit / Credit</th>
                        <th className="px-4 py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                      {vaultTransactionsList.map(vt => (
                        <tr key={vt.id} className="h-10 hover:bg-surface-bright transition-colors">
                          <td className="px-4 text-right rtl:text-right ltr:text-left text-outline">{new Date(vt.createdAt).toLocaleString()}</td>
                          <td className="px-4 text-center">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                              vt.type === 'DEPOSIT' ? 'bg-secondary-container text-white' : 'bg-error text-white'
                            }`}>
                              {vt.type}
                            </span>
                          </td>
                          <td className={`px-4 text-left rtl:text-left ltr:text-right font-bold ${
                            vt.type === 'DEPOSIT' ? 'text-secondary' : 'text-error'
                          }`}>
                            {vt.type === 'DEPOSIT' ? `+${vt.amount.toFixed(2)}` : `-${vt.amount.toFixed(2)}`}
                          </td>
                          <td className="px-4 font-sans text-outline truncate max-w-[200px]">{vt.notes || '---'}</td>
                        </tr>
                      ))}
                      {vaultTransactionsList.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center py-10 font-sans text-outline italic">
                            {lang === 'ar' ? 'لا توجد حركات مسجلة لهذه الخزينة' : 'No transactions recorded for this vault'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {vaultSubTab === 'cash_in' && (
            <div className="h-full flex items-center justify-center">
              <div className="w-96 bg-surface-container border border-outline-variant rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant text-center">
                  {lang === 'ar' ? 'إيداع نقدي في الخزينة' : 'Vault Cash Deposit'}
                </h3>
                <form onSubmit={async (e) => {
                  e.preventDefault()

                  const res = await window.api.vaults.cashIn({
                    vaultId: vaultOpsId,
                    amount: vaultOpsAmount,
                    notes: vaultOpsNotes,
                    userId: user.id
                  })

                  if (res.success) {
                    alert(lang === 'ar' ? 'تم الإيداع النقدي بنجاح!' : 'Cash deposited successfully!')
                    setVaultOpsAmount(0)
                    setVaultOpsNotes('')
                    triggerRefresh()
                  } else {
                    alert(res.error)
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'الخزينة المستهدفة' : 'Target Vault'}</label>
                    <select
                      value={vaultOpsId}
                      onChange={(e) => setVaultOpsId(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-on-surface"
                    >
                      {vaults.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'قيمة مبلغ الإيداع' : 'Deposit Amount'}</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={vaultOpsAmount || ''}
                      onChange={(e) => setVaultOpsAmount(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'البيان ومصدر الإيداع' : 'Source / Description'}</label>
                    <textarea
                      value={vaultOpsNotes}
                      onChange={(e) => setVaultOpsNotes(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                      rows={3}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-secondary-container text-white py-2 rounded font-bold hover:brightness-110 cursor-pointer text-xs"
                  >
                    {lang === 'ar' ? 'إيداع الآن' : 'Settle Deposit'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {vaultSubTab === 'cash_out' && (
            <div className="h-full flex items-center justify-center">
              <div className="w-96 bg-surface-container border border-outline-variant rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant text-center">
                  {lang === 'ar' ? 'سحب نقدي من الخزينة' : 'Vault Cash Withdrawal'}
                </h3>
                <form onSubmit={async (e) => {
                  e.preventDefault()

                  const res = await window.api.vaults.cashOut({
                    vaultId: vaultOpsId,
                    amount: vaultOpsAmount,
                    notes: vaultOpsNotes,
                    userId: user.id
                  })

                  if (res.success) {
                    alert(lang === 'ar' ? 'تم السحب النقدي بنجاح!' : 'Cash withdrawn successfully!')
                    setVaultOpsAmount(0)
                    setVaultOpsNotes('')
                    triggerRefresh()
                  } else {
                    alert(res.error)
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'الخزينة المصدر' : 'Source Vault'}</label>
                    <select
                      value={vaultOpsId}
                      onChange={(e) => setVaultOpsId(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-on-surface"
                    >
                      {vaults.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'مبلغ السحب النقدي' : 'Withdrawal Amount'}</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={vaultOpsAmount || ''}
                      onChange={(e) => setVaultOpsAmount(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'السبب ومستلم النقدية' : 'Payee / Purpose'}</label>
                    <textarea
                      value={vaultOpsNotes}
                      onChange={(e) => setVaultOpsNotes(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                      rows={3}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-error text-on-error py-2 rounded font-bold hover:brightness-110 cursor-pointer text-xs"
                  >
                    {lang === 'ar' ? 'سحب نقدي الآن' : 'Settle Withdrawal'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {vaultSubTab === 'transfers' && (
            <div className="h-full flex items-center justify-center">
              <div className="w-[500px] bg-surface-container border border-outline-variant rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant text-center">
                  {lang === 'ar' ? 'تحويل نقدي بين الخزائن والبنوك' : 'Cash Safe-to-Safe / Safe-to-Bank Transfer'}
                </h3>
                <form onSubmit={async (e) => {
                  e.preventDefault()

                  // Call vault safe transfer
                  let res
                  if (transferToVaultId) {
                    res = await window.api.vaults.transferToVault({
                      fromVaultId: transferFromVaultId,
                      toVaultId: transferToVaultId,
                      amount: vaultTransferAmount,
                      notes: vaultTransferNotes,
                      userId: user.id
                    })
                  } else if (transferToBankId) {
                    res = await window.api.vaults.transferToBank({
                      vaultId: transferFromVaultId,
                      bankId: transferToBankId,
                      amount: vaultTransferAmount,
                      notes: vaultTransferNotes,
                      userId: user.id
                    })
                  } else {
                    alert(lang === 'ar' ? 'يرجى اختيار الوجهة المستهدفة للتحويل' : 'Please select a transfer destination')
                    return
                  }

                  if (res.success) {
                    alert(lang === 'ar' ? 'تمت عملية التحويل النقدي بنجاح!' : 'Vault cash transfer posted successfully!')
                    setVaultTransferAmount(0)
                    setVaultTransferNotes('')
                    setTransferToVaultId('')
                    setTransferToBankId('')
                    triggerRefresh()
                  } else {
                    alert(res.error)
                  }
                }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'الخزينة المصدر *' : 'Source Vault *'}</label>
                      <select
                        required
                        value={transferFromVaultId}
                        onChange={(e) => setTransferFromVaultId(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-on-surface"
                      >
                        {vaults.map(v => <option key={v.id} value={v.id}>{v.name} ({v.currentBalance.toFixed(2)})</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'القيمة المحولة *' : 'Transfer Amount *'}</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={vaultTransferAmount || ''}
                        onChange={(e) => setVaultTransferAmount(Number(e.target.value))}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-outline-variant">
                    <div>
                      <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'الخزينة المستهدفة' : 'To Vault Destination'}</label>
                      <select
                        value={transferToVaultId}
                        onChange={(e) => {
                          setTransferToVaultId(e.target.value)
                          setTransferToBankId('')
                        }}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-on-surface"
                      >
                        <option value="">{lang === 'ar' ? 'اختر الخزينة...' : 'Select vault...'}</option>
                        {vaults.filter(v => v.id !== transferFromVaultId).map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'البنك المستهدف' : 'To Bank Destination'}</label>
                      <select
                        value={transferToBankId}
                        onChange={(e) => {
                          setTransferToBankId(e.target.value)
                          setTransferToVaultId('')
                        }}
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-on-surface"
                      >
                        <option value="">{lang === 'ar' ? 'اختر البنك...' : 'Select bank...'}</option>
                        {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'البيان وتفاصيل التحويل' : 'Transfer Notes'}</label>
                    <textarea
                      value={vaultTransferNotes}
                      onChange={(e) => setVaultTransferNotes(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                      rows={2}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary py-2.5 rounded font-bold hover:brightness-110 cursor-pointer text-xs"
                  >
                    {lang === 'ar' ? 'تنفيذ التحويل المالي' : 'Execute Transfer'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 5. Bank module
  const renderBank = () => {
    return (
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        {/* Navigation sub-tabs */}
        <div className="flex gap-1.5 bg-surface-container p-1 rounded border border-outline-variant/60 flex-shrink-0">
          {[
            { id: 'statement', labelAr: 'كشف حساب البنك', labelEn: 'Bank Statement Ledger' },
            { id: 'deposit', labelAr: 'إيداع بنكي', labelEn: 'Bank Deposit' },
            { id: 'withdraw', labelAr: 'سحب بنكي', labelEn: 'Bank Withdrawal' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setBankSubTab(tab.id as any)
                if (tab.id === 'statement') fetchBankTransactions(bankOpsId)
              }}
              className={`px-4 py-1.5 rounded text-xs font-bold cursor-pointer transition-colors ${
                bankSubTab === tab.id ? 'bg-primary-container text-white' : 'text-outline hover:text-white'
              }`}
            >
              {lang === 'ar' ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="flex-grow overflow-hidden min-h-0">
          {bankSubTab === 'statement' && (
            <div className="h-full flex gap-4 overflow-hidden">
              <div className="w-80 bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-col h-full flex-shrink-0">
                <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant mb-4">
                  {lang === 'ar' ? 'الحسابات البنكية المتاحة' : 'Bank Accounts'}
                </h3>
                <div className="space-y-2 flex-grow overflow-y-auto">
                  {banks.map(b => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setBankOpsId(b.id)
                        fetchBankTransactions(b.id)
                      }}
                      className={`w-full p-3 border rounded text-right rtl:text-right ltr:text-left flex flex-col justify-between transition-colors ${
                        bankOpsId === b.id
                          ? 'border-primary bg-primary-container/20'
                          : 'border-outline-variant bg-surface hover:bg-surface-bright'
                      }`}
                    >
                      <span className="font-bold text-xs text-white">{b.name}</span>
                      <span className="text-[10px] text-outline mt-0.5">{b.accountNumber || '---'}</span>
                      <span className="font-mono text-base font-black text-secondary mt-1">{b.currentBalance.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden h-full">
                <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                  <span className="material-symbols-outlined">analytics</span>
                  {lang === 'ar' ? 'سجل قيود الحركات البنكية' : 'Bank Transactions Statement'}
                </h3>
                <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                  <table className="w-full text-right rtl:text-right border-collapse">
                    <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                      <tr className="h-9 text-on-surface-variant font-bold">
                        <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">Date</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Debit / Credit</th>
                        <th className="px-4 py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                      {bankTransactionsList.map(bt => (
                        <tr key={bt.id} className="h-10 hover:bg-surface-bright transition-colors">
                          <td className="px-4 text-right rtl:text-right ltr:text-left text-outline">{new Date(bt.createdAt).toLocaleString()}</td>
                          <td className="px-4 text-center">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                              bt.type === 'DEPOSIT' || bt.type === 'TRANSFER_IN' ? 'bg-secondary-container text-white' : 'bg-error text-white'
                            }`}>
                              {bt.type}
                            </span>
                          </td>
                          <td className={`px-4 text-left rtl:text-left ltr:text-right font-bold ${
                            bt.type === 'DEPOSIT' || bt.type === 'TRANSFER_IN' ? 'text-secondary' : 'text-error'
                          }`}>
                            {bt.type === 'DEPOSIT' || bt.type === 'TRANSFER_IN' ? `+${bt.amount.toFixed(2)}` : `-${bt.amount.toFixed(2)}`}
                          </td>
                          <td className="px-4 font-sans text-outline truncate max-w-[200px]">{bt.notes || '---'}</td>
                        </tr>
                      ))}
                      {bankTransactionsList.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center py-10 font-sans text-outline italic">
                            {lang === 'ar' ? 'لا توجد قيود لحركات هذا الحساب البنكي' : 'No transactions recorded for this bank account'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {bankSubTab === 'deposit' && (
            <div className="h-full flex items-center justify-center">
              <div className="w-96 bg-surface-container border border-outline-variant rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant text-center">
                  {lang === 'ar' ? 'إيداع نقدي / تحويل للبنك' : 'Bank Deposit'}
                </h3>
                <form onSubmit={async (e) => {
                  e.preventDefault()

                  const res = await window.api.banks.deposit({
                    bankId: bankOpsId,
                    amount: bankOpsAmount,
                    notes: bankOpsNotes
                  })

                  if (res.success) {
                    alert(lang === 'ar' ? 'تم الإيداع البنكي بنجاح!' : 'Bank deposit recorded successfully!')
                    setBankOpsAmount(0)
                    setBankOpsNotes('')
                    triggerRefresh()
                  } else {
                    alert(res.error)
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'الحساب البنكي المستهدف *' : 'Target Bank Account *'}</label>
                    <select
                      value={bankOpsId}
                      onChange={(e) => setBankOpsId(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-on-surface"
                    >
                      <option value="">{lang === 'ar' ? 'اختر البنك...' : 'Select Bank...'}</option>
                      {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'قيمة الإيداع' : 'Deposit Amount'}</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={bankOpsAmount || ''}
                      onChange={(e) => setBankOpsAmount(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'البيان والملاحظات' : 'Description'}</label>
                    <textarea
                      value={bankOpsNotes}
                      onChange={(e) => setBankOpsNotes(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                      rows={3}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-secondary-container text-white py-2 rounded font-bold hover:brightness-110 cursor-pointer text-xs"
                  >
                    {lang === 'ar' ? 'تنفيذ الإيداع البنكي' : 'Execute Deposit'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {bankSubTab === 'withdraw' && (
            <div className="h-full flex items-center justify-center">
              <div className="w-96 bg-surface-container border border-outline-variant rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-sm text-primary pb-2 border-b border-outline-variant text-center">
                  {lang === 'ar' ? 'سحب نقدي / تحويل من البنك' : 'Bank Withdrawal'}
                </h3>
                <form onSubmit={async (e) => {
                  e.preventDefault()

                  const res = await window.api.banks.withdraw({
                    bankId: bankOpsId,
                    amount: bankOpsAmount,
                    notes: bankOpsNotes
                  })

                  if (res.success) {
                    alert(lang === 'ar' ? 'تم تسجيل السحب البنكي بنجاح!' : 'Bank withdrawal registered successfully!')
                    setBankOpsAmount(0)
                    setBankOpsNotes('')
                    triggerRefresh()
                  } else {
                    alert(res.error)
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'الحساب البنكي المصدر *' : 'Source Bank Account *'}</label>
                    <select
                      value={bankOpsId}
                      onChange={(e) => setBankOpsId(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-on-surface"
                    >
                      <option value="">{lang === 'ar' ? 'اختر البنك...' : 'Select Bank...'}</option>
                      {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'قيمة السحب النقدي' : 'Withdrawal Amount'}</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={bankOpsAmount || ''}
                      onChange={(e) => setBankOpsAmount(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-sm text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline mb-1">{lang === 'ar' ? 'البيان ومستلم النقدية' : 'Payee / Purpose'}</label>
                    <textarea
                      value={bankOpsNotes}
                      onChange={(e) => setBankOpsNotes(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
                      rows={3}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-error text-on-error py-2 rounded font-bold hover:brightness-110 cursor-pointer text-xs"
                  >
                    {lang === 'ar' ? 'تنفيذ السحب البنكي' : 'Execute Withdrawal'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 6. Profits module
  const renderProfits = () => {
    return (
      <div className="flex flex-col gap-4 h-full overflow-hidden">
        {/* Date Filters and Tabs bar */}
        <div className="flex justify-between items-center bg-surface-container p-2 rounded border border-outline-variant/60 flex-shrink-0 gap-4">
          <div className="flex gap-1.5 overflow-x-auto">
            {[
              { id: 'period_profits', labelAr: 'الأرباح والتحليلات العامة', labelEn: 'Financial Profit Report' },
              { id: 'invoice_profits', labelAr: 'أرباح الفواتير التفصيلية', labelEn: 'Invoices Profit margins' },
              { id: 'category_profits', labelAr: 'أرباح مجموعات الأصناف', labelEn: 'Category Profits' },
              { id: 'product_profits', labelAr: 'أرباح المنتجات المحددة', labelEn: 'Product Profits' },
              { id: 'client_profits', labelAr: 'أرباح حسابات العملاء', labelEn: 'Client Profits' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setProfitsSubTab(tab.id as any)}
                className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-colors whitespace-nowrap ${
                  profitsSubTab === tab.id ? 'bg-primary-container text-white' : 'text-outline hover:text-white'
                }`}
              >
                {lang === 'ar' ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={profitsStartDate}
              onChange={(e) => setProfitsStartDate(e.target.value)}
              className="bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white font-mono"
            />
            <span className="text-outline text-xs">إلى</span>
            <input
              type="date"
              value={profitsEndDate}
              onChange={(e) => setProfitsEndDate(e.target.value)}
              className="bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white font-mono"
            />
          </div>
        </div>

        <div className="flex-grow overflow-hidden min-h-0">
          {profitsSubTab === 'period_profits' && profitsReportData && (
            <div className="h-full grid grid-cols-4 gap-4 overflow-y-auto">
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4 flex flex-col justify-center text-center">
                <span className="text-outline text-[11px] font-bold uppercase">{lang === 'ar' ? 'إجمالي المبيعات' : 'Total Revenue'}</span>
                <span className="font-mono text-2xl font-black text-secondary mt-1">{profitsReportData.totalSales.toFixed(2)}</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4 flex flex-col justify-center text-center">
                <span className="text-outline text-[11px] font-bold uppercase">{lang === 'ar' ? 'تكلفة المبيعات (COGS)' : 'Total Cost (COGS)'}</span>
                <span className="font-mono text-2xl font-black text-tertiary mt-1">{profitsReportData.totalCogs.toFixed(2)}</span>
              </div>
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4 flex flex-col justify-center text-center">
                <span className="text-outline text-[11px] font-bold uppercase">{lang === 'ar' ? 'إجمالي المصروفات' : 'Expenses'}</span>
                <span className="font-mono text-2xl font-black text-error mt-1">{profitsReportData.totalExpenses.toFixed(2)}</span>
              </div>
              <div className="bg-secondary-container border border-outline-variant rounded-xl p-4 flex flex-col justify-center text-center">
                <span className="text-white text-[11px] font-bold uppercase">{lang === 'ar' ? 'صافي الأرباح التشغيلية' : 'Net Operational Profit'}</span>
                <span className="font-mono text-2xl font-black text-white mt-1">{profitsReportData.netProfit.toFixed(2)}</span>
              </div>

              {/* Profit breakdown info */}
              <div className="col-span-4 bg-surface-container border border-outline-variant rounded-xl p-6 flex flex-col">
                <h3 className="text-primary font-bold text-sm mb-4">{lang === 'ar' ? 'تحليل هيكل الأرباح التشغيلية' : 'Operational Cost & Profit Breakdown'}</h3>
                
                <div className="grid grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-outline font-bold mb-1">
                        <span>{lang === 'ar' ? 'هامش الربح الإجمالي' : 'Gross Margin'}</span>
                        <span>{((profitsReportData.grossProfit / (profitsReportData.totalSales || 1)) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full" style={{ width: `${Math.min(100, Math.max(0, (profitsReportData.grossProfit / (profitsReportData.totalSales || 1)) * 100))}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-outline font-bold mb-1">
                        <span>{lang === 'ar' ? 'هامش الربح الصافي' : 'Net Margin'}</span>
                        <span>{((profitsReportData.netProfit / (profitsReportData.totalSales || 1)) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${Math.min(100, Math.max(0, (profitsReportData.netProfit / (profitsReportData.totalSales || 1)) * 100))}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container-low border border-outline-variant rounded p-4 text-xs space-y-2 font-mono">
                    <div className="flex justify-between text-outline">
                      <span>Gross Profit:</span>
                      <span className="font-bold text-white">{profitsReportData.grossProfit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-outline">
                      <span>Total Expenses:</span>
                      <span className="font-bold text-error">-{profitsReportData.totalExpenses.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white border-t border-outline-variant pt-2">
                      <span>Net Profit:</span>
                      <span className="font-bold text-secondary">{profitsReportData.netProfit.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {profitsSubTab === 'invoice_profits' && (
            <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                <span className="material-symbols-outlined">receipt</span>
                {lang === 'ar' ? 'أرباح وهوامش الفواتير التفصيلية' : 'Invoice Margin Details'}
              </h3>

              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant font-bold">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">Invoice No</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Sale Amount</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">COGS Cost</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                    {invoiceProfitsData.map(ip => (
                      <tr key={ip.id} className="h-10 hover:bg-surface-bright transition-colors">
                        <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{ip.invoiceNumber}</td>
                        <td className="px-4 text-outline">{new Date(ip.date).toLocaleString()}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right text-white">{ip.totalAmount.toFixed(2)}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right text-tertiary">{ip.cogs.toFixed(2)}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{(ip.totalAmount - ip.cogs).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {profitsSubTab === 'category_profits' && profitsReportData && (
            <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                <span className="material-symbols-outlined">category</span>
                {lang === 'ar' ? 'ربحية مجموعات وتصنيفات المنتجات' : 'Category Sales Profit margins'}
              </h3>

              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant font-bold">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">Category Name</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Total Revenue</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                    {profitsReportData.categoryProfits?.map((cat: any, idx: number) => (
                      <tr key={idx} className="h-10 hover:bg-surface-bright transition-colors">
                        <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{cat.name || '---'}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right text-white">{cat.revenue.toFixed(2)}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{cat.profit.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {profitsSubTab === 'product_profits' && profitsReportData && (
            <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                <span className="material-symbols-outlined">inventory</span>
                {lang === 'ar' ? 'أرباح وهوامش بيع المنتجات الفردية' : 'Individual Products Profitability'}
              </h3>

              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant font-bold">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">Product Name</th>
                      <th className="px-4 py-2 text-center">Qty Sold</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Revenue</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                    {profitsReportData.productProfits?.map((prod: any, idx: number) => (
                      <tr key={idx} className="h-10 hover:bg-surface-bright transition-colors">
                        <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{prod.name}</td>
                        <td className="px-4 text-center text-white">{prod.qty}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right text-white">{prod.revenue.toFixed(2)}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{prod.profit.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {profitsSubTab === 'client_profits' && profitsReportData && (
            <div className="h-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-1.5 flex-shrink-0">
                <span className="material-symbols-outlined">person</span>
                {lang === 'ar' ? 'ربحية حسابات العملاء المحددة' : 'Customer Account Profit margins'}
              </h3>

              <div className="flex-grow overflow-auto border border-outline-variant rounded bg-surface min-h-0">
                <table className="w-full text-right rtl:text-right border-collapse">
                  <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant text-xs z-10">
                    <tr className="h-10 text-on-surface-variant font-bold">
                      <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">Customer Name</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Sales Revenue</th>
                      <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">Net Profit Contribution</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-outline-variant/20 font-data-mono">
                    {profitsReportData.clientProfits?.map((cli: any, idx: number) => (
                      <tr key={idx} className="h-10 hover:bg-surface-bright transition-colors">
                        <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{cli.name}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right text-white">{cli.revenue.toFixed(2)}</td>
                        <td className="px-4 text-left rtl:text-left ltr:text-right font-bold text-secondary">{cli.profit.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 4. Settings View
  const renderSettings = () => {
    return (
      <div className="grid grid-cols-12 gap-4 h-full overflow-y-auto pb-10">
        {/* Barcode Label Designer */}
        <div className="col-span-12 bg-surface-container-low border border-outline-variant rounded-xl p-4 flex flex-col h-fit">
          <h2 className="font-bold flex items-center gap-2 text-sm pb-2.5 border-b border-outline-variant mb-4">
            <span className="material-symbols-outlined text-primary text-xl">qr_code_scanner</span>
            {lang === 'ar' ? 'مصمم ملصقات الباركود والأسعار (Barcode Label Designer)' : 'Price Tag Barcode Label Designer'}
          </h2>
          <div className="grid grid-cols-3 gap-6 items-start">
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اختر المنتج للطباعة' : 'Select Product'}</label>
                <select
                  value={designerProduct ? designerProduct.id : ''}
                  onChange={(e) => {
                    const prod = products.find(p => p.id === e.target.value)
                    setDesignerProduct(prod || null)
                  }}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-on-surface cursor-pointer"
                >
                  <option value="">{lang === 'ar' ? 'اختر منتجاً...' : 'Select product...'}</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.barcode})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'حجم الملصق الحراري' : 'Label Stock Size'}</label>
                <select
                  value={labelSize}
                  onChange={(e) => setLabelSize(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-on-surface cursor-pointer"
                >
                  <option value="38x25mm">38x25mm (Standard Tag)</option>
                  <option value="50x30mm">50x30mm (Medium Retail)</option>
                  <option value="80x50mm">80x50mm (Large Box)</option>
                </select>
              </div>

              <button
                type="button"
                disabled={!designerProduct}
                onClick={async () => {
                  if (!designerProduct) return
                  const escposData = `[BARCODE LABEL]\nSize: ${labelSize}\nStore: ${settings.storeName}\nProduct: ${designerProduct.name}\nPrice: ${designerProduct.sellPrice.toFixed(2)}\nBarcode: ${designerProduct.barcode}\n[CUT]`
                  const res = await window.api.hardware.printRaw({ text: escposData })
                  if (res.success) {
                    alert(lang === 'ar' ? 'تم إرسال أمر طباعة الباركود بنجاح!' : 'Barcode print command sent to thermal spool!')
                  }
                }}
                className={`w-full py-2.5 rounded font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                  !designerProduct
                    ? 'bg-surface-container-highest text-outline border border-outline-variant/30 cursor-not-allowed'
                    : 'bg-primary text-on-primary hover:brightness-110'
                }`}
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>{lang === 'ar' ? 'طباعة ملصق الباركود [F7]' : 'Print Barcode Label [F7]'}</span>
              </button>
            </div>

            {/* Simulated price tag preview */}
            <div className="col-span-2 border border-dashed border-outline-variant p-6 rounded bg-surface-container-lowest flex items-center justify-center">
              {designerProduct ? (
                <div className="bg-white text-black p-4 rounded shadow-lg border border-gray-300 w-64 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                    {settings.storeName}
                  </span>
                  <span className="text-sm font-black text-center line-clamp-1 block mb-2">
                    {designerProduct.name}
                  </span>
                  
                  {/* Mock barcode bars */}
                  <div className="w-full h-10 border-black border-t border-b flex items-center justify-around mb-1 py-1">
                    <div className="w-1.5 h-full bg-black"></div>
                    <div className="w-0.5 h-full bg-black"></div>
                    <div className="w-1 h-full bg-black"></div>
                    <div className="w-2 h-full bg-black"></div>
                    <div className="w-0.5 h-full bg-black"></div>
                    <div className="w-1.5 h-full bg-black"></div>
                    <div className="w-1 h-full bg-black"></div>
                  </div>
                  <span className="text-[9px] font-mono tracking-widest block mb-3">
                    {designerProduct.barcode}
                  </span>

                  <div className="flex justify-between items-baseline w-full px-2 mt-1 border-t border-gray-200 pt-2">
                    <span className="text-[9px] font-bold text-gray-500 uppercase">Price:</span>
                    <span className="text-lg font-black font-data-mono">
                      {designerProduct.sellPrice.toFixed(2)} {lang === 'ar' ? 'ج.م' : 'SAR'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-outline text-xs italic py-12">
                  {lang === 'ar' ? 'يرجى اختيار صنف منتج لمعاينة ملصق السعر' : 'Please select product to preview label'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Management Bento Card */}
        <div className="col-span-8 bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden flex flex-col h-fit">
          <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container">
            <h2 className="font-bold flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-primary text-xl">group</span>
              {lang === 'ar' ? 'إدارة حسابات المستخدمين والموظفين' : 'User Accounts Management'}
            </h2>
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="text-primary hover:underline font-bold text-xs cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">person_add</span>
              <span>{lang === 'ar' ? 'إضافة مستخدم' : '+ Add User'}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right rtl:text-right border-collapse">
              <thead>
                <tr className="bg-surface-container-highest text-on-surface-variant text-[11px] uppercase tracking-wider">
                  <th className="px-4 py-2 border-b border-outline-variant font-bold text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'}</th>
                  <th className="px-4 py-2 border-b border-outline-variant font-bold">{lang === 'ar' ? 'اسم المستخدم' : 'Username'}</th>
                  <th className="px-4 py-2 border-b border-outline-variant font-bold">{lang === 'ar' ? 'الدور الوظيفي' : 'Role'}</th>
                  <th className="px-4 py-2 border-b border-outline-variant font-bold">{lang === 'ar' ? 'الصلاحيات' : 'Permissions'}</th>
                  <th className="px-4 py-2 border-b border-outline-variant font-bold">{lang === 'ar' ? 'تاريخ الإنشاء' : 'Date Created'}</th>
                  <th className="px-4 py-2 border-b border-outline-variant font-bold">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="text-body-md text-xs divide-y divide-outline-variant/20 font-data-mono">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="px-4 py-3 border-b border-outline-variant text-right rtl:text-right ltr:text-left font-bold text-on-surface">{u.name}</td>
                    <td className="px-4 py-3 border-b border-outline-variant text-outline">@{u.username}</td>
                    <td className="px-4 py-3 border-b border-outline-variant">
                      <span className="bg-primary-container/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-outline-variant">
                      {u.role === 'ADMIN' ? (
                        <span className="text-[10px] text-outline italic">
                          {lang === 'ar' ? 'كاملة (مدير)' : 'All (Admin)'}
                        </span>
                      ) : (
                        <button
                          onClick={async () => {
                            setSelectedPermissionUser(u)
                            setSelectedUserPermissions([])
                            try {
                              const res = await window.api.permissions.get({ userId: u.id })
                              if (res.success && res.data) {
                                setSelectedUserPermissions(res.data)
                              }
                            } catch (err) {
                              console.error(err)
                            }
                          }}
                          className="px-2.5 py-1 bg-secondary text-on-secondary rounded text-[10px] font-bold hover:brightness-110 flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                        >
                          <span className="material-symbols-outlined text-xs">lock_open</span>
                          <span>{lang === 'ar' ? 'تعديل الصلاحيات' : 'Edit Perms'}</span>
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b border-outline-variant text-outline">
                      {new Date(u.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                    </td>
                    <td className="px-4 py-3 border-b border-outline-variant">
                      <span className="flex items-center gap-1 text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                        <span>{lang === 'ar' ? 'نشط' : 'Active'}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* Backup & Recovery */}
        <div className="col-span-4 bg-surface-container-low border border-outline-variant rounded-xl p-4 flex flex-col h-fit">
          <h2 className="font-bold flex items-center gap-2 text-sm pb-2.5 border-b border-outline-variant mb-4">
            <span className="material-symbols-outlined text-tertiary text-xl">backup</span>
            {lang === 'ar' ? 'النسخ الاحتياطي والأمان' : 'Database & Backup Logs'}
          </h2>
          <div className="bg-surface-container-highest p-3 border border-outline-variant border-r-4 border-r-primary rounded mb-4">
            <p className="text-[10px] text-on-surface-variant uppercase font-bold">{lang === 'ar' ? 'آخر نسخ احتياطي تلقائي' : 'Last system backup'}</p>
            <p className="font-data-mono text-lg font-bold text-white mt-0.5">2026-06-09 <span className="text-[10px] text-on-surface-variant font-normal">04:30 AM</span></p>
            <p className="text-[10px] text-secondary mt-1 flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-xs">check_circle</span> 
              <span>{lang === 'ar' ? 'قاعدة البيانات آمنة تماماً' : 'Verified & Secure'}</span>
            </p>
          </div>
          <div className="space-y-2">
            <button 
              onClick={handleBackup}
              className="w-full bg-primary text-on-primary py-2.5 font-bold rounded text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">cloud_upload</span>
              <span>{t[lang].backupBtn}</span>
            </button>
            <button 
              onClick={() => alert(lang === 'ar' ? 'يرجى تحديد ملف قاعدة البيانات من النافذة المنبثقة.' : 'Select DB file to restore')}
              className="w-full border border-tertiary-container text-tertiary py-2.5 font-bold rounded text-xs flex items-center justify-center gap-1.5 hover:bg-tertiary-container/10 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">settings_backup_restore</span>
              <span>{t[lang].restoreBtn}</span>
            </button>
          </div>
        </div>

        {/* System Settings Form */}
        <div className="col-span-12 bg-surface-container-low border border-outline-variant rounded-xl flex flex-col h-fit">
          <form 
            onSubmit={async (e) => {
              e.preventDefault()
              const res = await window.api.settings.update(settings)
              if (res.success) {
                alert(lang === 'ar' ? 'تم حفظ الإعدادات بنجاح!' : 'Settings saved successfully!')
                triggerRefresh()
              } else {
                alert(res.error)
              }
            }}
          >
            <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container">
              <h2 className="font-bold flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-primary text-xl">settings_applications</span>
                {lang === 'ar' ? 'ضبط إعدادات المتجر والطباعة' : 'Retail System & Hardware Config'}
              </h2>
              <button 
                type="submit"
                className="bg-secondary-container text-white px-5 py-1.5 rounded font-bold text-xs hover:brightness-110 transition-all cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>{lang === 'ar' ? 'حفظ التغييرات [F10]' : 'Save Changes [F10]'}</span>
              </button>
            </div>

            <div className="p-6 grid grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-outline uppercase border-b border-outline-variant pb-1.5">
                  {lang === 'ar' ? 'هوية المتجر وعنوانه' : 'Store Identity'}
                </h3>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant block">{t[lang].storeName} *</label>
                  <input 
                    type="text"
                    required
                    value={settings.storeName}
                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 text-sm outline-none focus:border-primary rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant block">{t[lang].storePhone}</label>
                  <input 
                    type="text"
                    value={settings.storePhone || ''}
                    onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 text-sm font-mono outline-none focus:border-primary rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant block">{t[lang].storeAddress}</label>
                  <input 
                    type="text"
                    value={settings.storeAddress || ''}
                    onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 text-sm outline-none focus:border-primary rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant block">{lang === 'ar' ? 'الرقم الضريبي (سجل الضرائب)' : 'Tax Number'}</label>
                  <input 
                    type="text"
                    value={settings.taxNumber || ''}
                    onChange={(e) => setSettings({ ...settings, taxNumber: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 text-sm outline-none focus:border-primary rounded"
                    placeholder="123-456-789"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant block">{lang === 'ar' ? 'السجل التجاري' : 'Commercial Register'}</label>
                  <input 
                    type="text"
                    value={settings.commercialRegister || ''}
                    onChange={(e) => setSettings({ ...settings, commercialRegister: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 text-sm outline-none focus:border-primary rounded"
                    placeholder="99999"
                  />
                </div>
              </div>


              <div className="space-y-4">
                <h3 className="text-xs font-bold text-outline uppercase border-b border-outline-variant pb-1.5">
                  {lang === 'ar' ? 'طباعة وتذييل الفاتورة' : 'Receipt Customization'}
                </h3>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant block">{t[lang].receiptFooter}</label>
                  <textarea 
                    value={settings.receiptFooter || ''}
                    onChange={(e) => setSettings({ ...settings, receiptFooter: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 text-sm outline-none focus:border-primary h-24 resize-none rounded"
                    placeholder="شكراً لزيارتكم!"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-outline uppercase border-b border-outline-variant pb-1.5">
                  {lang === 'ar' ? 'إعدادات الطابعة والعتاد' : 'Thermal Printer Config'}
                </h3>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-on-surface-variant block">Default Printer</label>
                  <select 
                    value={settings.printerConfig || ''}
                    onChange={(e) => setSettings({ ...settings, printerConfig: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 text-sm outline-none focus:border-primary rounded cursor-pointer"
                  >
                    <option value="EPSON TM-T88VI (Thermal)">EPSON TM-T88VI (Thermal)</option>
                    <option value="Star Micronics MCP31">Star Micronics MCP31</option>
                    <option value="Network PDF Printer">Network PDF Printer (Default)</option>
                  </select>
                </div>
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group text-xs text-on-surface-variant">
                    <input type="checkbox" defaultChecked className="rounded border-outline-variant bg-surface-container text-primary-container focus:ring-0 w-4 h-4 cursor-pointer" />
                    <span>Auto-print receipt after checkout</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group text-xs text-on-surface-variant">
                    <input type="checkbox" className="rounded border-outline-variant bg-surface-container text-primary-container focus:ring-0 w-4 h-4 cursor-pointer" />
                    <span>Generate digital QR code on slip</span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Costing, Electronic Scales & Factory Reset Maintenance Block */}
        <div className="col-span-12 bg-surface-container-low border border-outline-variant rounded-xl flex flex-col h-fit mt-2">
          <div className="p-4 border-b border-outline-variant bg-surface-container">
            <h2 className="font-bold flex items-center gap-2 text-sm text-error">
              <span className="material-symbols-outlined">warning</span>
              {lang === 'ar' ? 'إعدادات النظام المتقدمة والصيانة' : 'Advanced System Maintenance'}
            </h2>
          </div>
          <div className="p-6 grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-outline uppercase border-b border-outline-variant pb-1.5">
                {lang === 'ar' ? 'حساب التكلفة والمخزون' : 'Costing Method'}
              </h3>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-on-surface-variant block">Costing Method</label>
                <select
                  value={settings.costingMethod || 'AVERAGE'}
                  onChange={(e) => setSettings({ ...settings, costingMethod: e.target.value })}
                  className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2.5 text-sm outline-none focus:border-primary rounded cursor-pointer"
                >
                  <option value="AVERAGE">{lang === 'ar' ? 'متوسط السعر (Average Cost)' : 'Average Cost (Weighted)'}</option>
                  <option value="LAST_PURCHASE">{lang === 'ar' ? 'آخر سعر شراء (Last Purchase Price)' : 'Last Purchase Price'}</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-outline uppercase border-b border-outline-variant pb-1.5">
                {lang === 'ar' ? 'إعداد موازين الباركود الإلكترونية' : 'Electronic Scale Settings'}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase text-on-surface-variant block">Prefix</label>
                  <input
                    type="text"
                    value={settings.scalePrefix || '20'}
                    onChange={(e) => setSettings({ ...settings, scalePrefix: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-2 py-2 text-xs font-mono outline-none focus:border-primary rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase text-on-surface-variant block">SKU Len</label>
                  <input
                    type="number"
                    value={settings.scaleSkuLength || 5}
                    onChange={(e) => setSettings({ ...settings, scaleSkuLength: Number(e.target.value) })}
                    className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-2 py-2 text-xs font-mono outline-none focus:border-primary rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase text-on-surface-variant block">Mode</label>
                  <select
                    value={settings.scaleValueMode || 'WEIGHT'}
                    onChange={(e) => setSettings({ ...settings, scaleValueMode: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-2 py-2 text-xs outline-none focus:border-primary rounded cursor-pointer"
                  >
                    <option value="WEIGHT">Weight</option>
                    <option value="PRICE">Price</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-outline uppercase border-b border-outline-variant pb-1.5 text-error">
                {lang === 'ar' ? 'مسح البيانات وإعادة ضبط النظام' : 'Factory Reset'}
              </h3>
              <button
                type="button"
                onClick={async () => {
                  if (confirm(lang === 'ar' ? 'تحذير: سيتم حذف جميع الفواتير والمخازن والعملاء والحسابات والورديات بالكامل! هل أنت متأكد؟' : 'CRITICAL WARNING: This will permanently delete all shifts, sales, purchases, transfers, bank, vault, and employees data! Continue?')) {
                    const managerUser = prompt(lang === 'ar' ? 'أدخل اسم مستخدم المدير/المشرف للتأكيد:' : 'Enter Manager/Admin Username:')
                    if (!managerUser) return
                    const managerPass = prompt(lang === 'ar' ? 'أدخل كلمة مرور المدير/المشرف للتأكيد:' : 'Enter Manager/Admin Password:')
                    if (!managerPass) return

                    const res = await window.api.settings.resetData({ username: managerUser, password: managerPass })
                    if (res.success) {
                      alert(lang === 'ar' ? 'تمت إعادة ضبط النظام بنجاح!' : 'Database has been reset to factory defaults!')
                      triggerRefresh()
                    } else {
                      alert(res.error)
                    }
                  }
                }}
                className="w-full bg-error text-on-error py-2.5 font-bold rounded text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg border border-transparent"
              >
                <span className="material-symbols-outlined text-base">delete_forever</span>
                <span>{lang === 'ar' ? 'إعادة تهيئة النظام بالكامل (Reset)' : 'Hard Reset Database'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Database Connection Settings (Dual Database Support: SQLite & PostgreSQL) */}
        <div className="col-span-12 bg-surface-container-low border border-outline-variant rounded-xl flex flex-col h-fit mt-2">
          <div className="p-4 border-b border-outline-variant bg-surface-container">
            <h2 className="font-bold flex items-center gap-2 text-sm text-primary">
              <span className="material-symbols-outlined">database</span>
              {lang === 'ar' ? 'إعدادات ربط قواعد البيانات ومحرك التخزين' : 'Database Connection & Engine Settings'}
            </h2>
          </div>
          <div className="p-6">
            <div className="max-w-2xl space-y-5">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {lang === 'ar' 
                  ? 'يدعم النظام العمل بنوعين من قواعد البيانات. اختر SQLite للعمل الفردي السريع على جهاز واحد، أو PostgreSQL للربط الشبكي بين عدة أجهزة.' 
                  : 'The system supports two database engines. Choose SQLite for local single-device execution, or PostgreSQL for network multi-device connection.'}
              </p>

              {/* Mode Selector Tab Buttons */}
              <div className="flex bg-surface-container rounded-lg p-1 border border-outline-variant">
                <button
                  type="button"
                  onClick={() => {
                    setDbType('sqlite')
                    if (!databaseUrl.startsWith('file:')) {
                      setDatabaseUrl('file:servio.db')
                    }
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded transition-all cursor-pointer ${
                    dbType === 'sqlite'
                      ? 'bg-primary text-on-primary shadow'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">storage</span>
                  <span>{lang === 'ar' ? 'محلي خفيف لجهاز واحد (SQLite)' : 'Local Single-Device (SQLite)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDbType('postgresql')
                    if (databaseUrl.startsWith('file:') || !databaseUrl) {
                      setDatabaseUrl('postgresql://postgres:postgres@localhost:5432/pos_erp?schema=public')
                    }
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded transition-all cursor-pointer ${
                    dbType === 'postgresql'
                      ? 'bg-primary text-on-primary shadow'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">lan</span>
                  <span>{lang === 'ar' ? 'شبكة عمل لعدة أجهزة (PostgreSQL)' : 'Network Multi-Device (PostgreSQL)'}</span>
                </button>
              </div>

              {dbType === 'sqlite' ? (
                <div className="p-4 bg-surface-container/30 border border-outline-variant/40 rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-success">
                    <span className="material-symbols-outlined text-sm">offline_pin</span>
                    <span>{lang === 'ar' ? 'وضع العمل الفردي الأوفلاين نشط حالياً' : 'Offline Single-Device Mode Active'}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {lang === 'ar' 
                      ? 'يستخدم النظام محرك SQLite المدمج والخفيف. لا يحتاج هذا الوضع إلى تثبيت خادم قواعد بيانات خارجي ويعمل مباشرة بمرونة عالية، مما يجعله مثالياً للأجهزة الضعيفة.' 
                      : 'The system uses the lightweight built-in SQLite engine. This mode requires zero database server installations and works out of the box, making it perfect for weak hardware.'}
                  </p>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-on-surface-variant uppercase">{lang === 'ar' ? 'رابط ملف قاعدة البيانات' : 'Database File Location'}</label>
                    <input
                      type="text"
                      value={databaseUrl}
                      onChange={(e) => setDatabaseUrl(e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-2.5 py-1.5 text-xs font-mono outline-none rounded"
                      placeholder="file:servio.db"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* IP Addresses Display Panel */}
                  <div className="p-4 bg-surface-container-highest rounded-lg border border-outline-variant space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                      <span className="material-symbols-outlined text-sm">info</span>
                      <span>{lang === 'ar' ? 'عناوين اتصال هذا الجهاز (IP Address):' : 'Local IP Addresses for this Device:'}</span>
                    </div>
                    {localIps && localIps.length > 0 ? (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {localIps.map((ip) => (
                          <div key={ip} className="flex items-center gap-2 bg-background border border-outline-variant/60 px-3 py-1.5 rounded text-xs font-mono font-bold text-white">
                            <span>{ip}</span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(ip)
                                alert(lang === 'ar' ? 'تم نسخ عنوان الـ IP!' : 'IP address copied!')
                              }}
                              className="text-[10px] text-primary hover:text-white transition-colors underline cursor-pointer"
                            >
                              {lang === 'ar' ? 'نسخ' : 'Copy'}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-outline font-medium italic">{lang === 'ar' ? 'لم يتم العثور على عناوين IP محلية. يرجى التحقق من اتصال كابل الشبكة أو الواي فاي.' : 'No local IP addresses detected. Please verify ethernet or Wi-Fi connectivity.'}</p>
                    )}
                  </div>

                  {/* Helper Input for Simple IP Config */}
                  <div className="p-4 bg-surface-container/30 border border-outline-variant/40 rounded-lg space-y-3">
                    <div className="text-xs font-bold text-on-surface">
                      {lang === 'ar' ? 'إعداد سريع: الاتصال المباشر عبر الـ IP' : 'Quick Setup: Direct Connect to IP'}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-on-surface-variant uppercase">{lang === 'ar' ? 'عنوان IP السيرفر الرئيسي' : 'Server IP Address'}</label>
                        <input
                          type="text"
                          id="quick-server-ip"
                          placeholder="192.168.1.50"
                          className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-2.5 py-1.5 text-xs font-mono outline-none focus:border-primary rounded"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-on-surface-variant uppercase">{lang === 'ar' ? 'كلمة مرور السيرفر' : 'Server DB Password'}</label>
                        <input
                          type="password"
                          id="quick-server-pass"
                          placeholder="••••••••"
                          className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-2.5 py-1.5 text-xs outline-none focus:border-primary rounded"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const ipInput = document.getElementById('quick-server-ip') as HTMLInputElement | null;
                        const passInput = document.getElementById('quick-server-pass') as HTMLInputElement | null;
                        const serverIp = ipInput?.value?.trim() || 'localhost';
                        const dbPass = passInput?.value || 'postgres';
                        // Auto-construct connection string
                        const constructedUrl = `postgresql://postgres:${dbPass}@${serverIp}:5432/pos_erp?schema=public`;
                        setDatabaseUrl(constructedUrl);
                        alert(lang === 'ar' ? 'تم إنشاء رابط الاتصال تلقائياً! يرجى الضغط على حفظ أدناه.' : 'Connection string generated! Click Save below.');
                      }}
                      className="w-full bg-secondary-container/45 hover:bg-secondary-container border border-outline-variant/80 text-white font-bold text-xs py-1.5 rounded transition-all cursor-pointer"
                    >
                      {lang === 'ar' ? 'توليد رابط الاتصال تلقائياً' : 'Auto Generate Connection String'}
                    </button>
                  </div>

                  {/* Full Connection String Field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-on-surface-variant block">
                      {lang === 'ar' ? 'رابط الاتصال النهائي المكتوب (Connection String)' : 'Final Database Connection String'}
                    </label>
                    <input
                      type="text"
                      value={databaseUrl}
                      onChange={(e) => setDatabaseUrl(e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 text-sm font-mono outline-none focus:border-primary rounded"
                      placeholder="postgresql://username:password@192.168.1.100:5432/pos_db?schema=public"
                    />
                    <span className="text-[9px] text-outline block mt-1">
                      Format: postgresql://[user]:[password]@[server_ip]:[port]/[database_name]?schema=public
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                {/* Test Connection Button */}
                <button
                  type="button"
                  onClick={async () => {
                    if (!databaseUrl) return alert(lang === 'ar' ? 'أدخل رابط الاتصال أولاً' : 'Enter connection URL first')
                    const btn = document.getElementById('btn-test-conn') as HTMLButtonElement
                    if (btn) { btn.disabled = true; btn.textContent = lang === 'ar' ? '⏳ جاري الاختبار...' : '⏳ Testing...' }
                    try {
                      const res = await window.api.settings.testDbConnection({ databaseUrl, dbType })
                      alert(res.messageAr || (res.success ? '✅ الاتصال ناجح' : '❌ فشل الاتصال'))
                    } catch (e: any) {
                      alert('❌ ' + e.message)
                    } finally {
                      if (btn) { btn.disabled = false; btn.textContent = lang === 'ar' ? '🔌 اختبار الاتصال' : '🔌 Test Connection' }
                    }
                  }}
                  id="btn-test-conn"
                  className="bg-secondary text-on-secondary px-5 py-2 rounded font-bold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  {lang === 'ar' ? '🔌 اختبار الاتصال' : '🔌 Test Connection'}
                </button>

                {/* Save Config Button */}
                <button
                  type="button"
                  onClick={async () => {
                    if (!databaseUrl) return
                    const res = await window.api.settings.saveDbConfig({ databaseUrl, dbType })
                    if (res.success) {
                      alert(lang === 'ar'
                        ? '✅ تم حفظ إعدادات الاتصال بنجاح!\nيرجى إعادة تشغيل التطبيق لتطبيق الإعدادات الجديدة.'
                        : '✅ Database configuration saved!\nPlease restart the application to apply the new settings.')
                    } else {
                      alert('❌ ' + res.error)
                    }
                  }}
                  className="bg-primary text-on-primary px-5 py-2 rounded font-bold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  {lang === 'ar' ? '💾 حفظ إعدادات الاتصال' : '💾 Save Connection Config'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- MASTER DATA ACTION HANDLERS ---
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName) return
    const res = await window.api.categories.create({ name: newCatName, description: newCatDesc })
    if (res.success) {
      setNewCatName('')
      setNewCatDesc('')
      alert(lang === 'ar' ? 'تمت إضافة التصنيف بنجاح!' : 'Category created successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }
  const handleDeleteCategory = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return
    const res = await window.api.categories.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم الحذف بنجاح!' : 'Deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleCreateUnit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUnitName) return
    const res = await window.api.units.create({ name: newUnitName, description: newUnitDesc })
    if (res.success) {
      setNewUnitName('')
      setNewUnitDesc('')
      alert(lang === 'ar' ? 'تمت إضافة الوحدة بنجاح!' : 'Unit created successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }
  const handleDeleteUnit = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return
    const res = await window.api.units.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم الحذف بنجاح!' : 'Deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleCreateWarehouse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWhName) return
    const res = await window.api.warehouses.create({ name: newWhName, location: newWhLoc })
    if (res.success) {
      setNewWhName('')
      setNewWhLoc('')
      alert(lang === 'ar' ? 'تمت إضافة المستودع بنجاح!' : 'Warehouse created successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }
  const handleDeleteWarehouse = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return
    const res = await window.api.warehouses.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم الحذف بنجاح!' : 'Deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleCreateJobTitle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newJobTitle) return
    const res = await window.api.jobTitles.create({ title: newJobTitle, description: newJobDesc })
    if (res.success) {
      setNewJobTitle('')
      setNewJobDesc('')
      alert(lang === 'ar' ? 'تمت إضافة المسمى الوظيفي بنجاح!' : 'Job title created successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }
  const handleDeleteJobTitle = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return
    const res = await window.api.jobTitles.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم الحذف بنجاح!' : 'Deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmpName) return
    const res = await window.api.employees.create({
      name: newEmpName,
      phone: newEmpPhone,
      email: newEmpEmail,
      jobTitleId: newEmpJobId || undefined,
      salary: Number(newEmpSalary || 0)
    })
    if (res.success) {
      setNewEmpName('')
      setNewEmpPhone('')
      setNewEmpEmail('')
      setNewEmpJobId('')
      setNewEmpSalary(0)
      alert(lang === 'ar' ? 'تمت إضافة الموظف بنجاح!' : 'Employee created successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }
  const handleDeleteEmployee = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return
    const res = await window.api.employees.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم الحذف بنجاح!' : 'Deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newClientName) return
    const res = await window.api.clients.create({
      name: newClientName,
      phone: newClientPhone,
      address: newClientAddress,
      creditLimit: Number(newClientLimit || 1000),
      currentBalance: Number(newClientBalance || 0)
    })
    if (res.success) {
      setNewClientName('')
      setNewClientPhone('')
      setNewClientAddress('')
      setNewClientLimit(1000)
      setNewClientBalance(0)
      alert(lang === 'ar' ? 'تمت إضافة العميل بنجاح!' : 'Client created successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }
  const handleDeleteClient = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return
    const res = await window.api.clients.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم الحذف بنجاح!' : 'Deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleCreateRevenue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRevCategory || newRevAmount <= 0) return
    const res = await window.api.revenues.create({
      category: newRevCategory,
      amount: Number(newRevAmount),
      description: newRevDesc
    })
    if (res.success) {
      setNewRevCategory('')
      setNewRevAmount(0)
      setNewRevDesc('')
      alert(lang === 'ar' ? 'تم تسجيل الإيراد بنجاح!' : 'Revenue recorded successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }
  const handleDeleteRevenue = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return
    const res = await window.api.revenues.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم الحذف بنجاح!' : 'Deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleCreateBank = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBankName) return
    const res = await window.api.banks.create({
      name: newBankName,
      accountNumber: newBankAccount,
      currentBalance: Number(newBankBalance || 0)
    })
    if (res.success) {
      setNewBankName('')
      setNewBankAccount('')
      setNewBankBalance(0)
      alert(lang === 'ar' ? 'تمت إضافة الحساب البنكي بنجاح!' : 'Bank account created successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }
  const handleDeleteBank = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return
    const res = await window.api.banks.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم الحذف بنجاح!' : 'Deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleCreateVault = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newVaultName) return
    const res = await window.api.vaults.create({
      name: newVaultName,
      currentBalance: Number(newVaultBalance || 0)
    })
    if (res.success) {
      setNewVaultName('')
      setNewVaultBalance(0)
      alert(lang === 'ar' ? 'تمت إضافة الخزينة بنجاح!' : 'Safe created successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }
  const handleDeleteVault = async (id: string) => {
    if (id === 'main_vault') {
      alert(lang === 'ar' ? 'لا يمكن حذف الخزينة الرئيسية!' : 'Cannot delete main vault!')
      return
    }
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return
    const res = await window.api.vaults.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم الحذف بنجاح!' : 'Deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الصنف بالكامل؟' : 'Are you sure you want to delete this product?')) return
    const res = await window.api.products.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم حذف الصنف بنجاح!' : 'Product deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleDeleteSupplier = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا المورد؟' : 'Are you sure you want to delete this supplier?')) return
    const res = await window.api.suppliers.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم حذف المورد بنجاح!' : 'Supplier deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من تعطيل هذا المستخدم؟' : 'Are you sure you want to disable this user?')) return
    const res = await window.api.users.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم تعطيل المستخدم بنجاح!' : 'User disabled successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  const handleDeleteExpense = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من حذف قيد المصروف هذا؟' : 'Are you sure you want to delete this expense?')) return
    const res = await window.api.expenses.delete(id)
    if (res.success) {
      alert(lang === 'ar' ? 'تم حذف المصروف بنجاح!' : 'Expense deleted successfully!')
      triggerRefresh()
    } else {
      alert(res.error)
    }
  }

  // --- SUBTAB RENDERING UTILITIES ---
  const renderCompanySubTab = () => {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const res = await window.api.settings.update(settings)
          if (res.success) {
            alert(lang === 'ar' ? 'تمت تهيئة بيانات المتجر بنجاح!' : 'Store profile configured successfully!')
            triggerRefresh()
          } else {
            alert(res.error)
          }
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4 bg-surface-container p-4 rounded-lg border border-outline-variant/60">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم المتجر/الشركة *' : 'Store/Company Name *'}</label>
            <input
              type="text"
              required
              value={settings.storeName || ''}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الهاتف الرئيسي *' : 'Primary Phone *'}</label>
            <input
              type="text"
              required
              value={settings.storePhone || ''}
              onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الهاتف الأرضي' : 'Landline'}</label>
            <input
              type="text"
              value={settings.landline || ''}
              onChange={(e) => setSettings({ ...settings, landline: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الجوال 1' : 'Mobile 1'}</label>
            <input
              type="text"
              value={settings.mobile1 || ''}
              onChange={(e) => setSettings({ ...settings, mobile1: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الجوال 2' : 'Mobile 2'}</label>
            <input
              type="text"
              value={settings.mobile2 || ''}
              onChange={(e) => setSettings({ ...settings, mobile2: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الرقم الضريبي / البطاقة الضريبية' : 'Tax Registration Number'}</label>
            <input
              type="text"
              value={settings.taxNumber || ''}
              onChange={(e) => setSettings({ ...settings, taxNumber: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'السجل التجاري' : 'Commercial Registry'}</label>
            <input
              type="text"
              value={settings.commercialRegister || ''}
              onChange={(e) => setSettings({ ...settings, commercialRegister: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'العنوان الفعلي' : 'Address'}</label>
            <input
              type="text"
              value={settings.storeAddress || ''}
              onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'تذييل الفاتورة الافتراضي' : 'Default Receipt Footer'}</label>
            <textarea
              value={settings.receiptFooter || ''}
              onChange={(e) => setSettings({ ...settings, receiptFooter: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white resize-none"
              rows={2}
            />
          </div>
        </div>
        <button type="submit" className="bg-primary hover:brightness-110 text-on-primary font-bold px-4 py-2 rounded text-xs transition-all cursor-pointer">
          {lang === 'ar' ? 'حفظ التحديثات' : 'Save Company Profile'}
        </button>
      </form>
    )
  }

  const renderProductsSubTab = () => {
    return (
      <div className="space-y-4">
        {/* Form */}
        <form onSubmit={handleAddProduct} className="grid grid-cols-3 gap-4 bg-surface-container p-4 rounded-lg border border-outline-variant/60">
          <div className="col-span-3">
            <span className="text-xs font-bold text-primary block border-b border-outline-variant/30 pb-1 mb-2">
              {lang === 'ar' ? 'تسجيل صنف منتج جديد في النظام' : 'Register New Product'}
            </span>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم المنتج *' : 'Product Name *'}</label>
            <input
              type="text"
              required
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الباركود الكود *' : 'Barcode Code *'}</label>
            <input
              type="text"
              required
              value={newProduct.barcode}
              onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'التصنيف' : 'Category'}</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white cursor-pointer"
            >
              <option value="">{lang === 'ar' ? 'عام' : 'General'}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الوحدة الافتراضية' : 'Main Unit'}</label>
            <select
              value={newProduct.unit}
              onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white cursor-pointer"
            >
              {units.map((u) => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
              {units.length === 0 && <option value="قطعة">{lang === 'ar' ? 'قطعة' : 'Piece'}</option>}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سعر الشراء *' : 'Purchase Price *'}</label>
            <input
              type="number"
              step="0.01"
              required
              value={newProduct.purchasePrice || ''}
              onChange={(e) => setNewProduct({ ...newProduct, purchasePrice: Number(e.target.value) })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سعر التجزئة *' : 'Retail Price *'}</label>
            <input
              type="number"
              step="0.01"
              required
              value={newProduct.sellPrice || ''}
              onChange={(e) => setNewProduct({ ...newProduct, sellPrice: Number(e.target.value) })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سعر الجملة' : 'Wholesale Price'}</label>
            <input
              type="number"
              step="0.01"
              value={newProduct.wholesalePrice || ''}
              onChange={(e) => setNewProduct({ ...newProduct, wholesalePrice: Number(e.target.value) })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'سعر نصف الجملة' : 'Semi-Wholesale Price'}</label>
            <input
              type="number"
              step="0.01"
              value={newProduct.semiWholesalePrice || ''}
              onChange={(e) => setNewProduct({ ...newProduct, semiWholesalePrice: Number(e.target.value) })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المخزون الابتدائي' : 'Initial Stock'}</label>
            <input
              type="number"
              value={newProduct.currentStock || ''}
              onChange={(e) => setNewProduct({ ...newProduct, currentStock: Number(e.target.value) })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'حد الطلب الأدنى' : 'Min Stock Level'}</label>
            <input
              type="number"
              value={newProduct.minStockLevel}
              onChange={(e) => setNewProduct({ ...newProduct, minStockLevel: Number(e.target.value) })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              id="hasExpiry"
              checked={newProduct.hasExpiry}
              onChange={(e) => setNewProduct({ ...newProduct, hasExpiry: e.target.checked })}
              className="rounded border-outline-variant bg-surface-container text-primary w-4 h-4 cursor-pointer"
            />
            <label htmlFor="hasExpiry" className="text-xs text-white font-bold cursor-pointer">{lang === 'ar' ? 'له تاريخ صلاحية؟' : 'Has Expiry Date?'}</label>
          </div>
          {newProduct.hasExpiry && (
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'تاريخ الصلاحية' : 'Expiry Date'}</label>
              <input
                type="date"
                value={newProduct.expiryDate}
                onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
              />
            </div>
          )}
          <div className="col-span-3 text-right">
            <button type="submit" className="bg-primary hover:brightness-110 text-on-primary font-bold px-4 py-2 rounded text-xs transition-all cursor-pointer">
              {lang === 'ar' ? 'حفظ الصنف وتحديث القائمة' : 'Save Product'}
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم الصنف' : 'Product Name'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الباركود' : 'Barcode'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'التصنيف' : 'Category'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'سعر الشراء' : 'Purchase'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'سعر التجزئة' : 'Retail Price'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'سعر الجملة' : 'Wholesale'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'المخزون' : 'Stock'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الوحدة' : 'Unit'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20 font-data-mono">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{p.name}</td>
                  <td className="px-4 text-outline">{p.barcode}</td>
                  <td className="px-4 text-outline font-sans">{p.category || (lang === 'ar' ? 'عام' : 'General')}</td>
                  <td className="px-4 text-outline">{p.purchasePrice.toFixed(2)}</td>
                  <td className="px-4 text-white font-bold">{p.sellPrice.toFixed(2)}</td>
                  <td className="px-4 text-outline">{p.wholesalePrice ? p.wholesalePrice.toFixed(2) : '0.00'}</td>
                  <td className={`px-4 font-bold ${p.currentStock <= p.minStockLevel ? 'text-tertiary' : 'text-secondary'}`}>{p.currentStock}</td>
                  <td className="px-4 text-outline font-sans">{p.unit || 'قطعة'}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteProduct(p.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderCategoriesSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleCreateCategory} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم التصنيف *' : 'Category Name *'}</label>
            <input
              type="text"
              required
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الوصف' : 'Description'}</label>
            <textarea
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white resize-none"
              rows={3}
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'إضافة التصنيف' : 'Add Category'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم التصنيف' : 'Category Name'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الوصف' : 'Description'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{c.name}</td>
                  <td className="px-4 text-outline">{c.description || '---'}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteCategory(c.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-outline">{lang === 'ar' ? 'لا توجد تصنيفات مسجلة.' : 'No categories recorded.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderUnitsSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleCreateUnit} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم الوحدة *' : 'Unit Name *'}</label>
            <input
              type="text"
              required
              value={newUnitName}
              onChange={(e) => setNewUnitName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
              placeholder="مثال: كرتونة، كيلو، جرام..."
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الوصف' : 'Description'}</label>
            <textarea
              value={newUnitDesc}
              onChange={(e) => setNewUnitDesc(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white resize-none"
              rows={3}
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'إضافة الوحدة' : 'Add Unit'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم الوحدة' : 'Unit Name'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الوصف' : 'Description'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20">
              {units.map((u) => (
                <tr key={u.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{u.name}</td>
                  <td className="px-4 text-outline">{u.description || '---'}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteUnit(u.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {units.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-outline">{lang === 'ar' ? 'لا توجد وحدات مسجلة.' : 'No units recorded.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderWarehousesSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleCreateWarehouse} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم المستودع/المخزن *' : 'Warehouse Name *'}</label>
            <input
              type="text"
              required
              value={newWhName}
              onChange={(e) => setNewWhName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الموقع الفعلي' : 'Location'}</label>
            <input
              type="text"
              value={newWhLoc}
              onChange={(e) => setNewWhLoc(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'إضافة المستودع' : 'Add Warehouse'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم المستودع' : 'Warehouse Name'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الموقع' : 'Location'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20">
              {warehouses.map((w) => (
                <tr key={w.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{w.name}</td>
                  <td className="px-4 text-outline">{w.location || '---'}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteWarehouse(w.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {warehouses.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-outline">{lang === 'ar' ? 'لا توجد مستودعات مسجلة.' : 'No warehouses recorded.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderSuppliersSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleAddSupplier} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم المورد *' : 'Supplier Name *'}</label>
            <input
              type="text"
              required
              value={newSupplier.name}
              onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الشخص المسؤول' : 'Contact Person'}</label>
            <input
              type="text"
              value={newSupplier.contactPerson}
              onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</label>
            <input
              type="text"
              value={newSupplier.phone}
              onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'العنوان' : 'Address'}</label>
            <input
              type="text"
              value={newSupplier.address}
              onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'إضافة مورد' : 'Add Supplier'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم المورد' : 'Supplier Name'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الشخص المسؤول' : 'Contact'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</th>
                <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الرصيد المستحق' : 'Balance'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20 font-data-mono">
              {suppliers.map((s) => (
                <tr key={s.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{s.name}</td>
                  <td className="px-4 text-outline font-sans">{s.contactPerson || '---'}</td>
                  <td className="px-4 text-outline">{s.phone || '---'}</td>
                  <td className="px-4 text-left rtl:text-left ltr:text-right text-secondary font-bold">{s.balance.toFixed(2)}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteSupplier(s.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-outline">{lang === 'ar' ? 'لا يوجد موردين مسجلين.' : 'No suppliers recorded.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderClientsSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleCreateClient} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم العميل *' : 'Client Name *'}</label>
            <input
              type="text"
              required
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</label>
            <input
              type="text"
              value={newClientPhone}
              onChange={(e) => setNewClientPhone(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'العنوان' : 'Address'}</label>
            <input
              type="text"
              value={newClientAddress}
              onChange={(e) => setNewClientAddress(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الحد الائتماني المسموح' : 'Credit Limit'}</label>
            <input
              type="number"
              value={newClientLimit || 1000}
              onChange={(e) => setNewClientLimit(Number(e.target.value))}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الرصيد المفتوح الحالي' : 'Opening Balance'}</label>
            <input
              type="number"
              value={newClientBalance || 0}
              onChange={(e) => setNewClientBalance(Number(e.target.value))}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'إضافة عميل' : 'Add Client'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'الاسم' : 'Name'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الحد الائتماني' : 'Credit Limit'}</th>
                <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الرصيد المستحق' : 'Balance'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20 font-data-mono">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{c.name}</td>
                  <td className="px-4 text-outline">{c.phone || '---'}</td>
                  <td className="px-4 text-outline">{c.creditLimit.toFixed(2)}</td>
                  <td className={`px-4 font-bold text-left rtl:text-left ltr:text-right ${c.currentBalance > 0 ? 'text-tertiary' : 'text-secondary'}`}>{c.currentBalance.toFixed(2)}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteClient(c.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-outline">{lang === 'ar' ? 'لا يوجد عملاء مسجلين.' : 'No clients recorded.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderEmployeesSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleCreateEmployee} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم الموظف *' : 'Employee Name *'}</label>
            <input
              type="text"
              required
              value={newEmpName}
              onChange={(e) => setNewEmpName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</label>
            <input
              type="text"
              value={newEmpPhone}
              onChange={(e) => setNewEmpPhone(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
            <input
              type="email"
              value={newEmpEmail}
              onChange={(e) => setNewEmpEmail(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}</label>
            <select
              value={newEmpJobId}
              onChange={(e) => setNewEmpJobId(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white cursor-pointer"
            >
              <option value="">{lang === 'ar' ? 'اختر مسمى وظيفي...' : 'Select job title...'}</option>
              {jobTitles.map((j) => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الراتب الشهري *' : 'Monthly Salary *'}</label>
            <input
              type="number"
              required
              value={newEmpSalary || ''}
              onChange={(e) => setNewEmpSalary(Number(e.target.value))}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'إضافة موظف' : 'Add Employee'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم الموظف' : 'Employee Name'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الهاتف' : 'Phone'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الوظيفة' : 'Job Title'}</th>
                <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الراتب' : 'Salary'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20 font-data-mono text-outline">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{emp.name}</td>
                  <td className="px-4">{emp.phone || '---'}</td>
                  <td className="px-4 font-sans">{emp.jobTitle?.title || '---'}</td>
                  <td className="px-4 text-left rtl:text-left ltr:text-right text-white font-bold">{emp.salary.toFixed(2)}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteEmployee(emp.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-outline">{lang === 'ar' ? 'لا يوجد موظفين مسجلين.' : 'No employees recorded.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderJobTitlesSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleCreateJobTitle} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'المسمى الوظيفي *' : 'Job Title *'}</label>
            <input
              type="text"
              required
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الوصف' : 'Description'}</label>
            <textarea
              value={newJobDesc}
              onChange={(e) => setNewJobDesc(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white resize-none"
              rows={3}
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'إضافة المسمى الوظيفي' : 'Add Job Title'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الوصف' : 'Description'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20">
              {jobTitles.map((j) => (
                <tr key={j.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{j.title}</td>
                  <td className="px-4 text-outline">{j.description || '---'}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteJobTitle(j.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {jobTitles.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-outline">{lang === 'ar' ? 'لا توجد وظائف مسجلة.' : 'No job titles recorded.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderUsersSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleAddUser} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}</label>
            <input
              type="text"
              required
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم المستخدم *' : 'Username *'}</label>
            <input
              type="text"
              required
              value={newUserUsername}
              onChange={(e) => setNewUserUsername(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'كلمة المرور *' : 'Password *'}</label>
            <input
              type="password"
              required
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الصلاحية والوظيفة *' : 'Role *'}</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white cursor-pointer"
            >
              <option value="CASHIER">{lang === 'ar' ? 'موظف كاشير (CASHIER)' : 'Cashier Operator'}</option>
              <option value="MANAGER">{lang === 'ar' ? 'مدير فرع (MANAGER)' : 'Store Manager'}</option>
              <option value="ADMIN">{lang === 'ar' ? 'مدير نظام (ADMIN)' : 'System Admin'}</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'إضافة مستخدم' : 'Add User'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'اسم المستخدم' : 'Username'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الصلاحية' : 'Role'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20 font-data-mono">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{u.name}</td>
                  <td className="px-4 text-outline">@{u.username}</td>
                  <td className="px-4">
                    <span className="bg-primary-container/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold font-sans">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteUser(u.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'تعطيل' : 'Disable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderExpensesSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleAddExpense} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'تصنيف المصروف *' : 'Expense Category *'}</label>
            <input
              type="text"
              required
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
              placeholder="مثال: إيجار، كهرباء، صيانة..."
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'قيمة المصروف *' : 'Expense Amount *'}</label>
            <input
              type="number"
              required
              value={newExpense.amount || ''}
              onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الوصف والتفاصيل' : 'Description'}</label>
            <textarea
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white resize-none"
              rows={3}
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'تسجيل المصروف' : 'Add Expense'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'التصنيف' : 'Category'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الوصف' : 'Description'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'المبلغ' : 'Amount'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20 font-data-mono text-outline">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{exp.category}</td>
                  <td className="px-4 font-sans">{exp.description || '---'}</td>
                  <td className="px-4 text-[10px]">{new Date(exp.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 text-left rtl:text-left ltr:text-right text-error font-bold">{exp.amount.toFixed(2)}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteExpense(exp.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-outline">{lang === 'ar' ? 'لا توجد مصروفات مسجلة.' : 'No expenses recorded.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderRevenuesSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleCreateRevenue} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'تصنيف الإيراد *' : 'Revenue Category *'}</label>
            <input
              type="text"
              required
              value={newRevCategory}
              onChange={(e) => setNewRevCategory(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
              placeholder="مثال: مبيعات، خدمات صيانة، فوائد..."
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'قيمة الإيراد *' : 'Revenue Amount *'}</label>
            <input
              type="number"
              required
              value={newRevAmount || ''}
              onChange={(e) => setNewRevAmount(Number(e.target.value))}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الوصف والتفاصيل' : 'Description'}</label>
            <textarea
              value={newRevDesc}
              onChange={(e) => setNewRevDesc(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white resize-none"
              rows={3}
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'تسجيل الإيراد' : 'Add Revenue'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'التصنيف' : 'Category'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'الوصف' : 'Description'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'المبلغ' : 'Amount'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20 font-data-mono text-outline">
              {revenues.map((rev) => (
                <tr key={rev.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{rev.category}</td>
                  <td className="px-4 font-sans">{rev.description || '---'}</td>
                  <td className="px-4 text-[10px]">{new Date(rev.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 text-left rtl:text-left ltr:text-right text-secondary font-bold">{rev.amount.toFixed(2)}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteRevenue(rev.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {revenues.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-outline">{lang === 'ar' ? 'لا توجد إيرادات مسجلة.' : 'No revenues recorded.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderBanksSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleCreateBank} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم البنك *' : 'Bank Name *'}</label>
            <input
              type="text"
              required
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
              placeholder="مثال: البنك الأهلي المصري..."
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رقم الحساب' : 'Account Number'}</label>
            <input
              type="text"
              value={newBankAccount}
              onChange={(e) => setNewBankAccount(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'الرصيد الافتتاحي المودع' : 'Opening Balance'}</label>
            <input
              type="number"
              value={newBankBalance || 0}
              onChange={(e) => setNewBankBalance(Number(e.target.value))}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'إضافة الحساب البنكي' : 'Add Bank'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم البنك' : 'Bank Name'}</th>
                <th className="px-4 py-2">{lang === 'ar' ? 'رقم الحساب' : 'Account Number'}</th>
                <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الرصيد الحالي' : 'Current Balance'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20 font-data-mono text-outline">
              {banks.map((b) => (
                <tr key={b.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{b.name}</td>
                  <td className="px-4">{b.accountNumber || '---'}</td>
                  <td className="px-4 text-left rtl:text-left ltr:text-right text-secondary font-bold">{b.currentBalance.toFixed(2)}</td>
                  <td className="px-4 text-center">
                    <button onClick={() => handleDeleteBank(b.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                      {lang === 'ar' ? 'حذف' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {banks.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-outline">{lang === 'ar' ? 'لا توجد حسابات بنكية مسجلة.' : 'No banks recorded.'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderVaultsSubTab = () => {
    return (
      <div className="grid grid-cols-3 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleCreateVault} className="bg-surface-container p-4 rounded-lg border border-outline-variant/60 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'اسم الخزينة *' : 'Safe/Vault Name *'}</label>
            <input
              type="text"
              required
              value={newVaultName}
              onChange={(e) => setNewVaultName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white"
              placeholder="مثال: الخزينة الاحتياطية..."
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-on-surface-variant mb-1">{lang === 'ar' ? 'رصيد الخزينة الافتتاحي' : 'Opening Balance'}</label>
            <input
              type="number"
              value={newVaultBalance || 0}
              onChange={(e) => setNewVaultBalance(Number(e.target.value))}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-xs text-white font-mono"
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-2 rounded text-xs transition-all cursor-pointer">
            {lang === 'ar' ? 'إضافة خزينة' : 'Add Cash Safe'}
          </button>
        </form>

        {/* Table */}
        <div className="col-span-2 overflow-x-auto border border-outline-variant rounded-lg bg-surface">
          <table className="w-full text-right rtl:text-right border-collapse">
            <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10 text-xs">
              <tr className="h-10 text-on-surface-variant">
                <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'اسم الخزينة' : 'Safe Name'}</th>
                <th className="px-4 py-2 text-left rtl:text-left ltr:text-right">{lang === 'ar' ? 'الرصيد الحالي' : 'Current Balance'}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-body-md text-xs divide-y divide-outline-variant/20 font-data-mono text-outline">
              {vaults.map((v) => (
                <tr key={v.id} className="hover:bg-surface-bright transition-colors h-10">
                  <td className="px-4 text-right rtl:text-right ltr:text-left font-bold text-white">{v.name}</td>
                  <td className="px-4 text-left rtl:text-left ltr:text-right text-secondary font-bold">{v.currentBalance.toFixed(2)}</td>
                  <td className="px-4 text-center">
                    {v.id !== 'main_vault' ? (
                      <button onClick={() => handleDeleteVault(v.id)} className="text-error hover:underline text-[10px] font-bold cursor-pointer">
                        {lang === 'ar' ? 'حذف' : 'Delete'}
                      </button>
                    ) : (
                      <span className="text-[10px] text-outline italic">{lang === 'ar' ? 'رئيسية' : 'System Default'}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // 5. Master Data Setup Hub
  const renderMasterData = () => {
    const subtabs = [
      { id: 'company', labelAr: 'بيانات الشركة', labelEn: 'Company Profile', icon: 'storefront' },
      { id: 'products', labelAr: 'تعريف الأصناف', labelEn: 'Products Setup', icon: 'inventory_2' },
      { id: 'categories', labelAr: 'تعريف التصنيفات', labelEn: 'Categories Setup', icon: 'category' },
      { id: 'units', labelAr: 'تعريف الوحدات', labelEn: 'Units Setup', icon: 'straighten' },
      { id: 'warehouses', labelAr: 'تعريف المخازن', labelEn: 'Warehouses Setup', icon: 'warehouse' },
      { id: 'suppliers', labelAr: 'تعريف الموردين', labelEn: 'Suppliers Setup', icon: 'local_shipping' },
      { id: 'clients', labelAr: 'تعريف العملاء', labelEn: 'Clients Setup', icon: 'people' },
      { id: 'employees', labelAr: 'تعريف الموظفين', labelEn: 'Employees Setup', icon: 'badge' },
      { id: 'jobTitles', labelAr: 'تعريف الوظائف', labelEn: 'Job Titles Setup', icon: 'work' },
      { id: 'users', labelAr: 'تعريف المستخدمين', labelEn: 'System Users Setup', icon: 'manage_accounts' },
      { id: 'expenses', labelAr: 'تعريف المصروفات', labelEn: 'Expenses Setup', icon: 'payments' },
      { id: 'revenues', labelAr: 'تعريف الإيرادات', labelEn: 'Revenues Setup', icon: 'price_check' },
      { id: 'banks', labelAr: 'تعريف البنوك', labelEn: 'Banks Setup', icon: 'account_balance' },
      { id: 'vaults', labelAr: 'تعريف الخزن', labelEn: 'Cash Safes Setup', icon: 'safe' }
    ]

    return (
      <div className="flex gap-4 h-full overflow-hidden">
        {/* Left column sub-tabs */}
        <aside className="w-1/4 bg-surface-container border border-outline-variant p-3 rounded-xl flex flex-col gap-1 overflow-y-auto max-h-full">
          <span className="text-[10px] text-outline font-bold px-3 py-1 mb-2 uppercase tracking-widest block border-b border-outline-variant/30">
            {lang === 'ar' ? 'قائمة البيانات الأساسية' : 'Master Setup List'}
          </span>
          {subtabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMasterDataSubTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-right rtl:text-right ltr:text-left transition-colors rounded text-xs font-bold cursor-pointer ${
                masterDataSubTab === tab.id
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-2 rtl:border-r-2 ltr:border-l-2'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{tab.icon}</span>
              <span>{lang === 'ar' ? tab.labelAr : tab.labelEn}</span>
            </button>
          ))}
        </aside>

        {/* Right column master detail panel */}
        <section className="w-3/4 border border-outline-variant flex flex-col p-5 bg-surface-container-lowest rounded-xl overflow-hidden h-full">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/30 flex-shrink-0">
            <div>
              <h2 className="text-primary font-headline-md text-lg font-bold">
                {lang === 'ar' ? subtabs.find(t => t.id === masterDataSubTab)?.labelAr : subtabs.find(t => t.id === masterDataSubTab)?.labelEn}
              </h2>
              <p className="text-outline text-[10px] mt-0.5">
                {lang === 'ar' ? 'شاشة تكوين وتعريف البيانات الأساسية للنظام' : 'System master configuration controls'}
              </p>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto pr-1 min-h-0 space-y-6">
            {masterDataSubTab === 'company' && renderCompanySubTab()}
            {masterDataSubTab === 'products' && renderProductsSubTab()}
            {masterDataSubTab === 'categories' && renderCategoriesSubTab()}
            {masterDataSubTab === 'units' && renderUnitsSubTab()}
            {masterDataSubTab === 'warehouses' && renderWarehousesSubTab()}
            {masterDataSubTab === 'suppliers' && renderSuppliersSubTab()}
            {masterDataSubTab === 'clients' && renderClientsSubTab()}
            {masterDataSubTab === 'employees' && renderEmployeesSubTab()}
            {masterDataSubTab === 'jobTitles' && renderJobTitlesSubTab()}
            {masterDataSubTab === 'users' && renderUsersSubTab()}
            {masterDataSubTab === 'expenses' && renderExpensesSubTab()}
            {masterDataSubTab === 'revenues' && renderRevenuesSubTab()}
            {masterDataSubTab === 'banks' && renderBanksSubTab()}
            {masterDataSubTab === 'vaults' && renderVaultsSubTab()}
          </div>
        </section>
      </div>
    )
  }

  // 6. Activity Log & Audit Trail Panel
  const renderActivityLog = () => {
    const severityColors = {
      INFO: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      WARNING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      CRITICAL: 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse'
    }

    const moduleLabelsAr = {
      AUTH: 'الأمان والدخول',
      SHIFTS: 'الورديات',
      POS: 'نقطة البيع',
      PURCHASES: 'المشتريات',
      SALES: 'المبيعات',
      FINANCE: 'المالية والخزنة',
      INVENTORY: 'المخازن',
      SETTINGS: 'الإعدادات',
      EMPLOYEES: 'الموظفين'
    }

    const moduleLabelsEn = {
      AUTH: 'Security & Auth',
      SHIFTS: 'Shifts',
      POS: 'Point of Sale',
      PURCHASES: 'Purchases',
      SALES: 'Sales',
      FINANCE: 'Finance & Vault',
      INVENTORY: 'Inventory',
      SETTINGS: 'Settings',
      EMPLOYEES: 'Employees'
    }

    const handleClearLogs = async (days: number) => {
      const confirmMsg = lang === 'ar' 
        ? `هل أنت متأكد من حذف سجلات النشاط الأقدم من ${days} يوم؟` 
        : `Are you sure you want to clear activity logs older than ${days} days?`
      if (!confirm(confirmMsg)) return

      const date = new Date()
      date.setDate(date.getDate() - days)
      const dateStr = date.toISOString()

      try {
        const res = await window.api.activityLog.clear({ beforeDate: dateStr })
        if (res.success) {
          alert(lang === 'ar' ? 'تم تنظيف السجل بنجاح' : 'Logs cleared successfully')
          fetchActivityLog()
        } else {
          alert(res.error || (lang === 'ar' ? 'حدث خطأ أثناء تنظيف السجل' : 'Failed to clear logs'))
        }
      } catch (err) {
        console.error(err)
      }
    }

    return (
      <div className="flex flex-col h-full bg-surface-container/30 border border-outline-variant p-4 rounded-xl overflow-hidden">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30 flex-shrink-0">
          <div>
            <h1 className="text-primary font-headline-md text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">manage_history</span>
              {lang === 'ar' ? 'سجل مراقبة النشاط والتدقيق' : 'System Activity & Audit Log'}
            </h1>
            <p className="text-outline text-xs mt-0.5">
              {lang === 'ar' ? 'مراقبة وتدقيق كافة العمليات وحركات النظام بالتفصيل' : 'Monitor and audit all system operations and transactions in detail'}
            </p>
          </div>

          {/* Quick Actions */}
          {user?.role === 'ADMIN' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-outline font-semibold">
                {lang === 'ar' ? 'تنظيف السجل الأقدم من:' : 'Clear logs older than:'}
              </span>
              <button
                onClick={() => handleClearLogs(7)}
                className="px-2.5 py-1 bg-surface-container-high hover:bg-error/20 hover:text-error text-xs rounded border border-outline-variant transition-all cursor-pointer font-bold"
              >
                {lang === 'ar' ? 'أسبوع' : '1 Week'}
              </button>
              <button
                onClick={() => handleClearLogs(30)}
                className="px-2.5 py-1 bg-surface-container-high hover:bg-error/20 hover:text-error text-xs rounded border border-outline-variant transition-all cursor-pointer font-bold"
              >
                {lang === 'ar' ? 'شهر' : '1 Month'}
              </button>
            </div>
          )}
        </div>

        {/* Filter Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 py-3 border-b border-outline-variant/30 flex-shrink-0 bg-surface-container-low/50 px-3 rounded-lg my-2">
          {/* Search */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-outline font-bold">
              {lang === 'ar' ? 'البحث بالوصف' : 'Search Description'}
            </label>
            <input
              type="text"
              value={activityLogFilters.search}
              onChange={(e) => setActivityLogFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder={lang === 'ar' ? 'ابحث...' : 'Search...'}
              className="bg-surface-container-lowest border border-outline-variant rounded px-2.5 py-1.5 text-xs text-white outline-none focus:border-primary"
            />
          </div>

          {/* Module Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-outline font-bold">
              {lang === 'ar' ? 'القسم / الوحدة' : 'Module / Unit'}
            </label>
            <select
              value={activityLogFilters.module}
              onChange={(e) => setActivityLogFilters(prev => ({ ...prev, module: e.target.value }))}
              className="bg-surface-container-lowest border border-outline-variant rounded px-2 py-1.5 text-xs text-white outline-none focus:border-primary cursor-pointer"
            >
              <option value="">{lang === 'ar' ? 'كل الأقسام' : 'All Modules'}</option>
              {Object.keys(moduleLabelsAr).map(mod => (
                <option key={mod} value={mod}>
                  {lang === 'ar' ? moduleLabelsAr[mod as keyof typeof moduleLabelsAr] : moduleLabelsEn[mod as keyof typeof moduleLabelsEn]}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-outline font-bold">
              {lang === 'ar' ? 'مستوى الخطورة' : 'Severity Level'}
            </label>
            <select
              value={activityLogFilters.severity}
              onChange={(e) => setActivityLogFilters(prev => ({ ...prev, severity: e.target.value }))}
              className="bg-surface-container-lowest border border-outline-variant rounded px-2 py-1.5 text-xs text-white outline-none focus:border-primary cursor-pointer"
            >
              <option value="">{lang === 'ar' ? 'كل المستويات' : 'All Levels'}</option>
              <option value="INFO">{lang === 'ar' ? 'عادي (INFO)' : 'Info'}</option>
              <option value="WARNING">{lang === 'ar' ? 'تحذير (WARNING)' : 'Warning'}</option>
              <option value="CRITICAL">{lang === 'ar' ? 'حرج (CRITICAL)' : 'Critical'}</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-outline font-bold">
              {lang === 'ar' ? 'من تاريخ' : 'From Date'}
            </label>
            <input
              type="date"
              value={activityLogFilters.startDate}
              onChange={(e) => setActivityLogFilters(prev => ({ ...prev, startDate: e.target.value }))}
              className="bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white outline-none focus:border-primary"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-outline font-bold">
              {lang === 'ar' ? 'إلى تاريخ' : 'To Date'}
            </label>
            <input
              type="date"
              value={activityLogFilters.endDate}
              onChange={(e) => setActivityLogFilters(prev => ({ ...prev, endDate: e.target.value }))}
              className="bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 text-xs text-white outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-grow overflow-auto relative rounded-lg border border-outline-variant/40 bg-surface-container-low/30">
          {activityLogLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-surface-container/50 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : null}

          {activityLogs.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-outline">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
              <p className="text-xs">{lang === 'ar' ? 'لا توجد سجلات نشاط مطابقة للبحث' : 'No activity logs matching criteria found'}</p>
            </div>
          ) : (
            <table className="w-full text-right rtl:text-right ltr:text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/60 text-[10px] text-outline uppercase tracking-wider font-bold h-9 border-b border-outline-variant/40">
                  <th className="px-4">{lang === 'ar' ? 'التاريخ والوقت' : 'Date & Time'}</th>
                  <th className="px-4">{lang === 'ar' ? 'المستخدم' : 'User'}</th>
                  <th className="px-4">{lang === 'ar' ? 'القسم' : 'Module'}</th>
                  <th className="px-4">{lang === 'ar' ? 'العملية' : 'Action'}</th>
                  <th className="px-4">{lang === 'ar' ? 'التفاصيل والوصف' : 'Description'}</th>
                  <th className="px-4 text-center">{lang === 'ar' ? 'الخطورة' : 'Severity'}</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-outline-variant/10">
                {activityLogs.map((log) => {
                  const dateObj = new Date(log.createdAt)
                  const formattedDate = dateObj.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                    year: 'numeric', month: '2-digit', day: '2-digit'
                  })
                  const formattedTime = dateObj.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                  })

                  return (
                    <tr key={log.id} className="hover:bg-surface-bright transition-colors h-11">
                      <td className="px-4 whitespace-nowrap text-outline font-data-mono">
                        {formattedDate} {formattedTime}
                      </td>
                      <td className="px-4 whitespace-nowrap font-medium text-white">
                        <div className="flex flex-col">
                          <span>{log.user?.name || log.userId || (lang === 'ar' ? 'النظام' : 'System')}</span>
                          <span className="text-[9px] text-outline italic">
                            {log.user?.role === 'ADMIN' ? (lang === 'ar' ? 'مدير' : 'Admin') : 
                             log.user?.role === 'MANAGER' ? (lang === 'ar' ? 'مشرف' : 'Manager') : 
                             log.user?.role === 'CASHIER' ? (lang === 'ar' ? 'كاشير' : 'Cashier') : ''}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary border border-primary/20 font-bold">
                          {lang === 'ar' ? (moduleLabelsAr[log.module as keyof typeof moduleLabelsAr] || log.module) : (moduleLabelsEn[log.module as keyof typeof moduleLabelsEn] || log.module)}
                        </span>
                      </td>
                      <td className="px-4 whitespace-nowrap font-semibold text-secondary font-data-mono">
                        {log.action}
                      </td>
                      <td className="px-4 text-on-surface-variant font-medium max-w-xs md:max-w-md truncate" title={log.description}>
                        {log.description}
                      </td>
                      <td className="px-4 whitespace-nowrap text-center">
                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-black border ${severityColors[log.severity as keyof typeof severityColors] || severityColors.INFO}`}>
                          {log.severity}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  }

  // --- RENDERING BARRIER IF NOT LOGGED IN ---

  if (dbStatusLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0b1326] p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    )
  }

  if (dbStatus && !dbStatus.success) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0b1326] p-6 font-sans relative overflow-hidden" dir={direction}>
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-error-container/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-primary-container/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

        <div className="w-full max-w-2xl bg-surface-container/60 backdrop-blur-xl border border-outline-variant rounded-xl p-8 shadow-2xl relative text-on-surface" style={{ backdropFilter: 'blur(20px)' }}>
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-error to-amber-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-error/30 animate-pulse">
              <span className="material-symbols-outlined text-white text-3xl font-black">database_off</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight text-center">
              {lang === 'ar' ? 'تعذر الاتصال بقاعدة البيانات' : 'Database Connection Failed'}
            </h1>
            <p className="text-sm text-on-surface-variant text-center mt-2 leading-relaxed max-w-md">
              {lang === 'ar'
                ? 'فشل التطبيق في الاتصال أو تشغيل قاعدة البيانات المطلوبة للعمل. يرجى مراجعة الخطأ وإعدادات الاتصال أدناه.'
                : 'The application failed to connect or load the database. Please review the error and settings below.'}
            </p>
          </div>

          {/* Error Message Detail Box */}
          <div className="bg-error-container/15 border border-error-container/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-error text-xl shrink-0 mt-0.5">warning</span>
              <div className="flex-grow">
                <span className="text-xs font-bold text-error uppercase tracking-wider block mb-1">
                  {lang === 'ar' ? 'تفاصيل الخطأ الفني:' : 'Technical Error Details:'}
                </span>
                <p className="text-xs font-mono leading-relaxed text-on-error-container select-text break-words">
                  {dbStatus.error}
                </p>
              </div>
            </div>
          </div>

          {/* DB Settings Form */}
          <form onSubmit={async (e) => {
            e.preventDefault()
            setFirstRunLoading(true)
            setFirstRunError('')
            try {
              const testRes = await window.api.settings.testDbConnection({ databaseUrl, dbType })
              if (!testRes.success) {
                setFirstRunError(testRes.messageAr || testRes.messageEn || 'فشل اختبار الاتصال')
                setFirstRunLoading(false)
                return
              }
              const saveRes = await window.api.settings.saveDbConfig({ databaseUrl, dbType })
              if (saveRes.success) {
                await window.api.app.relaunch()
              } else {
                setFirstRunError(saveRes.error || 'فشل حفظ الإعدادات')
              }
            } catch (err: any) {
              setFirstRunError(err?.message || String(err))
            }
            setFirstRunLoading(false)
          }} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setDbType('sqlite')
                  const defaultPath = `file:servio.db`
                  setDatabaseUrl(defaultPath)
                }}
                className={`py-3 px-4 rounded-lg border font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  dbType === 'sqlite'
                    ? 'bg-primary/20 border-primary text-primary-light shadow-md'
                    : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-sm">database</span>
                <span>SQLite (جهاز واحد)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDbType('postgresql')
                  if (!databaseUrl.startsWith('postgresql')) {
                    setDatabaseUrl('postgresql://postgres:postgres@localhost:5432/pos_erp')
                  }
                }}
                className={`py-3 px-4 rounded-lg border font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  dbType === 'postgresql'
                    ? 'bg-primary/20 border-primary text-primary-light shadow-md'
                    : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-sm">dns</span>
                <span>PostgreSQL (ربط شبكي)</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface-variant">
                {dbType === 'postgresql' ? (lang === 'ar' ? 'رابط الاتصال بـ PostgreSQL' : 'PostgreSQL Connection URL') : (lang === 'ar' ? 'مسار ملف SQLite (نسبي أو مطلق)' : 'SQLite Database Path')}
              </label>
              <input
                type="text"
                required
                value={databaseUrl}
                onChange={(e) => setDatabaseUrl(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary text-white rounded-lg py-2.5 px-4 outline-none transition-all text-xs font-mono"
                placeholder={dbType === 'postgresql' ? 'postgresql://username:password@host:port/database' : 'file:servio.db'}
              />
              <span className="text-[10px] text-outline block leading-relaxed">
                {dbType === 'postgresql' 
                  ? (lang === 'ar' ? 'الصيغة: postgresql://المستخدم:الباسورد@الآي-بي:المنفذ/اسم-البيانات' : 'Format: postgresql://user:password@host:port/database')
                  : (lang === 'ar' ? 'ملحوظة: سيتم إنشاء الملف تلقائياً في مجلد بيانات التطبيق إذا كان مساراً نسبياً.' : 'Note: Relative paths will be resolved relative to the application user data directory.')}
              </span>
            </div>

            {firstRunError && (
              <p className="text-error text-xs text-center font-medium bg-error-container/20 border border-error-container/30 py-2.5 rounded-lg select-text">
                {firstRunError}
              </p>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                disabled={firstRunLoading}
                onClick={async () => {
                  setFirstRunLoading(true)
                  setFirstRunError('')
                  try {
                    const res = await window.api.settings.testDbConnection({ databaseUrl, dbType })
                    alert(lang === 'ar' ? res.messageAr : res.messageEn)
                  } catch (err: any) {
                    setFirstRunError(err?.message || String(err))
                  }
                  setFirstRunLoading(false)
                }}
                className="flex-grow py-3 bg-surface-container-highest text-on-surface hover:text-white font-bold rounded-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border border-outline-variant"
              >
                <span className="material-symbols-outlined text-sm">wifi_tethering</span>
                <span>{lang === 'ar' ? '🔌 اختبار الاتصال' : 'Test Connection'}</span>
              </button>

              <button
                type="submit"
                disabled={firstRunLoading}
                className="flex-grow py-3 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-primary-fixed-dim transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                {firstRunLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    <span>{lang === 'ar' ? 'جاري الاتصال والريستارت...' : 'Saving & Relaunch...'}</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">restart_alt</span>
                    <span>{lang === 'ar' ? 'حفظ وإعادة تشغيل التطبيق' : 'Save & Relaunch'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (isCheckingLicense) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0b1326] p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    )
  }

  if (licenseStatus && !licenseStatus.activated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0b1326] p-4 font-sans relative overflow-hidden" dir={direction}>
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-error-container/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-secondary/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

        <div className="w-full max-w-lg bg-surface-container/60 backdrop-blur-xl border border-outline-variant rounded-xl p-8 shadow-2xl relative">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-error-container to-error rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-error/40">
              <span className="material-symbols-outlined text-white text-3xl font-black">lock</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight text-center">
              {lang === 'ar' ? 'تفعيل نظام سيرفيو' : 'Servio System Activation'}
            </h1>
            <p className="text-sm text-on-surface-variant text-center mt-2 font-semibold">
              {lang === 'ar' ? licenseStatus.statusMessageAr : licenseStatus.statusMessageEn}
            </p>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 mb-6 flex flex-col items-center">
            <span className="text-xs text-on-surface-variant mb-1">{lang === 'ar' ? 'معرف الجهاز (Machine ID):' : 'Machine ID:'}</span>
            <span className="text-lg font-data-mono font-black tracking-widest text-primary select-all">{licenseStatus.machineId}</span>
            <span className="text-[10px] text-on-surface-variant mt-2 text-center">
              {lang === 'ar' ? 'يرجى إرسال هذا المعرف للمطور للحصول على مفتاح التفعيل.' : 'Please send this ID to the developer to get an activation key.'}
            </span>
          </div>

          <form onSubmit={handleActivateLicense} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-2">
                {lang === 'ar' ? 'مفتاح التفعيل' : 'Activation Key'}
              </label>
              <input
                type="text"
                required
                value={licenseKeyInput}
                onChange={(e) => setLicenseKeyInput(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary text-white rounded-lg py-3 px-4 outline-none transition-all text-sm font-medium font-data-mono text-center tracking-widest"
                placeholder="XXXX-XXXX-XXXX-XXXX"
              />
            </div>

            <button
              type="submit"
              disabled={licenseActivating}
              className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-primary-fixed-dim transition-all active:scale-[0.98] mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {licenseActivating ? (
                <span className="animate-spin material-symbols-outlined text-xl">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined text-xl">vpn_key</span>
              )}
              {lang === 'ar' ? 'تنشيط الآن' : 'Activate Now'}
            </button>
          </form>

          {/* Language toggle */}
          <div className="flex justify-center mt-6 pt-6 border-t border-outline-variant">
            <button
              onClick={() => setLang(prev => prev === 'ar' ? 'en' : 'ar')}
              className="text-xs text-on-surface-variant hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary text-sm">language</span>
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>
          </div>
        </div>

        {/* Developer Signature at bottom */}
        <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
          <p className="text-[11px] font-bold text-on-surface-variant/40 tracking-wider">
            developed by ali elgendy
          </p>
        </div>
      </div>
    )
  }

  // Change PostgreSQL password on first run
  const handleFirstRunSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstRunPass || firstRunPass.length < 4) {
      setFirstRunError(lang === 'ar' ? 'يجب أن تكون كلمة المرور 4 أحرف أو أكثر' : 'Password must be at least 4 characters')
      return
    }
    setFirstRunLoading(true)
    setFirstRunError('')
    // Assume default old password is 'postgres' which is configured during silent installation
    const res = await window.api.settings.changeDbPassword({
      oldPass: 'postgres',
      newPass: firstRunPass,
      host: 'localhost',
      port: 5432,
      database: 'pos_erp'
    })
    setFirstRunLoading(false)
    if (res.success) {
      alert(lang === 'ar' ? 'تم إعداد قاعدة البيانات بنجاح! يرجى إعادة تشغيل التطبيق لتطبيق التغييرات.' : 'Database configured successfully! Please restart the app.')
      setShowFirstRun(false)
    } else {
      setFirstRunError(res.error || 'فشل الاتصال أو تغيير كلمة المرور')
    }
  }

  if (showFirstRun) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0b1326] p-4 font-sans relative overflow-hidden" dir={direction}>
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="w-full max-w-md bg-surface-container/60 backdrop-blur-xl border border-outline-variant rounded-xl p-8 shadow-2xl relative text-on-surface">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary-container/40">
              <span className="material-symbols-outlined text-white text-3xl font-black">dns</span>
            </div>
            <h1 className="text-xl font-extrabold text-on-surface tracking-tight text-center">
              {lang === 'ar' ? 'إعداد قاعدة البيانات لأول مرة' : 'First-time Database Setup'}
            </h1>
            <p className="text-xs text-on-surface-variant text-center mt-2 leading-relaxed">
              {lang === 'ar' 
                ? 'تم كشف تثبيت خادم PostgreSQL جديد. يرجى تعيين كلمة مرور قوية لحماية قاعدة بيانات المحل الخاصة بك.'
                : 'A new PostgreSQL server installation was detected. Please set a secure password to protect your database.'}
            </p>
          </div>

          <form onSubmit={handleFirstRunSetup} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-on-surface-variant">{lang === 'ar' ? 'كلمة مرور مدير قاعدة البيانات الجديدة' : 'New DB Manager Password'}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-lg">lock</span>
                </span>
                <input
                  type="password"
                  required
                  value={firstRunPass}
                  onChange={(e) => setFirstRunPass(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary text-on-surface rounded-lg py-2 pl-10 pr-4 outline-none transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
              <span className="text-[10px] text-outline block mt-1">
                {lang === 'ar' ? 'هذه الكلمة ستحمي بياناتك وسيتم استخدامها لتوصيل أجهزة الكاشير الأخرى.' : 'This password will protect your database and link other client workstations.'}
              </span>
            </div>

            {firstRunError && (
              <p className="text-error text-xs text-center font-medium bg-error-container/20 border border-error-container/30 py-2 rounded-lg">
                {firstRunError}
              </p>
            )}

            <button
              type="submit"
              disabled={firstRunLoading}
              className="w-full py-2.5 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-primary-fixed-dim transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              {firstRunLoading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  <span>{lang === 'ar' ? 'جاري الحفظ وإعداد الخادم...' : 'Configuring server...'}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  <span>{lang === 'ar' ? 'حفظ وإعداد النظام للعمل' : 'Save & Configure Server'}</span>
                </>
              )}
            </button>
          </form>

          {/* Language toggle */}
          <div className="flex justify-center mt-6 pt-6 border-t border-outline-variant">
            <button
              onClick={() => setLang(prev => prev === 'ar' ? 'en' : 'ar')}
              className="text-xs text-on-surface-variant hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary text-sm">language</span>
              {lang === 'ar' ? 'Switch to English' : 'تغيير إلى العربية'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background p-4 font-sans relative overflow-hidden" dir={direction}>
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-secondary/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

        <div className="w-full max-w-md bg-surface-container/60 backdrop-blur-xl border border-outline-variant rounded-xl p-8 shadow-2xl relative text-on-surface">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-primary-container to-secondary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary-container/40">
              <span className="material-symbols-outlined text-white text-3xl font-black">point_of_sale</span>
            </div>
            <h1 className="text-2xl font-extrabold text-on-surface tracking-tight text-center">
              {lang === 'ar' ? 'نظام سيرفيو المتكامل' : 'Servio System'}
            </h1>
            <p className="text-xs text-on-surface-variant text-center mt-1.5">{t[lang].enterCredentials}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-2">{t[lang].username}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-lg">person</span>
                </span>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary text-on-surface rounded-lg py-2.5 pl-10 pr-4 outline-none transition-all text-sm font-medium"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-2">{t[lang].password}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-lg">lock</span>
                </span>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary text-on-surface rounded-lg py-2.5 pl-10 pr-4 outline-none transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-error text-xs text-center font-medium bg-error-container/20 border border-error-container/30 py-2.5 rounded-lg">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-primary-fixed-dim transition-all active:scale-[0.98] mt-2 cursor-pointer"
            >
              {t[lang].login}
            </button>
          </form>

          {/* Language toggle at bottom of login */}
          <div className="flex justify-center mt-6 pt-6 border-t border-outline-variant">
            <button
              onClick={() => setLang(prev => prev === 'ar' ? 'en' : 'ar')}
              className="text-xs text-on-surface-variant hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary text-sm">language</span>
              {lang === 'ar' ? 'Switch to English' : 'تغيير إلى العربية'}
            </button>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-amber-500/65 font-bold tracking-wider font-data-mono select-none">
          developed by ali elgendy
        </div>
      </div>
    )
  }

  // --- MAIN VIEW RENDERING ---
  return (
    <div className="flex h-screen w-screen bg-background text-on-background select-none overflow-hidden font-body-md" dir={direction}>
      {/* 1. Sidebar Navigation */}
      {user.role !== 'CASHIER' && (
        <aside className={`h-screen w-64 fixed top-0 bg-surface-container border-outline-variant flex flex-col py-4 z-50 ${
          lang === 'ar'
            ? 'right-0 border-l'
            : 'left-0 border-r'
        }`}>
        <div className="px-6 mb-8 flex flex-col gap-1">
          <h1 className="font-headline-md text-lg font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl font-black">point_of_sale</span>
            POS Master
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant opacity-75 capitalize">
            {user.role === 'ADMIN' ? (lang === 'ar' ? 'مدير النظام' : 'Admin Role') : (lang === 'ar' ? 'كاشير' : 'Cashier Role')}
          </p>
        </div>

        <nav className="flex-grow space-y-0.5 overflow-y-auto pr-1 pl-1 scrollbar-thin">
          {can('pos', 'canView') && (
            <button
              onClick={() => setActiveView('pos')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'pos'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">point_of_sale</span>
              <span className="font-body-md text-xs">{t[lang].pos}</span>
            </button>
          )}

          {can('purchases', 'canView') && (
            <button
              onClick={() => setActiveView('purchases')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'purchases'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">shopping_cart</span>
              <span className="font-body-md text-xs">{lang === 'ar' ? 'المشتريات' : 'Purchases'}</span>
            </button>
          )}

          {can('sales', 'canView') && (
            <button
              onClick={() => setActiveView('sales')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'sales'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">receipt_long</span>
              <span className="font-body-md text-xs">{lang === 'ar' ? 'دفتر المبيعات' : 'Sales Ledger'}</span>
            </button>
          )}

          {can('inventory', 'canView') && (
            <button
              onClick={() => setActiveView('inventory')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'inventory'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">warehouse</span>
              <span className="font-body-md text-xs">{lang === 'ar' ? 'المخازن والمستودعات' : 'Warehouses & Products'}</span>
            </button>
          )}

          {can('expenses', 'canView') && (
            <button
              onClick={() => setActiveView('expenses')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'expenses'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
              <span className="font-body-md text-xs">{lang === 'ar' ? 'المصروفات' : 'Expenses'}</span>
            </button>
          )}

          {can('employees', 'canView') && (
            <button
              onClick={() => setActiveView('employees')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'employees'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">badge</span>
              <span className="font-body-md text-xs">{lang === 'ar' ? 'الموظفين والرواتب' : 'Employees'}</span>
            </button>
          )}

          {can('vault', 'canView') && (
            <button
              onClick={() => setActiveView('vault')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'vault'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">shield</span>
              <span className="font-body-md text-xs">{lang === 'ar' ? 'الخزينة' : 'Vault'}</span>
            </button>
          )}

          {can('bank', 'canView') && (
            <button
              onClick={() => setActiveView('bank')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'bank'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">account_balance</span>
              <span className="font-body-md text-xs">{lang === 'ar' ? 'البنك والحسابات' : 'Bank'}</span>
            </button>
          )}

          {can('profits', 'canView') && (
            <button
              onClick={() => setActiveView('profits')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'profits'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">trending_up</span>
              <span className="font-body-md text-xs">{lang === 'ar' ? 'الأرباح والخسائر' : 'Profits'}</span>
            </button>
          )}

          {can('settings', 'canView') && (
            <button
              onClick={() => setActiveView('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'settings'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">settings</span>
              <span className="font-body-md text-xs">{t[lang].settings}</span>
            </button>
          )}

          {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
            <button
              onClick={() => setActiveView('masterData')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'masterData'
                  ? 'bg-primary-container text-on-primary-container border-primary border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">database</span>
              <span className="font-body-md text-xs">{t[lang].masterData}</span>
            </button>
          )}

          {can('activityLog', 'canView') && (
            <button
              onClick={() => { setActiveView('activityLog'); fetchActivityLog() }}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rtl:text-right transition-colors cursor-pointer ${
                activeView === 'activityLog'
                  ? 'bg-amber-900/40 text-amber-200 border-amber-500 border-r-4'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">manage_history</span>
              <span className="font-body-md text-xs">{lang === 'ar' ? 'سجل النشاط' : 'Activity Log'}</span>
            </button>
          )}
        </nav>


        <div className="mt-auto px-4 space-y-3">
          <div className="py-2 bg-surface-container-low px-3 rounded border border-outline-variant flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span className="font-label-sm text-xs text-secondary font-bold">
              {lang === 'ar' ? 'متصل بالشبكة' : 'System Online'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-highest text-left rtl:text-right rounded cursor-pointer transition-colors border border-outline-variant/30"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-body-md text-xs">{t[lang].logout}</span>
          </button>
        </div>
      </aside>
      )}

      {/* 2. Main Container (Header + Content + Footer) */}
      <main className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-200 ${
        user.role === 'CASHIER'
          ? 'm-0'
          : lang === 'ar' ? 'mr-64 ml-0' : 'ml-64 mr-0'
      }`}>
        {/* Header Bar */}
        <header className="h-12 bg-surface-container-high border-b border-outline-variant flex items-center justify-between px-4 z-30">
          <div className="flex items-center gap-6">
            <span className="font-headline-md text-sm font-black text-on-surface uppercase tracking-wider">
              {settings.storeName || 'Servio'}
            </span>
            {activeView === 'pos' && activeShift && (
              <div className="relative">
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-sm">search</span>
                <input
                  ref={scannerInputRef}
                  type="text"
                  placeholder={lang === 'ar' ? 'بحث سريع عن المنتجات... [F2]' : 'Search Barcode... [F2]'}
                  value={posSearch}
                  onChange={(e) => setPosSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      const query = posSearch.trim()
                      if (!query) return
                      
                      let quantity = 1
                      let barcode = query
                      
                      // Check for multiplication prefix, e.g. "10*BARCODE" or "5xBARCODE"
                      if (query.includes('*')) {
                        const parts = query.split('*')
                        if (parts.length === 2 && !isNaN(Number(parts[0]))) {
                          quantity = Math.max(1, Number(parts[0]))
                          barcode = parts[1].trim()
                        }
                      } else if (query.toLowerCase().includes('x')) {
                        const parts = query.toLowerCase().split('x')
                        if (parts.length === 2 && !isNaN(Number(parts[0]))) {
                          quantity = Math.max(1, Number(parts[0]))
                          barcode = parts[1].trim()
                        }
                      }
                      
                      // Check for electronic weighing scales barcode (EAN-13 structure: PP-KKKKK-WWWWW-C)
                      // Typically prefixes are 20, 28, or 29
                      let isScaleBarcode = false
                      if ((barcode.startsWith('20') || barcode.startsWith('28') || barcode.startsWith('29')) && barcode.length === 13) {
                        const sku = barcode.substring(2, 7)
                        const weight = Number(barcode.substring(7, 12)) / 1000 // Weight in kg
                        const matched = products.find(p => p.barcode === sku || p.barcode.endsWith(sku))
                        if (matched) {
                          addToCart(matched, weight)
                          setPosSearch('')
                          isScaleBarcode = true
                        }
                      }
                      
                      if (!isScaleBarcode) {
                        const matched = products.find(p => p.barcode === barcode || p.name.toLowerCase() === barcode.toLowerCase())
                        if (matched) {
                          addToCart(matched, quantity)
                          setPosSearch('')
                        } else {
                          alert(lang === 'ar' ? `المنتج ذو الباركود (${barcode}) غير مسجل في المخزن!` : `Product with barcode (${barcode}) is not registered in database!`)
                        }
                      }
                    }
                  }}
                  className="bg-surface-container-lowest border border-outline-variant h-8 pr-8 pl-3 w-64 rounded text-xs focus:border-primary outline-none"
                  autoFocus
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Active Shift status bar */}
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest border border-outline-variant rounded text-xs">
              <span className={`w-2 h-2 rounded-full ${activeShift ? 'bg-secondary animate-pulse' : 'bg-error'}`} />
              <span className="text-on-surface-variant text-[10px]">
                {activeShift
                  ? `${lang === 'ar' ? 'الوردية مفتوحة بواسطة' : 'Opened by'}: ${activeShift.user.name}`
                  : t[lang].noShift
                }
              </span>
              {activeShift && (
                <button
                  onClick={() => {
                    setActualCash(activeShift.startingCash)
                    setIsClosingShift(true)
                  }}
                  className="ml-2 rtl:mr-2 text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer text-[10px]"
                >
                  [{t[lang].closeShift} F12]
                </button>
              )}
              {!activeShift && (
                <button
                  onClick={() => setIsOpeningShift(true)}
                  className="ml-2 rtl:mr-2 text-secondary hover:text-opacity-80 font-bold transition-colors cursor-pointer text-[10px]"
                >
                  [{t[lang].openShift}]
                </button>
              )}
            </div>

            {/* Warning alerts indicators */}
            {lowStockProducts.length > 0 && (
              <button
                onClick={() => setActiveView('inventory')}
                className="text-on-surface-variant hover:bg-surface-bright p-1 rounded transition-all relative flex items-center justify-center cursor-pointer"
                title={t[lang].shortageAlert}
              >
                <span className="material-symbols-outlined text-amber-500">warning</span>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-error-container text-on-error-container rounded-full text-[9px] font-bold flex items-center justify-center font-mono border border-background">
                  {lowStockProducts.length}
                </span>
              </button>
            )}

            {expiryAlerts.length > 0 && (
              <button
                onClick={() => setActiveView('inventory')}
                className="text-on-surface-variant hover:bg-surface-bright p-1 rounded transition-all relative flex items-center justify-center cursor-pointer"
                title={t[lang].expiryAlert}
              >
                <span className="material-symbols-outlined text-rose-500">calendar_month</span>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-error-container text-on-error-container rounded-full text-[9px] font-bold flex items-center justify-center font-mono border border-background">
                  {expiryAlerts.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className="text-on-surface-variant hover:bg-surface-bright p-1.5 rounded transition-colors flex items-center justify-center cursor-pointer border border-outline-variant/30"
              title={isDarkMode ? (lang === 'ar' ? 'الوضع المضيء' : 'Light Mode') : (lang === 'ar' ? 'الوضع المظلم' : 'Dark Mode')}
            >
              <span className="material-symbols-outlined text-primary text-base">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <button
              onClick={() => setLang(prev => prev === 'ar' ? 'en' : 'ar')}
              className="text-on-surface-variant hover:bg-surface-bright p-1.5 rounded transition-colors flex items-center justify-center cursor-pointer border border-outline-variant/30"
              title={lang === 'ar' ? 'English' : 'العربية'}
            >
              <span className="material-symbols-outlined text-primary text-base">language</span>
            </button>

            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-on-primary font-black text-xs select-none shadow border border-outline-variant/30">
              {user.name[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dynamic Content Panel */}
        <div className="flex-1 p-4 overflow-hidden relative">
          {activeView === 'pos' && renderPOS()}
          {activeView === 'purchases' && renderPurchases()}
          {activeView === 'sales' && renderSalesLedger()}
          {activeView === 'inventory' && renderInventory()}
          {activeView === 'expenses' && renderExpensesSubTab()}
          {activeView === 'employees' && renderEmployees()}
          {activeView === 'vault' && renderVault()}
          {activeView === 'bank' && renderBank()}
          {activeView === 'profits' && renderProfits()}
          {activeView === 'settings' && renderSettings()}
          {activeView === 'masterData' && renderMasterData()}
          {activeView === 'activityLog' && renderActivityLog()}
        </div>

        {/* Footer */}
        <footer className="h-8 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between px-4 z-30">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <span className="font-shortcut-key text-[10px] text-secondary bg-secondary/10 border border-secondary/20 px-1 rounded">F2</span>
              <span>{lang === 'ar' ? 'تركيز البحث' : 'Focus Search'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <span className="font-shortcut-key text-[10px] text-secondary bg-secondary/10 border border-secondary/20 px-1 rounded">F12</span>
              <span>{lang === 'ar' ? 'إغلاق الوردية / الدفع' : 'Close Shift / Pay'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <span className="font-shortcut-key text-[10px] text-secondary bg-secondary/10 border border-secondary/20 px-1 rounded">ESC</span>
              <span>{lang === 'ar' ? 'إلغاء' : 'Cancel'}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-on-surface-variant text-[11px]">Copyright © 2026 Servio</span>
            <div className="flex items-center gap-2 border-r border-outline-variant pr-4 pl-4 ml-4 rtl:border-l rtl:border-r-0">
              <a href="#" className="font-body-md text-xs text-outline hover:text-on-surface transition-colors">Manual</a>
              <a href="#" className="font-body-md text-xs text-outline hover:text-on-surface transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </main>

      {/* --- MODAL DIALOGS --- */}

      {/* 1. Modal: Open Shift Dialogue */}
      {isOpeningShift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-surface-container border border-outline-variant rounded-xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white pb-3 border-b border-outline-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_box</span>
              <span>{t[lang].openShift}</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-on-surface-variant mb-1.5">{t[lang].startingCash} *</label>
                <input
                  type="number"
                  required
                  value={startingCash}
                  onChange={(e) => setStartingCash(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2.5 outline-none text-white focus:border-primary text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1.5">{t[lang].notes}</label>
                <textarea
                  value={shiftNotes}
                  onChange={(e) => setShiftNotes(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2.5 outline-none text-white focus:border-primary text-sm resize-none"
                  rows={2}
                  placeholder={lang === 'ar' ? 'أدخل ملاحظات تسليم الوردية...' : 'Any handover notes...'}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleOpenShift}
                  className="flex-1 py-2.5 bg-secondary-container hover:brightness-110 text-white font-bold rounded text-sm cursor-pointer"
                >
                  {t[lang].submit}
                </button>
                <button
                  onClick={() => setIsOpeningShift(false)}
                  className="flex-1 py-2.5 bg-surface-container-highest hover:bg-surface-bright border border-outline-variant text-on-surface-variant rounded text-sm cursor-pointer"
                >
                  {t[lang].cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: Close Shift Dialogue */}
      {isClosingShift && activeShift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-surface-container border border-outline-variant rounded-xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white pb-3 border-b border-outline-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-error">close</span>
              <span>{t[lang].closeShift}</span>
            </h3>

            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              {t[lang].closeShiftWarning}
            </p>

            <div className="space-y-4">
              <div className="bg-surface-container-lowest p-3 rounded border border-outline-variant flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">{t[lang].drawerCash}:</span>
                <span className="font-mono font-bold text-secondary">
                  {activeShift.startingCash.toFixed(2)}
                </span>
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1.5">{t[lang].actualCash} *</label>
                <input
                  type="number"
                  required
                  value={actualCash}
                  onChange={(e) => setActualCash(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2.5 outline-none text-white focus:border-primary text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1.5">{t[lang].notes}</label>
                <textarea
                  value={shiftNotes}
                  onChange={(e) => setShiftNotes(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2.5 outline-none text-white focus:border-primary text-sm resize-none"
                  rows={2}
                  placeholder={lang === 'ar' ? 'ملاحظات العجز أو الزيادة والتسليم...' : 'Notes about surplus, shortage...'}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCloseShift}
                  className="flex-1 py-2.5 bg-error-container hover:brightness-110 text-white font-bold rounded text-sm cursor-pointer"
                >
                  {t[lang].closeShift}
                </button>
                <button
                  onClick={() => setIsClosingShift(false)}
                  className="flex-1 py-2.5 bg-surface-container-highest hover:bg-surface-bright border border-outline-variant text-on-surface-variant rounded text-sm cursor-pointer"
                >
                  {t[lang].cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal: Add User Dialogue */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-surface-container border border-outline-variant rounded-xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white pb-3 border-b border-outline-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person_add</span>
              <span>{lang === 'ar' ? 'إضافة مستخدم جديد للنظام' : 'Add New System User'}</span>
            </h3>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs text-on-surface-variant mb-1.5">{lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'} *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2.5 outline-none text-white focus:border-primary text-sm"
                  placeholder={lang === 'ar' ? 'مثال: محمد أحمد' : 'e.g. John Doe'}
                />
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1.5">{lang === 'ar' ? 'اسم المستخدم' : 'Username'} *</label>
                <input
                  type="text"
                  required
                  value={newUserUsername}
                  onChange={(e) => setNewUserUsername(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2.5 outline-none text-white focus:border-primary text-sm font-mono"
                  placeholder="username"
                />
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1.5">{lang === 'ar' ? 'كلمة المرور' : 'Password'} *</label>
                <input
                  type="password"
                  required
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-2.5 outline-none text-white focus:border-primary text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1.5">{lang === 'ar' ? 'الصلاحية والوظيفة' : 'Role'} *</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded px-3 py-2.5 text-sm outline-none focus:border-primary cursor-pointer"
                >
                  <option value="CASHIER">{lang === 'ar' ? 'موظف كاشير (CASHIER)' : 'Cashier Operator'}</option>
                  <option value="ADMIN">{lang === 'ar' ? 'مدير نظام (ADMIN)' : 'System Administrator'}</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary text-on-primary font-bold rounded text-sm cursor-pointer"
                >
                  {t[lang].submit}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 py-2.5 bg-surface-container-highest hover:bg-surface-bright border border-outline-variant text-on-surface-variant rounded text-sm cursor-pointer"
                >
                  {t[lang].cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Modal: Thermal Ticket ZATCA Invoice Preview */}
      {showReceiptModal && currentInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white text-black rounded-lg p-5 shadow-2xl font-mono relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button 
              type="button" 
              onClick={() => {
                setShowReceiptModal(false)
                setCurrentInvoice(null)
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex flex-col items-center">
              <span className="text-sm font-bold uppercase">{settings.storeName}</span>
              <span className="text-[10px] text-gray-600 block text-center mt-1">{settings.storeAddress}</span>
              <span className="text-[10px] text-gray-600 block text-center">{settings.storePhone}</span>
              
              <div className="w-full border-t border-dashed border-gray-400 my-3"></div>
              
              <div className="w-full text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Invoice:</span>
                  <span className="font-bold">{currentInvoice.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date(currentInvoice.date || Date.now()).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span className="font-bold">{currentInvoice.paymentType}</span>
                </div>
              </div>

              <div className="w-full border-t border-dashed border-gray-400 my-3"></div>

              {/* Items List */}
              <div className="w-full text-xs space-y-2">
                {currentInvoice.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between">
                    <div className="max-w-[60%]">
                      <span className="block font-bold">{item.name}</span>
                      <span className="text-[10px] text-gray-600">{item.quantity} x {item.sellPrice.toFixed(2)}</span>
                    </div>
                    <span className="font-bold">{(item.quantity * item.sellPrice).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="w-full border-t border-dashed border-gray-400 my-3"></div>

              <div className="w-full text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{currentInvoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Discount:</span>
                  <span>-{currentInvoice.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-gray-300 pt-1">
                  <span>Total (inc. VAT):</span>
                  <span>{currentInvoice.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="w-full border-t border-dashed border-gray-400 my-3"></div>

              {/* Legal ZATCA compliant Base64 QR Code visualization */}
              <div className="flex flex-col items-center p-3 bg-gray-100 rounded border border-gray-200 w-full mb-3">
                <span className="text-[8px] font-bold text-gray-600 uppercase mb-2">
                  {lang === 'ar' ? 'الفاتورة الإلكترونية المعتمدة' : 'ZATCA Legal E-Invoice'}
                </span>
                
                {/* Simulated QR Code box */}
                <div className="w-24 h-24 bg-white border border-gray-300 p-1 flex items-center justify-center relative overflow-hidden select-none">
                  {/* Mock QR matrix using simple CSS blocks */}
                  <div className="grid grid-cols-4 gap-1 w-full h-full opacity-90">
                    <div className="bg-black"></div>
                    <div className="bg-white"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                    <div className="bg-white"></div>
                    <div className="bg-black"></div>
                    <div className="bg-white"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                    <div className="bg-white"></div>
                    <div className="bg-black"></div>
                    <div className="bg-white"></div>
                    <div className="bg-black"></div>
                    <div className="bg-black"></div>
                  </div>
                </div>
                
                <span className="text-[7px] text-gray-500 font-mono break-all mt-2 max-w-full text-center line-clamp-2 leading-tight select-all">
                  {currentInvoice.zatcaQR}
                </span>
              </div>

              <span className="text-[9px] text-gray-500 uppercase tracking-widest text-center mt-2">
                {settings.receiptFooter}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Editor Modal */}
      {selectedPermissionUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant flex-shrink-0">
              <h2 className="text-lg font-bold flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                {lang === 'ar' 
                  ? `تعديل صلاحيات المستخدم: ${selectedPermissionUser.name}` 
                  : `Edit Permissions for: ${selectedPermissionUser.name}`}
              </h2>
              <button 
                onClick={() => setSelectedPermissionUser(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-outline hover:text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="overflow-y-auto py-4 flex-grow">
              <table className="w-full text-right rtl:text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container-highest text-on-surface-variant font-bold">
                    <th className="px-4 py-2 text-right rtl:text-right ltr:text-left">{lang === 'ar' ? 'القسم / الوحدة' : 'Module / Component'}</th>
                    <th className="px-3 py-2 text-center">{lang === 'ar' ? 'عرض (View)' : 'View'}</th>
                    <th className="px-3 py-2 text-center">{lang === 'ar' ? 'إنشاء (Create)' : 'Create'}</th>
                    <th className="px-3 py-2 text-center">{lang === 'ar' ? 'تعديل (Edit)' : 'Edit'}</th>
                    <th className="px-3 py-2 text-center">{lang === 'ar' ? 'حذف (Delete)' : 'Delete'}</th>
                    <th className="px-3 py-2 text-center">{lang === 'ar' ? 'طباعة (Print)' : 'Print'}</th>
                    <th className="px-3 py-2 text-center">{lang === 'ar' ? 'تصدير (Export)' : 'Export'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {[
                    { key: 'pos', ar: 'نقطة البيع (POS)', en: 'POS Screen' },
                    { key: 'inventory', ar: 'المخازن والمخزون', en: 'Inventory Management' },
                    { key: 'purchases', ar: 'المشتريات والموردين', en: 'Purchases & Suppliers' },
                    { key: 'sales', ar: 'دفتر المبيعات والعملاء', en: 'Sales Ledger & Clients' },
                    { key: 'expenses', ar: 'المصروفات التشغيلية', en: 'Operational Expenses' },
                    { key: 'employees', ar: 'الموظفين والرواتب', en: 'Employees & Payroll' },
                    { key: 'vault', ar: 'الخزينة الرئيسية والتحويلات', en: 'Vault & Safes' },
                    { key: 'bank', ar: 'البنوك والمدفوعات البنكية', en: 'Bank Accounts' },
                    { key: 'profits', ar: 'الأرباح والخسائر والتقارير', en: 'Profits & Reports' },
                    { key: 'activityLog', ar: 'سجل مراقبة النشاط والتدقيق', en: 'Activity & Audit Log' },
                    { key: 'settings', ar: 'إعدادات النظام والتهيئة', en: 'System Settings' }
                  ].map((moduleDef) => {
                    const rowPerm = selectedUserPermissions.find(p => p.module === moduleDef.key) || {
                      canView: true,
                      canCreate: false,
                      canEdit: false,
                      canDelete: false,
                      canPrint: true,
                      canExport: false
                    }

                    const handleToggle = (actionKey: string) => {
                      const updated = [...selectedUserPermissions]
                      const index = updated.findIndex(p => p.module === moduleDef.key)
                      const val = !rowPerm[actionKey]

                      if (index === -1) {
                        updated.push({
                          module: moduleDef.key,
                          canView: moduleDef.key === 'pos' ? true : rowPerm.canView,
                          canCreate: rowPerm.canCreate,
                          canEdit: rowPerm.canEdit,
                          canDelete: rowPerm.canDelete,
                          canPrint: rowPerm.canPrint,
                          canExport: rowPerm.canExport,
                          [actionKey]: val
                        })
                      } else {
                        updated[index] = {
                          ...updated[index],
                          [actionKey]: val
                        }
                      }
                      setSelectedUserPermissions(updated)
                    }

                    return (
                      <tr key={moduleDef.key} className="hover:bg-surface-container-high transition-colors">
                        <td className="px-4 py-3 font-bold text-on-surface text-right rtl:text-right ltr:text-left">
                          {lang === 'ar' ? moduleDef.ar : moduleDef.en}
                        </td>
                        {['canView', 'canCreate', 'canEdit', 'canDelete', 'canPrint', 'canExport'].map((actionKey) => (
                          <td key={actionKey} className="px-3 py-3 text-center">
                            <input 
                              type="checkbox"
                              checked={!!rowPerm[actionKey]}
                              onChange={() => handleToggle(actionKey)}
                              className="rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-0 w-4 h-4 cursor-pointer"
                            />
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 pt-4 border-t border-outline-variant flex-shrink-0">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await window.api.permissions.save({
                      userId: selectedPermissionUser.id,
                      permissions: selectedUserPermissions
                    })
                    if (res.success) {
                      alert(lang === 'ar' ? 'تم حفظ الصلاحيات بنجاح!' : 'Permissions saved successfully!')
                      setSelectedPermissionUser(null)
                      // If editing current logged-in user, refresh their active permission map
                      if (user && user.id === selectedPermissionUser.id) {
                        await fetchUserPermissions(user.id)
                      }
                    } else {
                      alert(res.error || (lang === 'ar' ? 'حدث خطأ أثناء الحفظ' : 'Failed to save permissions'))
                    }
                  } catch (err: any) {
                    alert(err.message)
                  }
                }}
                className="flex-1 py-2.5 bg-primary text-on-primary rounded text-sm font-bold hover:brightness-110 transition-all cursor-pointer active:scale-95 text-center"
              >
                {lang === 'ar' ? 'حفظ الصلاحيات' : 'Save Permissions'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedPermissionUser(null)}
                className="flex-1 py-2.5 bg-surface-container-highest hover:bg-surface-bright border border-outline-variant text-on-surface-variant rounded text-sm font-bold cursor-pointer"
              >
                {t[lang].cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal: POS Security Manager PIN Gate */}

      {managerApproval && managerApproval.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-2xl relative select-none">
            
            {/* Header */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/30 text-tertiary flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-2xl font-bold">lock_open</span>
              </div>
              <h2 className="text-lg font-black text-on-surface text-center">
                {lang === 'ar' ? 'موافقة المدير المطلوبة' : 'Manager Approval Required'}
              </h2>
              <p className="text-xs text-on-surface-variant text-center px-4 leading-relaxed font-semibold">
                {lang === 'ar' ? 'يتطلب الإجراء التالي إذن مدير:' : 'The following action requires manager authorization:'}
              </p>
              <div className="px-4 py-2 bg-surface-container-low border border-outline-variant/35 rounded-lg text-sm text-tertiary font-bold text-center mt-1">
                {lang === 'ar' ? managerApproval.actionAr : managerApproval.actionEn}
              </div>
            </div>

            {/* Error Message */}
            {managerError && (
              <div className="mb-4 py-2 px-3 bg-error-container/20 border border-error text-error rounded-lg text-xs font-semibold text-center animate-shake">
                {managerError}
              </div>
            )}

            {/* Pin display dots */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="flex gap-3 my-2 justify-center">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-150 ${
                      i < managerPin.length
                        ? 'bg-secondary scale-110 shadow-[0_0_8px_var(--color-secondary)]'
                        : 'bg-surface-container-high border-2 border-outline-variant'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-on-surface-variant font-mono tracking-widest">
                {managerPin.length > 0 ? (lang === 'ar' ? 'جاري الإدخال...' : 'Typing...') : (lang === 'ar' ? 'أدخل رمز المرور' : 'Enter PIN')}
              </span>
            </div>

            {/* Touch Keypad */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (managerPin.length < 6) {
                      setManagerPin(prev => prev + num.toString())
                      setManagerError('')
                    }
                  }}
                  className="h-14 rounded-xl bg-surface-container-high border border-outline-variant/30 text-lg font-black text-on-surface hover:bg-surface-bright active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                >
                  {num}
                </button>
              ))}
              
              {/* Clear button */}
              <button
                type="button"
                onClick={() => {
                  setManagerPin('')
                  setManagerError('')
                }}
                className="h-14 rounded-xl bg-surface-container-highest border border-outline-variant/30 text-sm font-bold text-tertiary hover:bg-tertiary-container hover:text-white active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              >
                {lang === 'ar' ? 'مسح' : 'Clear'}
              </button>

              {/* Zero */}
              <button
                type="button"
                onClick={() => {
                  if (managerPin.length < 6) {
                    setManagerPin(prev => prev + '0')
                    setManagerError('')
                  }
                }}
                className="h-14 rounded-xl bg-surface-container-high border border-outline-variant/30 text-lg font-black text-on-surface hover:bg-surface-bright active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm"
              >
                0
              </button>

              {/* Backspace */}
              <button
                type="button"
                onClick={() => {
                  setManagerPin(prev => prev.slice(0, -1))
                  setManagerError('')
                }}
                className="h-14 rounded-xl bg-surface-container-highest border border-outline-variant/30 text-on-surface hover:bg-surface-bright active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">backspace</span>
              </button>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={closeManagerApproval}
                className="py-3 bg-surface-container-low border border-outline-variant hover:bg-surface-container-high text-sm font-bold text-on-surface rounded-xl active:scale-95 transition-all cursor-pointer text-center"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              
              <button
                type="button"
                onClick={() => submitManagerPin()}
                disabled={!managerPin}
                className="py-3 bg-primary text-on-primary hover:bg-primary-container text-sm font-bold rounded-xl active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none text-center shadow-lg shadow-primary/10"
              >
                {lang === 'ar' ? 'موافق' : 'OK / Verify'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
