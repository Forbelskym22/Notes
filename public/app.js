let currentSubject = null
let currentFile = null

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function loadNav() {
  const nav = document.getElementById('nav')
  const subjects = await fetchJSON('/api/subjects')

  for (const subject of subjects) {
    const section = document.createElement('div')
    section.className = 'nav-section'

    const header = document.createElement('button')
    header.className = 'nav-subject'
    header.textContent = subject
    header.addEventListener('click', () => toggleSubject(section, subject))

    const list = document.createElement('ul')
    list.className = 'nav-notes hidden'

    section.appendChild(header)
    section.appendChild(list)
    nav.appendChild(section)
  }
}

async function toggleSubject(section, subject) {
  const list = section.querySelector('.nav-notes')
  const isOpen = !list.classList.contains('hidden')

  if (isOpen) {
    list.classList.add('hidden')
    return
  }

  list.classList.remove('hidden')

  if (list.children.length > 0) return

  const notes = await fetchJSON(`/api/notes/${encodeURIComponent(subject)}`)
  for (const note of notes) {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.className = 'nav-note'
    btn.textContent = note.title
    btn.dataset.empty = note.empty ? 'true' : 'false'
    btn.addEventListener('click', () => openNote(subject, note.name, note.title))
    li.appendChild(btn)
    list.appendChild(li)
  }
}

async function openNote(subject, file, title) {
  document.querySelectorAll('.nav-note.active').forEach(el => el.classList.remove('active'))
  const buttons = document.querySelectorAll('.nav-note')
  buttons.forEach(btn => {
    if (btn.textContent === title) btn.classList.add('active')
  })

  currentSubject = subject
  currentFile = file

  const data = await fetchJSON(`/api/note/${encodeURIComponent(subject)}/${encodeURIComponent(file)}`)

  document.getElementById('welcome').hidden = true
  const noteView = document.getElementById('note-view')
  noteView.hidden = false

  document.getElementById('note-breadcrumb').textContent = `${subject} / ${title}`
  document.getElementById('note-content').innerHTML = marked.parse(data.content || '_Tento zápisek je zatím prázdný._')
}

document.getElementById('btn-download').addEventListener('click', () => {
  if (!currentSubject || !currentFile) return
  const url = `/api/download/${encodeURIComponent(currentSubject)}/${encodeURIComponent(currentFile)}`
  const a = document.createElement('a')
  a.href = url
  a.download = currentFile
  a.click()
})

document.getElementById('btn-pdf').addEventListener('click', () => {
  if (!currentSubject || !currentFile) return
  window.print()
})

loadNav()
