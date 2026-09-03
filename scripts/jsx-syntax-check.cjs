const fs = require('node:fs')
const path = require('node:path')

let ts
try {
  ts = require('typescript')
} catch {
  ts = require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript')
}

const root = process.cwd()
const files = []

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.(jsx|js)$/.test(entry.name)) files.push(full)
  }
}

walk(path.join(root, 'src'))

let failures = 0
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8')
  const kind = file.endsWith('.jsx') ? ts.ScriptKind.JSX : ts.ScriptKind.JS
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, kind)

  if (ast.parseDiagnostics.length) {
    failures += ast.parseDiagnostics.length
    console.log(`FAIL ${path.relative(root, file)}`)
    for (const d of ast.parseDiagnostics) {
      const pos = ast.getLineAndCharacterOfPosition(d.start || 0)
      console.log(`  ${pos.line + 1}:${pos.character + 1} ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`)
    }
  }
}

if (failures) process.exit(1)
console.log(`PASS JSX/JS syntax: ${files.length} files`)
