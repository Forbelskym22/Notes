const express = require('express')
const fs = require('fs')
const path = require('path')
const { marked } = require('marked')
const hljs = require('highlight.js')
const puppeteer = require('puppeteer-core')

const hljsCss = fs.readFileSync(require.resolve('highlight.js/styles/github.css'), 'utf8')

const renderer = new marked.Renderer()
renderer.code = ({ text, lang }) => {
  const highlighted = lang && hljs.getLanguage(lang)
    ? hljs.highlight(text, { language: lang }).value
    : hljs.highlightAuto(text).value
  return `<pre><code class="hljs">${highlighted}</code></pre>`
}
marked.use({ renderer })

const CHROMIUM_PATH = process.env.CHROMIUM_PATH || (process.platform === 'win32'
  ? 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
  : '/usr/bin/chromium')

function buildPdfHtml(title, markdown) {
  const content = marked(markdown)
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>${hljsCss}</style>
<style>
  body { font-family: -apple-system, system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #111; font-size: 15px; line-height: 1.7; }
  h1 { font-size: 2em; text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5em; margin-bottom: 1.5em; }
  h2 { font-size: 1.4em; margin-top: 2em; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.3em; }
  h3 { font-size: 1.1em; color: #374151; }
  pre { background: #f6f8fa; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; overflow-x: auto; }
  code { font-family: 'Cascadia Code', 'Fira Code', monospace; font-size: 0.88em; }
  :not(pre) > code { background: #f3f4f6; padding: 0.15em 0.4em; border-radius: 4px; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; }
  th { background: #f9fafb; font-weight: 600; }
  blockquote { border-left: 3px solid #d1d5db; margin: 0; padding-left: 1em; color: #6b7280; }
  @page { margin: 20mm; }
  @page { @bottom-center { content: counter(page) " / " counter(pages); font-size: 12px; color: #9ca3af; } }
</style></head><body>
<h1>${title}</h1>
${content}
</body></html>`
}

const app = express()
const PORT = process.env.PORT || 4000
const NOTES_ROOT = path.join(__dirname, 'Maturita', 'ústní')

app.use(express.static(path.join(__dirname, 'public')))

function safePath(subject, file) {
  const subjectDir = path.join(NOTES_ROOT, subject)
  const resolved = file ? path.join(subjectDir, file) : subjectDir
  if (!resolved.startsWith(NOTES_ROOT)) return null
  return resolved
}

app.get('/api/subjects', (_req, res) => {
  const entries = fs.readdirSync(NOTES_ROOT, { withFileTypes: true })
  const subjects = entries
    .filter(e => e.isDirectory())
    .map(e => e.name)
  res.json(subjects)
})

app.get('/api/root-notes', (_req, res) => {
  const files = fs.readdirSync(NOTES_ROOT, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.md') && e.name !== 'dotazy.md')
    .map(e => ({ name: e.name, title: e.name.replace(/\.md$/, '') }))
  res.json(files)
})

app.get('/api/note/_root/:file', (req, res) => {
  const filePath = path.join(NOTES_ROOT, req.params.file)
  if (!filePath.startsWith(NOTES_ROOT)) return res.status(400).json({ error: 'Invalid path' })
  if (!filePath.endsWith('.md')) return res.status(400).json({ error: 'Only .md files allowed' })
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Note not found' })
  res.json({ content: fs.readFileSync(filePath, 'utf8') })
})

app.get('/api/notes/:subject', (req, res) => {
  const dir = safePath(req.params.subject)
  if (!dir) return res.status(400).json({ error: 'Invalid path' })

  if (!fs.existsSync(dir)) return res.status(404).json({ error: 'Subject not found' })

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const match = f.match(/^(\d+)_(.+)\.md$/)
      return match
        ? { name: f, num: parseInt(match[1]), title: `${match[1]}. ${match[2]}` }
        : { name: f, num: Infinity, title: f.replace(/\.md$/, '') }
    })
    .sort((a, b) => a.num - b.num)

  res.json(files)
})

app.get('/api/note/:subject/:file', (req, res) => {
  const filePath = safePath(req.params.subject, req.params.file)
  if (!filePath) return res.status(400).json({ error: 'Invalid path' })
  if (!filePath.endsWith('.md')) return res.status(400).json({ error: 'Only .md files allowed' })
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Note not found' })

  const content = fs.readFileSync(filePath, 'utf8')
  res.json({ content })
})

async function generatePdf(filePath, title, res) {
  const content = fs.readFileSync(filePath, 'utf8')
  const html = buildPdfHtml(title, content)
  const browser = await puppeteer.launch({ executablePath: CHROMIUM_PATH, args: ['--no-sandbox'] })
  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const pdf = await page.pdf({ format: 'A4', printBackground: true })
    const filename = encodeURIComponent(path.basename(filePath, '.md')) + '.pdf'
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${filename}`)
    res.send(pdf)
  } finally {
    await browser.close()
  }
}

app.get('/api/pdf/_root/:file', async (req, res) => {
  const filePath = path.join(NOTES_ROOT, req.params.file)
  if (!filePath.startsWith(NOTES_ROOT) || !filePath.endsWith('.md')) return res.status(400).end()
  if (!fs.existsSync(filePath)) return res.status(404).end()
  const title = req.params.file.replace(/\.md$/, '')
  await generatePdf(filePath, title, res)
})

app.get('/api/pdf/:subject/:file', async (req, res) => {
  const filePath = safePath(req.params.subject, req.params.file)
  if (!filePath || !filePath.endsWith('.md')) return res.status(400).end()
  if (!fs.existsSync(filePath)) return res.status(404).end()
  const match = req.params.file.match(/^(\d+)_(.+)\.md$/)
  const title = match ? `${match[1]}. ${match[2]}` : req.params.file.replace(/\.md$/, '')
  await generatePdf(filePath, title, res)
})

app.get('/api/download/:subject/:file', (req, res) => {
  const filePath = safePath(req.params.subject, req.params.file)
  if (!filePath) return res.status(400).json({ error: 'Invalid path' })
  if (!filePath.endsWith('.md')) return res.status(400).json({ error: 'Only .md files allowed' })
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Note not found' })

  res.download(filePath)
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
