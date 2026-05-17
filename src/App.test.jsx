import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

const STORAGE_KEY = 'ai-notes-vibe-app.notes'

async function createNote(title, body) {
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/title/i), title)
  await user.type(screen.getByLabelText(/body/i), body)
  await user.click(screen.getByRole('button', { name: /add note/i }))

  return user
}

describe('Notes App', () => {
  it('shows an empty state when there are no notes', () => {
    render(<App />)

    expect(screen.getByText(/no notes yet/i)).toBeInTheDocument()
    expect(
      screen.getByText(/create your first note with a title and body/i),
    ).toBeInTheDocument()
  })

  it('lets a user create a note', async () => {
    render(<App />)

    await createNote('Sprint ideas', 'Review the notes app flow.')

    expect(screen.getByRole('heading', { name: 'Sprint ideas' })).toBeInTheDocument()
    expect(screen.getByText('Review the notes app flow.')).toBeInTheDocument()
    expect(screen.getByText('1 note saved')).toBeInTheDocument()
  })

  it('lets a user edit an existing note', async () => {
    render(<App />)
    const user = await createNote('Draft title', 'Draft body')

    await user.click(screen.getByRole('button', { name: /edit/i }))
    await user.clear(screen.getByLabelText(/title/i))
    await user.type(screen.getByLabelText(/title/i), 'Updated title')
    await user.clear(screen.getByLabelText(/body/i))
    await user.type(screen.getByLabelText(/body/i), 'Updated body')
    await user.click(screen.getByRole('button', { name: /save changes/i }))

    expect(screen.getByRole('heading', { name: 'Updated title' })).toBeInTheDocument()
    expect(screen.getByText('Updated body')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Draft title' }),
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Draft body')).not.toBeInTheDocument()
  })

  it('lets a user delete an existing note', async () => {
    render(<App />)
    const user = await createNote('Temporary note', 'This note will be removed.')

    await user.click(screen.getByRole('button', { name: /delete/i }))

    expect(
      screen.queryByRole('heading', { name: 'Temporary note' }),
    ).not.toBeInTheDocument()
    expect(screen.queryByText('This note will be removed.')).not.toBeInTheDocument()
    expect(screen.getByText(/no notes yet/i)).toBeInTheDocument()
  })

  it('searches notes by title or body without matching case', async () => {
    render(<App />)
    const user = await createNote('Grocery List', 'Buy apples and coffee.')

    await createNote('Project Plan', 'Draft test coverage.')
    await user.type(screen.getByRole('searchbox', { name: /search notes/i }), 'COFFEE')

    expect(screen.getByRole('heading', { name: 'Grocery List' })).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Project Plan' }),
    ).not.toBeInTheDocument()

    await user.clear(screen.getByRole('searchbox', { name: /search notes/i }))
    await user.type(screen.getByRole('searchbox', { name: /search notes/i }), 'project')

    expect(screen.getByRole('heading', { name: 'Project Plan' })).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Grocery List' }),
    ).not.toBeInTheDocument()
  })

  it('shows a no-match message for unmatched search text', async () => {
    render(<App />)
    const user = await createNote('Reading List', 'Save helpful docs.')

    await user.type(screen.getByRole('searchbox', { name: /search notes/i }), 'budget')

    expect(screen.getByText(/no matches found/i)).toBeInTheDocument()
    expect(
      screen.getByText(/no notes match "budget"\. try a different search\./i),
    ).toBeInTheDocument()
  })

  it('loads notes from localStorage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'saved-note-1',
          title: 'Saved note',
          body: 'This came from localStorage.',
        },
      ]),
    )

    render(<App />)

    expect(screen.getByRole('heading', { name: 'Saved note' })).toBeInTheDocument()
    expect(screen.getByText('This came from localStorage.')).toBeInTheDocument()
    expect(screen.getByText('1 note saved')).toBeInTheDocument()
  })
})
