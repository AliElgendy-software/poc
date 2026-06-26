const fs = require('fs');
const filePath = 'src/renderer/src/components/Layout.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Modify handleLogin for CASHIER routing
const originalLogin = `  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const res = await window.api.auth.login({ username: loginUsername, password: loginPassword })
    if (res.success && res.user) {
      setUser(res.user)
      await fetchUserPermissions(res.user.id)
      triggerRefresh()
    } else {
      setLoginError(res.error || 'خطأ في المصادقة')
    }
  }`;

const replacementLogin = `  // Handle Login
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
  }`;

if (content.includes(originalLogin)) {
  content = content.replace(originalLogin, replacementLogin);
} else {
  console.error("originalLogin not found!");
}

// 2. Modify sidebar / main layout margins
const originalSidebarAndMain = `      {/* 1. Sidebar Navigation */}
      <aside className={\`h-screen w-64 fixed top-0 bg-surface-container border-outline-variant flex flex-col py-4 z-50 \${
        lang === 'ar'
          ? 'right-0 border-l'
          : 'left-0 border-r'
      }\`}>`;

const replacementSidebarAndMain = `      {/* 1. Sidebar Navigation */}
      {user.role !== 'CASHIER' && (
        <aside className={\`h-screen w-64 fixed top-0 bg-surface-container border-outline-variant flex flex-col py-4 z-50 \${
          lang === 'ar'
            ? 'right-0 border-l'
            : 'left-0 border-r'
        }\`}>`;

if (content.includes(originalSidebarAndMain)) {
  content = content.replace(originalSidebarAndMain, replacementSidebarAndMain);
} else {
  console.error("originalSidebarAndMain not found!");
}

// 3. Modify sidebar end
const originalSidebarEnd = `        <div className="mt-auto px-4 space-y-3">
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

      {/* 2. Main Container (Header + Content + Footer) */}
      <main className={\`flex-1 flex flex-col h-full overflow-hidden transition-all duration-200 \${
        lang === 'ar' ? 'mr-64 ml-0' : 'ml-64 mr-0'
      }\`}>`;

const replacementSidebarEnd = `        <div className="mt-auto px-4 space-y-3">
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
      <main className={\`flex-1 flex flex-col h-full overflow-hidden transition-all duration-200 \${
        user.role === 'CASHIER'
          ? 'm-0'
          : lang === 'ar' ? 'mr-64 ml-0' : 'ml-64 mr-0'
      }\`}>`;

if (content.includes(originalSidebarEnd)) {
  content = content.replace(originalSidebarEnd, replacementSidebarEnd);
} else {
  console.error("originalSidebarEnd not found!");
}

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');
console.log("Layout.tsx updated successfully!");
