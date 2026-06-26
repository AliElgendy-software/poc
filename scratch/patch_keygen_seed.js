const fs = require('fs');
const filePath = 'scratch/keygen_app/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// The original seed value in keygen_app/index.html was:
// const SEED_HEX = "ab30f47a8b9fbeb818228be37c49d5ee7fdeeecfba6ee01438982de26235e9c7";
// The correct seed hex from your PEM private key is:
// af30f47a8b9fbeb818228be37c49d5ee7fdee7bc4fba6ee01438982de26235e9

const originalSeed = 'const SEED_HEX = "ab30f47a8b9fbeb818228be37c49d5ee7fdeeecfba6ee01438982de26235e9c7";';
const replacementSeed = 'const SEED_HEX = "af30f47a8b9fbeb818228be37c49d5ee7fdee7bc4fba6ee01438982de26235e9";';

if (content.includes(originalSeed)) {
  content = content.replace(originalSeed, replacementSeed);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("keygen_app/index.html private key seed corrected successfully!");
} else {
  console.error("originalSeed declaration not found in keygen_app/index.html!");
}
