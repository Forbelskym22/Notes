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

async function loadNav() {
  const nav = document.getElementById('nav')
  const subjects = await fetchJSON('/api/subjects')

  for (const subject of subjects) {
    const section = document.createElement('div')
    section.className = 'border-b border-gray-200'

    const header = document.createElement('button')
    header.className = 'w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:bg-gray-100 transition-colors flex items-center justify-between'
    header.innerHTML = `<span>${subject}</span><svg class="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`
    header.addEventListener('click', () => toggleSubject(section, subject))

    const list = document.createElement('ul')
    list.className = 'hidden'

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
    btn.className = 'w-full text-left px-4 py-2 pl-6 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors'
    btn.textContent = note.title
    btn.addEventListener('click', () => {
      openNote(subject, note.name, note.title)
      closeSidebar()
    })
    li.appendChild(btn)
    list.appendChild(li)
  }
}

async function openNote(subject, file, title) {
  document.querySelectorAll('nav button[data-active]').forEach(el => {
    el.removeAttribute('data-active')
    el.className = 'w-full text-left px-4 py-2 pl-6 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors'
  })

  const allBtns = document.querySelectorAll('nav li button')
  allBtns.forEach(btn => {
    if (btn.textContent === title) {
      btn.className = 'w-full text-left px-4 py-2 pl-6 text-sm font-medium text-blue-700 bg-blue-50'
      btn.setAttribute('data-active', '1')
    }
  })

  currentSubject = subject
  currentFile = file

  const data = await fetchJSON(`/api/note/${encodeURIComponent(subject)}/${encodeURIComponent(file)}`)

  document.getElementById('welcome').classList.add('hidden')
  document.getElementById('note-view').classList.remove('hidden')
  document.getElementById('note-breadcrumb').textContent = `${subject} / ${title}`
  document.getElementById('mobile-title').textContent = title
  document.getElementById('note-content').innerHTML = marked.parse(data.content || '_Tento zápisek je zatím prázdný._')
}

document.getElementById('btn-download').addEventListener('click', () => {
  if (!currentSubject || !currentFile) return
  const a = document.createElement('a')
  a.href = `/api/download/${encodeURIComponent(currentSubject)}/${encodeURIComponent(currentFile)}`
  a.download = currentFile
  a.click()
})

document.getElementById('btn-pdf').addEventListener('click', () => {
  if (!currentSubject || !currentFile) return
  window.print()
})

loadNav()
