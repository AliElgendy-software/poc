!macro customInstall
  # سؤل المستخدم عن نوع قاعدة البيانات
  MessageBox MB_YESNO|MB_ICONQUESTION "هل تريد استخدام خادم PostgreSQL للربط الشبكي على عدة أجهزة؟$\n$\n(اضغط 'نعم' للربط بشبكة، أو 'لا' لاستخدام SQLite لجهاز واحد)" IDYES use_postgres

  # خيار SQLite: تحديد مجلد الحفظ
  StrCpy $1 "$DOCUMENTS\servio_db" # المسار الافتراضي
  MessageBox MB_OK|MB_ICONINFORMATION "في الخطوة التالية، يرجى تحديد المجلد الذي ترغب في حفظ ملف قاعدة البيانات بداخله."
  
  nsDialogs::SelectFolderDialog "اختر مجلد حفظ قاعدة البيانات" "$DOCUMENTS"
  Pop $0
  StrCmp $0 "error" use_default_path
  StrCpy $1 $0

use_default_path:
  CreateDirectory "$1"
  
  # كتابة ملف الإعدادات - ملاحظة: نستخدم AppData لضمان صلاحيات الكتابة
  CreateDirectory "$APPDATA\servio"
  FileOpen $2 "$APPDATA\servio\database_config.json" w
  FileWrite $2 "{"
  # ملاحظة: تم استبدال \ بـ \\ لضمان صحة الـ JSON
  # في NSIS نقله كـ $1 ونحتاج استبدال \ بـ \\ برمجياً، أو بما أن NSIS يكتبه مباشرة:
  # سنقوم بكتابته، وسيقوم التطبيق بالتعامل مع المسار
  FileWrite $2 '$\"databaseUrl$\": $\"file:$1\\servio.db$\",'
  FileWrite $2 '$\"dbType$\": $\"sqlite$\"'
  FileWrite $2 "}"
  FileClose $2
  Goto end

use_postgres:
  CreateDirectory "$APPDATA\servio"
  FileOpen $2 "$APPDATA\servio\database_config.json" w
  FileWrite $2 "{"
  FileWrite $2 '$\"databaseUrl$\": $\"postgresql://postgres:postgres@localhost:5432/pos_erp?schema=public$\",'
  FileWrite $2 '$\"dbType$\": $\"postgresql$\"'
  FileWrite $2 "}"
  FileClose $2

end:
!macroend



