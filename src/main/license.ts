import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'
import { app } from 'electron'

// Secret Salt known only to the developer (Ali Elgendy) and the app
const LICENSE_SECRET_SALT = 'ServioSecretLicenseKeyGeneratorSalt2026_AliElgendy'
const PUBLIC_MACHINE_SALT = 'ServioPublicMachineIDFingerprintSalt2026'

export interface LicenseStatus {
  activated: boolean
  machineId: string
  expiryDate?: string
  statusMessageAr: string
  statusMessageEn: string
}

// 1. Get raw system identifier
function getRawMachineId(): string {
  try {
    if (process.platform === 'win32') {
      const output = execSync('reg query HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid').toString()
      const match = output.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)
      if (match) return match[0].trim()
    } else if (process.platform === 'linux') {
      if (fs.existsSync('/etc/machine-id')) {
        return fs.readFileSync('/etc/machine-id', 'utf8').trim()
      }
      if (fs.existsSync('/var/lib/dbus/machine-id')) {
        return fs.readFileSync('/var/lib/dbus/machine-id', 'utf8').trim()
      }
    } else if (process.platform === 'darwin') {
      const output = execSync('ioreg -rd1 -c IOPlatformExpertDevice').toString()
      const match = output.match(/"IOPlatformUUID"\s*=\s*"([^"]+)"/)
      if (match) return match[1].trim()
    }
  } catch (err) {
    console.error('Failed to get native machine ID, falling back to local file ID', err)
  }

  // Fallback: Persistent generated ID
  const fallbackPath = path.join(app.getPath('userData'), '.machine_id')
  if (fs.existsSync(fallbackPath)) {
    return fs.readFileSync(fallbackPath, 'utf8').trim()
  } else {
    const newId = crypto.randomUUID()
    fs.writeFileSync(fallbackPath, newId, 'utf8')
    return newId
  }
}

// 2. Get hashed Machine ID shown to the user (16 characters uppercase)
export function getMachineId(): string {
  const rawId = getRawMachineId()
  return crypto
    .createHmac('sha256', PUBLIC_MACHINE_SALT)
    .update(rawId)
    .digest('hex')
    .substring(0, 16)
    .toUpperCase()
}

// 3. Helper to get license file path
function getLicenseFilePath(): string {
  return path.join(app.getPath('userData'), 'license.json')
}

// 4. Generate key signature for a given machine ID and expiry date
export function generateSignature(machineId: string, expiryDate: string): string {
  return crypto
    .createHmac('sha256', LICENSE_SECRET_SALT)
    .update(`${machineId}:${expiryDate}`)
    .digest('hex')
    .substring(0, 16)
    .toUpperCase()
}

// 5. Verify the license key structure and signature
export function verifyLicenseKey(key: string, machineId: string): { valid: boolean; expiryDate?: string } {
  try {
    const parts = key.trim().split('-')
    if (parts.length < 2) return { valid: false }

    // Reconstruct expiryDate and signature
    const signature = parts[parts.length - 1]
    const expiryDate = parts.slice(0, parts.length - 1).join('-').toUpperCase() // 'LIFETIME' or 'YYYY-MM-DD'

    const expectedSignature = generateSignature(machineId, expiryDate)
    if (signature !== expectedSignature) return { valid: false }

    return { valid: true, expiryDate }
  } catch (err) {
    return { valid: false }
  }
}

// 6. Check license status and validate date integrity
export function checkLicenseStatus(): LicenseStatus {
  const machineId = getMachineId()
  const licensePath = getLicenseFilePath()

  if (!fs.existsSync(licensePath)) {
    return {
      activated: false,
      machineId,
      statusMessageAr: 'البرنامج غير مفعل. يرجى إدخال مفتاح التفعيل.',
      statusMessageEn: 'Software is not activated. Please enter the activation key.'
    }
  }

  try {
    const data = JSON.parse(fs.readFileSync(licensePath, 'utf8'))
    const { licenseKey, lastUsedDate } = data

    if (!licenseKey) {
      return {
        activated: false,
        machineId,
        statusMessageAr: 'البرنامج غير مفعل. يرجى إدخال مفتاح التفعيل.',
        statusMessageEn: 'Software is not activated. Please enter the activation key.'
      }
    }

    // A. Verify Key Signature
    const { valid, expiryDate } = verifyLicenseKey(licenseKey, machineId)
    if (!valid || !expiryDate) {
      return {
        activated: false,
        machineId,
        statusMessageAr: 'مفتاح التنشيط غير صالح أو تم التلاعب به.',
        statusMessageEn: 'The activation key is invalid or has been modified.'
      }
    }

    // B. Check Expiry
    if (expiryDate !== 'LIFETIME') {
      const expiryTime = new Date(expiryDate).getTime()
      const nowTime = new Date().getTime()
      if (nowTime > expiryTime) {
        return {
          activated: false,
          machineId,
          expiryDate,
          statusMessageAr: `انتهت صلاحية ترخيص البرنامج بتاريخ ${expiryDate}.`,
          statusMessageEn: `Software license expired on ${expiryDate}.`
        }
      }
    }

    // C. Clock Tampering Check
    const now = new Date()
    if (lastUsedDate) {
      const lastUsed = new Date(lastUsedDate)
      if (now < lastUsed) {
        return {
          activated: false,
          machineId,
          expiryDate,
          statusMessageAr: 'تم التلاعب بوقت وتاريخ الجهاز. يرجى ضبط الساعة للوقت الحالي.',
          statusMessageEn: 'Device date/time manipulation detected. Please correct system clock.'
        }
      }
    }

    // Update lastUsedDate to now
    fs.writeFileSync(
      licensePath,
      JSON.stringify({ licenseKey, lastUsedDate: now.toISOString() }, null, 2),
      'utf8'
    )

    return {
      activated: true,
      machineId,
      expiryDate,
      statusMessageAr: 'الترخيص نشط وساري.',
      statusMessageEn: 'License is active and valid.'
    }
  } catch (err) {
    return {
      activated: false,
      machineId,
      statusMessageAr: 'حدث خطأ أثناء قراءة ملف الترخيص.',
      statusMessageEn: 'An error occurred while reading the license file.'
    }
  }
}

// 7. Activate the license key
export function activateLicense(key: string): { success: boolean; errorAr?: string; errorEn?: string } {
  const machineId = getMachineId()
  const { valid, expiryDate } = verifyLicenseKey(key, machineId)

  if (!valid || !expiryDate) {
    return {
      success: false,
      errorAr: 'مفتاح التنشيط غير صحيح أو لا يطابق كود هذا الجهاز.',
      errorEn: 'The activation key is incorrect or does not match this machine ID.'
    }
  }

  // Check expiration if not lifetime
  if (expiryDate !== 'LIFETIME') {
    const expiryTime = new Date(expiryDate).getTime()
    const nowTime = new Date().getTime()
    if (nowTime > expiryTime) {
      return {
        success: false,
        errorAr: 'مفتاح التنشيط هذا منتهي الصلاحية بالفعل.',
        errorEn: 'This activation key has already expired.'
      }
    }
  }

  try {
    const licensePath = getLicenseFilePath()
    const data = {
      licenseKey: key.trim(),
      lastUsedDate: new Date().toISOString()
    }
    fs.writeFileSync(licensePath, JSON.stringify(data, null, 2), 'utf8')
    return { success: true }
  } catch (err) {
    return {
      success: false,
      errorAr: 'فشل حفظ ملف التفعيل على القرص.',
      errorEn: 'Failed to write the activation file to disk.'
    }
  }
}
