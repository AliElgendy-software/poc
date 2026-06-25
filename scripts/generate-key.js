const crypto = require('crypto')

const LICENSE_SECRET_SALT = 'ServioSecretLicenseKeyGeneratorSalt2026_AliElgendy'

function generateSignature(machineId, expiryDate) {
  return crypto
    .createHmac('sha256', LICENSE_SECRET_SALT)
    .update(`${machineId}:${expiryDate}`)
    .digest('hex')
    .substring(0, 16)
    .toUpperCase()
}

// Read arguments
const args = process.argv.slice(2)
if (args.length < 2) {
  console.log('\n================================================================')
  console.log('🔑 Servio License Key Generator')
  console.log('Developed by Ali Elgendy')
  console.log('================================================================')
  console.log('Usage:')
  console.log('  node scripts/generate-key.js <MACHINE_ID> <EXPIRY_DATE>')
  console.log('\nExamples:')
  console.log('  node scripts/generate-key.js A1B2C3D4E5F6G7H8 LIFETIME')
  console.log('  node scripts/generate-key.js A1B2C3D4E5F6G7H8 2027-06-10')
  console.log('================================================================\n')
  process.exit(1)
}

const machineId = args[0].trim().toUpperCase()
const expiryDate = args[1].trim().toUpperCase()

// Validate date format if not LIFETIME
if (expiryDate !== 'LIFETIME') {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(expiryDate)) {
    console.error('❌ Error: Expiry date must be in YYYY-MM-DD format or LIFETIME')
    process.exit(1)
  }
  const dateVal = Date.parse(expiryDate)
  if (isNaN(dateVal)) {
    console.error('❌ Error: Invalid date value')
    process.exit(1)
  }
}

const signature = generateSignature(machineId, expiryDate)
const licenseKey = `${expiryDate}-${signature}`

console.log('\n================================================================')
console.log('🔑 LICENSE GENERATION SUCCESSFUL')
console.log('================================================================')
console.log(`💻 Machine ID:  ${machineId}`)
console.log(`📅 Expiry Date: ${expiryDate}`)
console.log(`🔑 License Key: ${licenseKey}`)
console.log('================================================================\n')
