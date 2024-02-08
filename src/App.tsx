import logoImg from './assets/logo.svg'
import { NewNoteCard, NoteCard } from './components'

function App() {
  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logoImg} alt="Logo NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          name="text-search"
          id="text-search"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          placeholder="Busque em suas notas..."
        />
      </form>

      <div className="h-px bg-slate-700" />

      <section className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />

        <NoteCard />

        <NoteCard />
      </section>
    </main>
  )
}

export { App }
