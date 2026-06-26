!macro customInstall
  # Ask the user if they want to install PostgreSQL for network setups
  MessageBox MB_YESNO|MB_ICONQUESTION "هل تريد تثبيت خادم قواعد البيانات PostgreSQL لتشغيل النظام شبكياً على عدة أجهزة؟$\n$\n(اضغط 'نعم' لتثبيت PostgreSQL للربط الشبكي، أو اضغط 'لا' لاستخدام SQLite الخفيف المدمج لجهاز واحد بدون خادم)" IDNO use_sqlite

  # User chose YES: PostgreSQL
  DetailPrint "Installing PostgreSQL server silently..."
  IfFileExists "$INSTDIR\resources\bin\postgresql-installer.exe" 0 +2
    ExecWait '"$INSTDIR\resources\bin\postgresql-installer.exe" --mode unattended --unattendedmodeui none --superuserpassword "postgres" --serverport 5432'
  
  # Write default PostgreSQL configuration file
  FileOpen $0 "$INSTDIR\database_config.json" w
  FileWrite $0 "{"
  FileWrite $0 '$\"databaseUrl$\": $\"postgresql://postgres:postgres@localhost:5432/pos_erp?schema=public$\",'
  FileWrite $0 '$\"dbType$\": $\"postgresql$\"'
  FileWrite $0 "}"
  FileClose $0
  Goto end

use_sqlite:
  # User chose NO: SQLite
  DetailPrint "Configuring system for SQLite single-device mode..."
  # Write default SQLite configuration file
  FileOpen $0 "$INSTDIR\database_config.json" w
  FileWrite $0 "{"
  FileWrite $0 '$\"databaseUrl$\": $\"file:servio.db$\",'
  FileWrite $0 '$\"dbType$\": $\"sqlite$\"'
  FileWrite $0 "}"
  FileClose $0

end:
!macroend
