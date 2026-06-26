const crypto = require('crypto');
const fs = require('fs');

// We use Ed25519 for signature scheme
// Generate Ed25519 key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');

// Save them PEM formatted
const publicPem = publicKey.export({ type: 'spki', format: 'pem' });
const privatePem = privateKey.export({ type: 'pkcs8', format: 'pem' });

fs.writeFileSync('scripts/developer_private_key.pem', privatePem, 'utf8');
fs.writeFileSync('src/main/developer_public_key.pem', publicPem, 'utf8');

console.log("KeyPair generated successfully! Private key saved in scripts/ and Public key saved in src/main/");
