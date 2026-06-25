const fs = require('fs')
const path = require('path')
const JavaScriptObfuscator = require('javascript-obfuscator')

const OUT_DIR = path.join(__dirname, '..', 'out')

const options = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: true,
  debugProtectionInterval: 2000,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  selfDefending: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'variable',
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false
}

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f))
  })
}

console.log('Starting full project obfuscation process (Main & Renderer)...')

walkDir(OUT_DIR, function (filePath) {
  // Obfuscate all JavaScript output assets in main and renderer builds
  if (filePath.endsWith('.js') && !filePath.includes('node_modules')) {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    try {
      const obfuscationResult = JavaScriptObfuscator.obfuscate(fileContent, options)
      fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode(), 'utf8')
      console.log(`[Obfuscated] ${filePath}`)
    } catch (err) {
      console.error(`[Error] Failed to obfuscate ${filePath}:`, err)
    }
  }
})

console.log('Obfuscation completed successfully.')
