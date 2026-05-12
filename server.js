const express = require('express')
const fs = require('fs')
const path = require('path')

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
