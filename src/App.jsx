import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'ai-notes-vibe-app.notes'

function loadNotes() {
  try {
    const savedNotes = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(savedNotes) ? savedNotes : []
  } catch {
    return []
  }
}

function App() {
  const [notes, setNotes] = useState(loadNotes)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const filteredNotes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return notes
    }

    return notes.filter((note) =>
      `${note.title} ${note.body}`.toLowerCase().includes(query),
    )
  }, [notes, searchTerm])

  const resetForm = () => {
    setTitle('')
    setBody('')
    setEditingId(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedBody = body.trim()

    if (!trimmedTitle || !trimmedBody) {
      return
    }

    if (editingId) {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === editingId
            ? { ...note, title: trimmedTitle, body: trimmedBody }
            : note,
        ),
      )
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        body: trimmedBody,
      }

      setNotes((currentNotes) => [newNote, ...currentNotes])
    }

    resetForm()
  }

  const handleEdit = (note) => {
    setTitle(note.title)
    setBody(note.body)
    setEditingId(note.id)
  }

  const handleDelete = (noteId) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== noteId))

    if (editingId === noteId) {
      resetForm()
    }
  }

  return (
    <main className="app-shell">
      <section className="app-header">
        <div>
          <p className="eyebrow">Local notes</p>
          <h1>Notes App</h1>
          <p className="intro">
            Capture simple notes, edit them later, and keep them saved in your
            browser.
          </p>
        </div>
      </section>

      <section className="notes-layout">
        <form className="note-form" onSubmit={handleSubmit}>
          <h2>{editingId ? 'Edit note' : 'Create a note'}</h2>

          <label htmlFor="note-title">Title</label>
          <input
            id="note-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Meeting ideas"
          />

          <label htmlFor="note-body">Body</label>
          <textarea
            id="note-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write your note here..."
            rows="7"
          />

          <div className="form-actions">
            <button type="submit">{editingId ? 'Save changes' : 'Add note'}</button>
            {editingId && (
              <button type="button" className="secondary-button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <section className="notes-panel" aria-labelledby="notes-heading">
          <div className="notes-toolbar">
            <div>
              <h2 id="notes-heading">Saved notes</h2>
              <p>
                {notes.length === 1
                  ? '1 note saved'
                  : `${notes.length} notes saved`}
              </p>
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search notes"
              aria-label="Search notes"
            />
          </div>

          {notes.length === 0 ? (
            <div className="empty-state">
              <h3>No notes yet</h3>
              <p>Create your first note with a title and body.</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="empty-state">
              <h3>No matches found</h3>
              <p>Try a different search term.</p>
            </div>
          ) : (
            <div className="notes-grid">
              {filteredNotes.map((note) => (
                <article className="note-card" key={note.id}>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                  <div className="card-actions">
                    <button type="button" onClick={() => handleEdit(note)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
