import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'
import { app } from 'electron'

// 1. Hardcoded Developer Public Key (Ed25519) to verify licenses.
// Since it's asymmetric, a malicious user cannot forge keys even if they decompile the source.
const PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA4fOE/8A6LxejCMAkjRnkviUSZAfKkZ42ynL1eaT3b1k=
-----END PUBLIC KEY-----`;

export interface LicenseStatus {
  activated: boolean
  machineId: string
  expiryDate?: string
  statusMessageAr: string
  statusMessageEn: string
}

// 2. Hardware Composite Fingerprint: Motherboard UUID + CPU ID + Disk Serial
// Returns an object containing the keys.
function getHardwareFingerprints(): { boardUuid: string; cpuId: string; diskSerial: string } {
  let boardUuid = 'BOARD-UNKNOWN'
  let cpuId = 'CPU-UNKNOWN'
  let diskSerial = 'DISK-UNKNOWN'

  try {
    if (process.platform === 'win32') {
      // Get Motherboard UUID
      try {
        const out = execSync('wmic path win32_computersystemproduct get uuid').toString()
        const lines = out.split('\n').map(l => l.trim()).filter(l => l.length > 0)
        if (lines.length > 1) boardUuid = lines[1]
      } catch {}

      // Get CPU Processor ID
      try {
        const out = execSync('wmic cpu get processorid').toString()
        const lines = out.split('\n').map(l => l.trim()).filter(l => l.length > 0)
        if (lines.length > 1) cpuId = lines[1]
      } catch {}

      // Get OS Disk Serial
      try {
        const out = execSync('wmic diskdrive get serialnumber').toString()
        const lines = out.split('\n').map(l => l.trim()).filter(l => l.length > 0)
        if (lines.length > 1) diskSerial = lines[1]
      } catch {}
    } else if (process.platform === 'linux') {
      // Motherboard UUID
      try {
        if (fs.existsSync('/sys/class/dmi/id/product_uuid')) {
          boardUuid = fs.readFileSync('/sys/class/dmi/id/product_uuid', 'utf8').trim()
        }
      } catch {}

      // CPU ID / Model
      try {
        const out = fs.readFileSync('/proc/cpuinfo', 'utf8')
        const match = out.match(/serial\s*:\s*([^\n]+)/i)
        if (match) cpuId = match[1].trim()
      } catch {}

      // Machine ID (fallback/combo)
      try {
        if (fs.existsSync('/etc/machine-id')) {
          diskSerial = fs.readFileSync('/etc/machine-id', 'utf8').trim()
        }
      } catch {}
    }
  } catch (err) {
    console.error('Failed to query hardware fingerprints:', err)
  }

  return { boardUuid, cpuId, diskSerial }
}

// 3. Composite Machine ID representation shown to the user (16 characters Uppercase)
export function getMachineId(): string {
  const prints = getHardwareFingerprints()
  // Create a combined string
  const rawCombo = `${prints.boardUuid}:${prints.cpuId}:${prints.diskSerial}`
  
  return crypto
    .createHash('sha256')
    .update(rawCombo)
    .digest('hex')
    .substring(0, 16)
    .toUpperCase()
}

// 4. Helper to get license file path
function getLicenseFilePath(): string {
  return path.join(app.getPath('userData'), 'license.json')
}

// 5. Verify the license key using Ed25519 Signature Verification
export function verifyLicenseKey(licenseBase64: string, currentMachineId: string): { valid: boolean; expiryDate?: string } {
  try {
    // The key is a Base64-encoded JSON payload + signature
    const rawPayload = Buffer.from(licenseBase64.trim(), 'base64').toString('utf8')
    const licenseObject = JSON.parse(rawPayload)

    const { machine_id, license_type, expires, signature } = licenseObject
    if (!machine_id || !license_type || !signature) return { valid: false }

    // Resolve structural match (Allow 1 of the composite parts to change or verify direct hashed machine_id)
    // For ultimate protection and simplicity we match the currentMachineId
    if (machine_id !== currentMachineId) {
      return { valid: false }
    }

    // Reconstruct signed message
    const message = `${machine_id}:${license_type}:${expires || 'LIFETIME'}`

    // Verify signature with public key
    const isVerified = crypto.verify(
      null,
      Buffer.from(message, 'utf8'),
      PUBLIC_KEY_PEM,
      Buffer.from(signature, 'hex')
    )

    if (!isVerified) return { valid: false }

    return { valid: true, expiryDate: expires || 'LIFETIME' }
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
        statusMessageAr: 'مفتاح التنشيط غير صالح أو لا يطابق هذا الجهاز.',
        statusMessageEn: 'The activation key is invalid or does not match this machine.'
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
