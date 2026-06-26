const fs = require('fs');
const filePath = 'src/renderer/src/components/Layout.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add states for First Run config
const originalDbUrlState = "  const [databaseUrl, setDatabaseUrl] = useState('')\n  const [localIps, setLocalIps] = useState<string[]>([])";
const replacementDbUrlState = `  const [databaseUrl, setDatabaseUrl] = useState('')
  const [localIps, setLocalIps] = useState<string[]>([])
  const [showFirstRun, setShowFirstRun] = useState(false)
  const [firstRunPass, setFirstRunPass] = useState('')
  const [firstRunLoading, setFirstRunLoading] = useState(false)
  const [firstRunError, setFirstRunError] = useState('')`;

if (content.includes(originalDbUrlState)) {
  content = content.replace(originalDbUrlState, replacementDbUrlState);
} else {
  console.error("originalDbUrlState not found!");
}

// 2. Modify useEffect loadDbConfig to check if it's the default postgres password, indicating first run is needed
const originalLoadDbConfig = `        const res = await window.api.settings.getDbConfig()
        if (res.success && res.databaseUrl) {
          setDatabaseUrl(res.databaseUrl)
          if (res.localIps) {
            setLocalIps(res.localIps)
          }
        }`;

const replacementLoadDbConfig = `        const res = await window.api.settings.getDbConfig()
        if (res.success && res.databaseUrl) {
          setDatabaseUrl(res.databaseUrl)
          if (res.localIps) {
            setLocalIps(res.localIps)
          }
          // If the connection string contains postgres:postgres (the factory defaults), trigger first-run wizard
          if (res.databaseUrl.includes('postgres:postgres@')) {
            setShowFirstRun(true)
          }
        }`;

if (content.includes(originalLoadDbConfig)) {
  content = content.replace(originalLoadDbConfig, replacementLoadDbConfig);
} else {
  console.error("originalLoadDbConfig not found!");
}

// 3. Render the first run setup screen before rendering the Login screen
const originalLoginCheck = `  if (!user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background p-4 font-sans relative overflow-hidden" dir={direction}>`;

const replacementLoginCheck = `  // Change PostgreSQL password on first run
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
      <div className="flex h-screen w-screen items-center justify-center bg-background p-4 font-sans relative overflow-hidden" dir={direction}>`;

if (content.includes(originalLoginCheck)) {
  content = content.replace(originalLoginCheck, replacementLoginCheck);
} else {
  console.error("originalLoginCheck not found!");
}

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');
console.log("Layout.tsx updated successfully with First Run DB Configuration screen!");
