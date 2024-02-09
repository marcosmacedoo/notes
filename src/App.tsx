import { ChangeEvent, useState } from 'react'
import { NewNoteCard, NoteCard } from './components'

import logoImg from './assets/logo.svg'

interface Note {
  id: string
  date: Date
  content: string
}

function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('NOTES')

    if (!notesOnStorage) return []

    return JSON.parse(notesOnStorage)
  })

  const generateRandomId = () => crypto.randomUUID()

  const handleSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setSearch(value)

  function onNoteCreated(content: string) {
    const newNote = {
      id: generateRandomId(),
      date: new Date(),
      content,
    }
    const updatedNotes = [newNote, ...notes]

    setNotes(updatedNotes)
    localStorage.setItem('NOTES', JSON.stringify(updatedNotes))
  }


  function onNoteDeleted(id: string) {
    const updatedNotes = notes.filter(note => note.id !== id)

    setNotes(updatedNotes)
    localStorage.setItem('NOTES', JSON.stringify(updatedNotes))
  }

  const filteredNotes =
    search.length > 0
      ? notes.filter((note) =>
          note.content.toLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes

  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logoImg} alt="Logo NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          name="text-search"
          id="text-search"
          value={search}
          onChange={handleSearch}
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          placeholder="Busque em suas notas..."
        />
      </form>

      <div className="h-px bg-slate-700" />

      <section className="grid grid-col md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </section>
    </main>
  )
}

export { App }
