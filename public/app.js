let currentSubject = null
let currentFile = null

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function openSidebar() {
  document.getElementById('sidebar').classList.remove('-translate-x-full')
  document.getElementById('overlay').classList.remove('hidden')
}

function closeSidebar() {
  document.getElementById('sidebar').classList.add('-translate-x-full')
  document.getElementById('overlay').classList.add('hidden')
}

document.getElementById('btn-open-sidebar').addEventListener('click', openSidebar)
document.getElementById('btn-close-sidebar').addEventListener('click', closeSidebar)
document.getElementById('overlay').addEventListener('click', closeSidebar)

function clearActive() {
  document.querySelectorAll('nav [data-active]').forEach(el => {
    el.removeAttribute('data-active')
    el.classList.remove('bg-amber-100', 'text-amber-900', 'font-medium')
    el.classList.add('text-gray-600')
  })
}

function setActive(btn) {
  clearActive()
  btn.setAttribute('data-active', '1')
  btn.classList.add('bg-amber-100', 'text-amber-900', 'font-medium')
  btn.classList.remove('text-gray-600')
}

async function showNote(subject, file, title, fetchUrl) {
  const data = await fetchJSON(fetchUrl)
  document.getElementById('welcome').classList.add('hidden')
  document.getElementById('note-view').classList.remove('hidden')
  document.getElementById('note-breadcrumb').textContent = subject ? `${subject} / ${title}` : title
  document.getElementById('mobile-title').textContent = title
  document.getElementById('note-content').innerHTML = marked.parse(data.content || '_Tento zápisek je zatím prázdný._')
  currentSubject = subject
  currentFile = file
}

async function loadNav() {
  const nav = document.getElementById('nav')

  // Root files (Témata, dotazy)
  const rootNotes = await fetchJSON('/api/root-notes')
  if (rootNotes.length > 0) {
    const section = document.createElement('div')
    section.className = 'border-b border-amber-100 py-1'
    for (const note of rootNotes) {
      const btn = document.createElement('button')
      btn.className = 'w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-900 transition-colors flex items-center gap-2'
      const icon = note.title === 'Témata'
        ? `<svg class="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`
        : `<svg class="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
      btn.innerHTML = `${icon}<span>${note.title}</span>`
      btn.addEventListener('click', () => {
        setActive(btn)
        showNote(null, note.name, note.title, `/api/note/_root/${encodeURIComponent(note.name)}`)
        closeSidebar()
      })
      section.appendChild(btn)
    }
    nav.appendChild(section)
  }

  // Subject folders
  const subjects = await fetchJSON('/api/subjects')
  for (const subject of subjects) {
    const section = document.createElement('div')
    section.className = 'border-b border-amber-100'

    const header = document.createElement('button')
    header.className = 'w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-amber-50 transition-colors flex items-center justify-between'
    header.innerHTML = `<span>${subject}</span><svg class="w-3 h-3 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`
    header.addEventListener('click', () => toggleSubject(section, subject))

    const list = document.createElement('ul')
    list.className = 'hidden pb-1'

    section.appendChild(header)
    section.appendChild(list)
    nav.appendChild(section)
  }
}

async function toggleSubject(section, subject) {
  const list = section.querySelector('ul')
  const icon = section.querySelector('svg')
  const isOpen = !list.classList.contains('hidden')

  if (isOpen) {
    list.classList.add('hidden')
    icon.classList.remove('rotate-180')
    return
  }

  list.classList.remove('hidden')
  icon.classList.add('rotate-180')

  if (list.children.length > 0) return

  const notes = await fetchJSON(`/api/notes/${encodeURIComponent(subject)}`)
  for (const note of notes) {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.className = 'w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-900 transition-colors flex items-center gap-2.5'

    const match = note.title.match(/^(\d+)\.\s(.+)$/)
    if (match) {
      btn.innerHTML = `
        <span class="shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex items-center justify-center">${match[1]}</span>
        <span class="truncate">${match[2]}</span>`
    } else {
      btn.innerHTML = `<span class="truncate pl-8">${note.title}</span>`
    }

    btn.addEventListener('click', () => {
      setActive(btn)
      showNote(subject, note.name, note.title, `/api/note/${encodeURIComponent(subject)}/${encodeURIComponent(note.name)}`)
      closeSidebar()
    })
    li.appendChild(btn)
    list.appendChild(li)
  }
}

document.getElementById('btn-download').addEventListener('click', () => {
  if (!currentFile) return
  const url = currentSubject
    ? `/api/download/${encodeURIComponent(currentSubject)}/${encodeURIComponent(currentFile)}`
    : `/api/download/_root/${encodeURIComponent(currentFile)}`
  const a = document.createElement('a')
  a.href = url
  a.download = currentFile
  a.click()
})

document.getElementById('btn-pdf').addEventListener('click', () => {
  if (!currentFile) return
  window.print()
})

loadNav()
