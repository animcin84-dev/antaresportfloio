import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const sentinel = path.join(publicDir, 'assets', 'v7', 'abai-bol-logo.avif')
const archive = path.join(root, 'source-assets', 'public-assets.tar.gz')
const transferDir = path.join(root, 'source-assets', 'github-transfer')

if (fs.existsSync(sentinel)) process.exit(0)

const readPackedAssets = () => {
  if (fs.existsSync(archive)) return fs.readFileSync(archive)
  const parts = fs.existsSync(transferDir)
    ? fs.readdirSync(transferDir).filter(name => /^v7-media\.b64\.\d+$/.test(name)).sort()
    : []
  if (!parts.length) {
    console.error('Missing public assets, source-assets/public-assets.tar.gz, and GitHub transfer chunks')
    process.exit(1)
  }
  const base64 = parts.map(name => fs.readFileSync(path.join(transferDir, name), 'utf8').trim()).join('')
  return Buffer.from(base64, 'base64')
}

const buffer = zlib.gunzipSync(readPackedAssets())
let offset = 0
const readString = (start, length) => buffer.subarray(start, start + length).toString('utf8').replace(/\0.*$/, '')
const readOctal = (start, length) => parseInt(readString(start, length).trim() || '0', 8)

while (offset + 512 <= buffer.length) {
  const header = buffer.subarray(offset, offset + 512)
  if (header.every(byte => byte === 0)) break

  const name = readString(offset, 100)
  const prefix = readString(offset + 345, 155)
  const entry = prefix ? `${prefix}/${name}` : name
  const size = readOctal(offset + 124, 12)
  const type = readString(offset + 156, 1) || '0'
  const normalized = path.posix.normalize(entry).replace(/^\.\//, '')

  if (normalized.startsWith('/') || normalized.includes('..') || !normalized.startsWith('assets/v7/')) {
    throw new Error(`Unsafe asset archive entry: ${entry}`)
  }

  const target = path.join(publicDir, ...normalized.split('/'))
  if (type === '5') {
    fs.mkdirSync(target, { recursive: true })
  } else if (type === '0' || type === '') {
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, buffer.subarray(offset + 512, offset + 512 + size))
  }

  offset += 512 + Math.ceil(size / 512) * 512
}

if (!fs.existsSync(sentinel)) throw new Error('Asset archive extracted but sentinel is still missing')
console.log('Prepared ABAI BOL public assets from packed source archive.')
