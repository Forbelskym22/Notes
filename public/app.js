// marked v5+ dropped the highlight option — we post-process instead

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

function setHash(subject, file) {
  const hash = subject ? `${encodeURIComponent(subject)}/${encodeURIComponent(file)}` : `_root/${encodeURIComponent(file)}`
  history.replaceState(null, '', `#${hash}`)
}

function wireInternalLinks() {
  document.querySelectorAll('#note-content a[href]').forEach(a => {
    const href = decodeURIComponent(a.getAttribute('href') || '')
    if (!href.endsWith('.md')) return
    a.removeAttribute('href')
    a.style.cursor = 'pointer'
    a.addEventListener('click', e => {
      e.preventDefault()
      const clean = href.replace(/^\.\//, '')
      const slashIdx = clean.indexOf('/')
      if (slashIdx !== -1) {
        navigateTo(clean.slice(0, slashIdx), clean.slice(slashIdx + 1))
      } else {
        navigateTo(currentSubject, clean)
      }
    })
  })
}

function fixImages(subject) {
  const base = subject ? `/static/${encodeURIComponent(subject)}/` : '/static/'
  document.querySelectorAll('#note-content img').forEach(img => {
    const src = img.getAttribute('src')
    if (!src || src.startsWith('http') || src.startsWith('data:') || src.startsWith('/')) return
    const encoded = src.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/')
    img.src = base + encoded
  })
}

async function navigateTo(subject, file) {
  const section = document.querySelector(`nav [data-subject="${subject}"]`)
  if (section) await toggleSubject(section, subject, true)
  const btn = document.querySelector(`nav [data-file="${file}"]`)
  if (btn) {
    setActive(btn)
    const titleEl = btn.querySelector('span:last-child')
    const numEl = btn.querySelector('span:first-child')
    const title = numEl?.textContent && !isNaN(numEl.textContent)
      ? `${numEl.textContent}. ${titleEl?.textContent}`
      : titleEl?.textContent || file
    showNote(subject, file, title, `/api/note/${encodeURIComponent(subject)}/${encodeURIComponent(file)}`)
  }
}

async function showNote(subject, file, title, fetchUrl, skipHash) {
  const data = await fetchJSON(fetchUrl)
  document.getElementById('welcome').classList.add('hidden')
  document.getElementById('note-view').classList.remove('hidden')
  document.getElementById('mobile-title').textContent = title
  document.getElementById('note-title').textContent = title
  document.getElementById('btn-pdf-mobile').classList.remove('hidden')
  document.getElementById('note-content').innerHTML = marked.parse(data.content || '_Tento zápisek je zatím prázdný._')
  document.querySelectorAll('#note-content pre code').forEach(el => hljs.highlightElement(el))
  wireInternalLinks()
  fixImages(subject)
  currentSubject = subject
  currentFile = file
  if (!skipHash) setHash(subject, file)

  // Zobraz tlačítko Kartičky jen pokud zápisek má karty
  document.getElementById('btn-flashcards').classList.add('hidden')
  const cardsUrl = subject
    ? `/api/flashcards/${encodeURIComponent(subject)}/${encodeURIComponent(file)}`
    : `/api/flashcards/_root/${encodeURIComponent(file)}`
  try {
    const cards = await fetchJSON(cardsUrl)
    if (Array.isArray(cards) && cards.length > 0) {
      document.getElementById('btn-flashcards').classList.remove('hidden')
    }
  } catch { /* žádné kartičky — tlačítko zůstane skryté */ }
}

async function loadNav() {
  const nav = document.getElementById('nav')

  const rootNotes = await fetchJSON('/api/root-notes')
  if (rootNotes.length > 0) {
    const section = document.createElement('div')
    section.className = 'border-b border-amber-100 py-1'
    for (const note of rootNotes) {
      const btn = document.createElement('button')
      btn.className = 'w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-900 transition-colors flex items-center gap-2'
      btn.dataset.rootFile = note.name
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

  const subjects = await fetchJSON('/api/subjects')
  for (const subject of subjects) {
    const section = document.createElement('div')
    section.className = 'border-b border-amber-100'
    section.dataset.subject = subject

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

  restoreFromHash()
}

async function toggleSubject(section, subject, expand) {
  const list = section.querySelector('ul')
  const icon = section.querySelector('svg:last-of-type')
  const isOpen = !list.classList.contains('hidden')

  if (isOpen && !expand) {
    list.classList.add('hidden')
    icon.classList.remove('rotate-180')
    return
  }

  if (!isOpen) {
    list.classList.remove('hidden')
    icon.classList.add('rotate-180')
  }

  if (list.children.length > 0) return list

  const notes = await fetchJSON(`/api/notes/${encodeURIComponent(subject)}`)
  for (const note of notes) {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.className = 'w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-900 transition-colors flex items-center gap-2.5'
    btn.dataset.file = note.name

    const match = note.title.match(/^(\d+)\.\s(.+)$/)
    if (match) {
      btn.innerHTML = `<span class="shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex items-center justify-center">${match[1]}</span><span class="truncate">${match[2]}</span>`
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

  return list
}

async function restoreFromHash() {
  const hash = decodeURIComponent(location.hash.slice(1))
  if (!hash) {
    const temaBtn = document.querySelector('nav [data-root-file="Témata.md"]')
    if (temaBtn) { setActive(temaBtn); showNote(null, 'Témata.md', 'Témata', '/api/note/_root/T%C3%A9mata.md', true) }
    return
  }

  const [part1, part2] = hash.split('/')

  if (part1 === '_root') {
    const btn = document.querySelector(`nav [data-root-file="${part2}"]`)
    if (btn) {
      setActive(btn)
      const title = part2.replace(/\.md$/, '')
      showNote(null, part2, title, `/api/note/_root/${encodeURIComponent(part2)}`, true)
    }
    return
  }

  const subject = part1
  const file = part2
  const section = document.querySelector(`nav [data-subject="${subject}"]`)
  if (!section) return

  await toggleSubject(section, subject, true)

  const btn = section.querySelector(`[data-file="${file}"]`)
  if (!btn) return

  setActive(btn)
  const title = btn.querySelector('span:last-child')?.textContent || file
  const numBadge = btn.querySelector('span:first-child')?.textContent
  const fullTitle = numBadge && !isNaN(numBadge) ? `${numBadge}. ${title}` : title
  showNote(subject, file, fullTitle, `/api/note/${encodeURIComponent(subject)}/${encodeURIComponent(file)}`, true)
}

// ── Kartičky ────────────────────────────────────────────────
let flashcards = []
let flashcardsOriginal = []
let cardIndex = 0
let cardFlipped = false
let cardReversed = false
let cardShuffled = false

function flipCard() {
  cardFlipped = !cardFlipped
  document.getElementById('card-inner').classList.toggle('flipped', cardFlipped)
}

function shuffleDeck() {
  flashcards = [...flashcardsOriginal]
  for (let i = flashcards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]]
  }
}

function showCard(i, newRound = false) {
  cardFlipped = false
  document.getElementById('card-inner').classList.remove('flipped')
  const c = flashcards[i]
  document.getElementById('card-q').textContent = cardReversed ? c.a : c.q
  document.getElementById('card-a').textContent = cardReversed ? c.q : c.a
  document.getElementById('card-counter').textContent = `${i + 1} / ${flashcards.length}`
  document.getElementById('card-prev').disabled = cardShuffled ? i === 0 : i === 0
  document.getElementById('card-next').disabled = false

  if (newRound) {
    const badge = document.getElementById('card-mode-badge')
    badge.textContent = 'Nové kolo 🔄'
    badge.classList.remove('hidden')
    setTimeout(() => {
      badge.textContent = cardReversed ? 'Obrácený mód' : ''
      if (!cardReversed) badge.classList.add('hidden')
      else badge.classList.remove('hidden')
    }, 1500)
  }
}

function prevCard() { if (cardIndex > 0) showCard(--cardIndex) }
function nextCard() {
  if (cardShuffled && cardIndex === flashcards.length - 1) {
    shuffleDeck()
    cardIndex = 0
    showCard(0, true)
  } else if (cardIndex < flashcards.length - 1) {
    showCard(++cardIndex)
  }
}

function toggleShuffle() {
  cardShuffled = !cardShuffled
  if (cardShuffled) {
    shuffleDeck()
  } else {
    flashcards = [...flashcardsOriginal]
  }
  const btns = [document.getElementById('btn-shuffle-cards'), document.getElementById('btn-shuffle-cards-mobile')]
  btns.forEach(btn => {
    if (!btn) return
    if (cardShuffled) {
      btn.classList.add('bg-amber-100', 'border-amber-300', 'text-amber-900')
      btn.classList.remove('text-gray-600', 'border-gray-300')
    } else {
      btn.classList.remove('bg-amber-100', 'border-amber-300', 'text-amber-900')
      btn.classList.add('text-gray-600', 'border-gray-300')
    }
  })
  cardIndex = 0
  showCard(0)
}

function toggleReversed() {
  cardReversed = !cardReversed
  const badge = document.getElementById('card-mode-badge')
  badge.textContent = 'Obrácený mód'
  badge.classList.toggle('hidden', !cardReversed)
  const btns = [document.getElementById('btn-reverse-cards'), document.getElementById('btn-reverse-cards-mobile')]
  btns.forEach(btn => {
    if (!btn) return
    if (cardReversed) {
      btn.classList.add('bg-amber-100', 'border-amber-300', 'text-amber-900')
      btn.classList.remove('text-gray-600', 'border-gray-300')
    } else {
      btn.classList.remove('bg-amber-100', 'border-amber-300', 'text-amber-900')
      btn.classList.add('text-gray-600', 'border-gray-300')
    }
  })
  showCard(cardIndex)
}

async function openFlashcards() {
  if (!currentFile) return
  document.getElementById('note-view').classList.add('hidden')
  document.getElementById('welcome').classList.add('hidden')
  const view = document.getElementById('flashcard-view')
  view.classList.remove('hidden')
  document.getElementById('flashcard-loading').classList.remove('hidden')
  document.getElementById('flashcard-content').classList.add('hidden')
  document.getElementById('flashcard-error').classList.add('hidden')
  // reset modes
  cardReversed = false
  cardShuffled = false
  document.getElementById('card-mode-badge').classList.add('hidden')
  ;[
    document.getElementById('btn-reverse-cards'),
    document.getElementById('btn-reverse-cards-mobile'),
    document.getElementById('btn-shuffle-cards'),
    document.getElementById('btn-shuffle-cards-mobile'),
  ].forEach(btn => {
    if (!btn) return
    btn.classList.remove('bg-amber-100', 'border-amber-300', 'text-amber-900')
    btn.classList.add('text-gray-600', 'border-gray-300')
  })

  try {
    const url = currentSubject
      ? `/api/flashcards/${encodeURIComponent(currentSubject)}/${encodeURIComponent(currentFile)}`
      : `/api/flashcards/_root/${encodeURIComponent(currentFile)}`
    const data = await fetchJSON(url)
    flashcardsOriginal = Array.isArray(data) && data.length ? data : null
    flashcards = flashcardsOriginal ? [...flashcardsOriginal] : null
    document.getElementById('flashcard-loading').classList.add('hidden')
    if (!flashcards) {
      document.getElementById('flashcard-error').classList.remove('hidden')
      document.getElementById('flashcard-error').textContent = 'Pro tento zápisek kartičky zatím nejsou.'
    } else {
      cardIndex = 0
      document.getElementById('flashcard-content').classList.remove('hidden')
      showCard(0)
    }
  } catch {
    document.getElementById('flashcard-loading').classList.add('hidden')
    document.getElementById('flashcard-error').classList.remove('hidden')
  }
}

function closeFlashcards() {
  document.getElementById('flashcard-view').classList.add('hidden')
  document.getElementById('note-view').classList.remove('hidden')
}

document.getElementById('btn-flashcards').addEventListener('click', openFlashcards)
document.getElementById('btn-back-to-note').addEventListener('click', closeFlashcards)
document.getElementById('btn-back-to-note-mobile').addEventListener('click', closeFlashcards)
document.getElementById('card-prev').addEventListener('click', prevCard)
document.getElementById('card-next').addEventListener('click', nextCard)
document.getElementById('btn-reverse-cards').addEventListener('click', toggleReversed)
document.getElementById('btn-reverse-cards-mobile').addEventListener('click', toggleReversed)
document.getElementById('btn-shuffle-cards').addEventListener('click', toggleShuffle)
document.getElementById('btn-shuffle-cards-mobile').addEventListener('click', toggleShuffle)

document.addEventListener('keydown', e => {
  if (document.getElementById('flashcard-view').classList.contains('hidden')) return
  if (e.key === 'ArrowLeft') prevCard()
  else if (e.key === 'ArrowRight') nextCard()
  else if (e.key === ' ') { e.preventDefault(); flipCard() }
  else if (e.key === 'Escape') closeFlashcards()
})

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

async function downloadPdf() {
  if (!currentFile) return
  const url = currentSubject
    ? `/api/pdf/${encodeURIComponent(currentSubject)}/${encodeURIComponent(currentFile)}`
    : `/api/pdf/_root/${encodeURIComponent(currentFile)}`
  const res = await fetch(url)
  const blob = await res.blob()
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = currentFile.replace('.md', '.pdf')
  a.click()
}

document.getElementById('btn-pdf-mobile').addEventListener('click', downloadPdf)

document.getElementById('btn-pdf').addEventListener('click', downloadPdf)

loadNav()
