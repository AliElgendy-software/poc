const fs = require('fs');
const filePath = 'src/renderer/src/components/Layout.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add localIps state
const originalDbUrlState = "  // Database Connection Configuration State\n  const [databaseUrl, setDatabaseUrl] = useState('')";
const replacementDbUrlState = `  // Database Connection Configuration State
  const [databaseUrl, setDatabaseUrl] = useState('')
  const [localIps, setLocalIps] = useState<string[]>([])`;

if (content.includes(originalDbUrlState)) {
  content = content.replace(originalDbUrlState, replacementDbUrlState);
} else {
  console.error("originalDbUrlState not found!");
}

// 2. Load localIps in useEffect
const originalLoadDbConfig = `        const res = await window.api.settings.getDbConfig()
        if (res.success && res.databaseUrl) {
          setDatabaseUrl(res.databaseUrl)
        }`;

const replacementLoadDbConfig = `        const res = await window.api.settings.getDbConfig()
        if (res.success && res.databaseUrl) {
          setDatabaseUrl(res.databaseUrl)
          if (res.localIps) {
            setLocalIps(res.localIps)
          }
        }`;

if (content.includes(originalLoadDbConfig)) {
  content = content.replace(originalLoadDbConfig, replacementLoadDbConfig);
} else {
  console.error("originalLoadDbConfig not found!");
}

// 3. Replace Database connection UI section to display Server IP address and have user friendly helpers
const originalDbConfigUi = `        {/* Database Connection Settings (PostgreSQL Networking) */}
        <div className="col-span-12 bg-surface-container-low border border-outline-variant rounded-xl flex flex-col h-fit mt-2">
          <div className="p-4 border-b border-outline-variant bg-surface-container">
            <h2 className="font-bold flex items-center gap-2 text-sm text-primary">
              <span className="material-symbols-outlined">database</span>
              {lang === 'ar' ? 'إعدادات ربط قواعد البيانات الشبكية والاتصال المتعدد' : 'Database Server Connection (Network DB)'}
            </h2>
          </div>
          <div className="p-6">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {lang === 'ar' 
                  ? 'يمكنك ربط هذا الجهاز بقاعدة بيانات PostgreSQL مركزية ليعمل بشكل متزامن مع أجهزة الكاشير والإدارة الأخرى في نفس المكان.' 
                  : 'Configure this workstation to connect to a central PostgreSQL database server on your local network.'}
              </p>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-on-surface-variant block">
                  {lang === 'ar' ? 'رابط الاتصال بقاعدة البيانات (Connection String)' : 'Database Connection String'}
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
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    if (!databaseUrl) return
                    const res = await window.api.settings.saveDbConfig({ databaseUrl })
                    if (res.success) {
                      alert(lang === 'ar' 
                        ? 'تم حفظ إعدادات الاتصال بنجاح! يرجى إعادة تشغيل التطبيق لتطبيق الاتصال الجديد.' 
                        : 'Database configuration saved! Please restart the application to connect to the new database server.')
                    } else {
                      alert(res.error)
                    }
                  }}
                  className="bg-primary text-on-primary px-5 py-2 rounded font-bold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ إعدادات الاتصال' : 'Save DB Config'}
                </button>
              </div>
            </div>
          </div>
        </div>`;

const replacementDbConfigUi = `        {/* Database Connection Settings (PostgreSQL Networking) */}
        <div className="col-span-12 bg-surface-container-low border border-outline-variant rounded-xl flex flex-col h-fit mt-2">
          <div className="p-4 border-b border-outline-variant bg-surface-container">
            <h2 className="font-bold flex items-center gap-2 text-sm text-primary">
              <span className="material-symbols-outlined">database</span>
              {lang === 'ar' ? 'إعدادات ربط قواعد البيانات والشبكة المحلية' : 'Database Connection & Network Setup'}
            </h2>
          </div>
          <div className="p-6">
            <div className="max-w-2xl space-y-5">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {lang === 'ar' 
                  ? 'يربط هذا الإعداد هذا الجهاز بقاعدة بيانات السيرفر المركزي. إذا كان هذا الجهاز هو الجهاز الرئيسي (السيرفر)، فقم بمشاركة عنوان الـ IP الموضح أدناه مع الأجهزة الفرعية الأخرى.' 
                  : 'Configure this workstation database connection. If this is the main Server computer, share the IP address shown below with the client devices.'}
              </p>

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
                    const constructedUrl = \`postgresql://postgres:\${dbPass}@\${serverIp}:5432/pos_erp?schema=public\`;
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

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    if (!databaseUrl) return
                    const res = await window.api.settings.saveDbConfig({ databaseUrl })
                    if (res.success) {
                      alert(lang === 'ar' 
                        ? 'تم حفظ إعدادات الاتصال بنجاح! يرجى إعادة تشغيل التطبيق لتطبيق الاتصال الجديد.' 
                        : 'Database configuration saved! Please restart the application to connect to the new database server.')
                    } else {
                      alert(res.error)
                    }
                  }}
                  className="bg-primary text-on-primary px-5 py-2 rounded font-bold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'حفظ إعدادات الاتصال' : 'Save Connection Config'}
                </button>
              </div>
            </div>
          </div>
        </div>`;

if (content.includes(originalDbConfigUi)) {
  content = content.replace(originalDbConfigUi, replacementDbConfigUi);
} else {
  console.error("originalDbConfigUi not found!");
}

// Write file back
fs.writeFileSync(filePath, content, 'utf8');
console.log("Layout.tsx modified successfully with Server IP Detection UI!");
