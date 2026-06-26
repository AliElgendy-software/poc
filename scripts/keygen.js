const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const PRIVATE_KEY_PATH = 'scripts/developer_private_key.pem';

if (!fs.existsSync(PRIVATE_KEY_PATH)) {
  console.error("Error: Private key not found. Run scripts/gen_keypair.js first.");
  process.exit(1);
}

const PRIVATE_KEY_PEM = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');

console.log("\n==============================================");
console.log("    Servio POS System - License Key Generator");
console.log("==============================================\n");

rl.question('1. Enter Client Machine ID (16 chars): ', (machineId) => {
  const cleanId = machineId.trim().toUpperCase();
  if (cleanId.length !== 16) {
    console.error("Error: Machine ID must be exactly 16 characters.");
    rl.close();
    process.exit(1);
  }

  console.log('\nSelect License Type:');
  console.log('1. Lifetime (مدى الحياة)');
  console.log('2. Trial Days (عدد أيام تجريبية)');
  console.log('3. Custom Expiry Date (تاريخ انتهاء محدد YYYY-MM-DD)');
  
  rl.question('Choice (1/2/3): ', (choice) => {
    let expiryDate = 'LIFETIME';
    let licenseType = 'lifetime';

    if (choice === '2') {
      rl.question('Enter number of trial days (e.g. 30): ', (days) => {
        const daysNum = parseInt(days) || 30;
        const d = new Date();
        d.setDate(d.getDate() + daysNum);
        expiryDate = d.toISOString().split('T')[0];
        licenseType = 'trial';
        generateAndPrintKey(cleanId, licenseType, expiryDate);
      });
    } else if (choice === '3') {
      rl.question('Enter expiry date (YYYY-MM-DD): ', (dateStr) => {
        expiryDate = dateStr.trim();
        licenseType = 'subscription';
        generateAndPrintKey(cleanId, licenseType, expiryDate);
      });
    } else {
      generateAndPrintKey(cleanId, licenseType, expiryDate);
    }
  });
});

function generateAndPrintKey(machineId, licenseType, expiryDate) {
  // Reconstruct message
  const message = `${machineId}:${licenseType}:${expiryDate}`;

  // Sign message using Ed25519 Private Key
  const signature = crypto.sign(
    null,
    Buffer.from(message, 'utf8'),
    PRIVATE_KEY_PEM
  );

  // Construct license object payload
  const licenseObj = {
    machine_id: machineId,
    license_type: licenseType,
    expires: expiryDate === 'LIFETIME' ? null : expiryDate,
    signature: signature.toString('hex')
  };

  // Convert license payload to Base64 (This is the key given to the client)
  const licenseKey = Buffer.from(JSON.stringify(licenseObj), 'utf8').toString('base64');

  console.log("\n==============================================");
  console.log("   GENERATED LICENSE KEY (مفتاح التنشيط الجاهز)");
  console.log("==============================================\n");
  console.log(licenseKey);
  console.log("\n==============================================");
  console.log(`Machine ID:   ${machineId}`);
  console.log(`License Type: ${licenseType}`);
  console.log(`Expiry Date:  ${expiryDate}`);
  console.log("==============================================\n");

  rl.close();
}
