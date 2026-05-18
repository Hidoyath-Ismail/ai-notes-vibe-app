# AI Notes Vibe App

## Project Overview

AI Notes Vibe App is a beginner-friendly notes application built with React and Vite. Users can create, edit, delete, search, and persist notes in the browser with `localStorage`.

This project is intended as a portfolio example of building a small frontend application with clean UI, focused features, automated tests, and an AI-assisted development workflow.

## Why I Built This

I built this project to practice controlled frontend feature development in a realistic but approachable app. A notes app is small enough to keep the architecture simple, but it still includes common product concerns such as form state, persistent data, search, empty states, accessibility, and test coverage.

## AI-Assisted Development Workflow

Codex was used as an AI coding assistant for feature generation, code review, and testing support. The workflow emphasized human review at each step:

- Read project instructions before making changes
- Make focused feature updates instead of large rewrites
- Review proposed changes before accepting them
- Use Git checkpoints to keep work traceable
- Add automated tests for important user flows
- Run linting, tests, and builds before considering work complete

## Features

- Create notes with a title and body
- View saved notes in responsive note cards
- Edit existing notes
- Delete notes
- Search notes by title or body
- Show a helpful message when no notes match a search
- Persist notes in browser `localStorage`
- Show an empty state when no notes exist
- Support light and dark system color preferences

## Tech Stack

- React
- Vite
- CSS
- Browser `localStorage`
- Vitest
- React Testing Library
- ESLint

## Testing and Quality Practices

This project includes automated tests for the core notes workflow:

- Empty state rendering
- Creating notes
- Editing notes
- Deleting notes
- Searching by title or body
- No-match search messaging
- Loading saved notes from `localStorage`

Quality practices used in this project:

- Beginner-friendly component logic
- Simple local React state management
- No backend service
- No unnecessary runtime dependencies
- Automated tests with user-focused interactions
- Lint checks with ESLint
- Production build verification with Vite
- Manual review of create, edit, delete, search, and persistence behavior

## How to Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## How to Run Tests

Run the automated test suite:

```bash
npm test
```

Run lint checks:

```bash
npm run lint
```

Run a production build:

```bash
npm run build
```

## Screenshots

### Notes App

![Codex-Assisted Notes App Screenshot](screenshots/codex-assisted-notes-app-thumbnail1.png)

## Key Learnings

- How to manage form state with React hooks
- How to persist simple frontend data with `localStorage`
- How to keep feature work small and reviewable
- How to write tests around user behavior instead of implementation details
- How to use AI assistance while still relying on human review and verification

## Future Improvements

- Split the app into smaller components such as `NoteForm`, `NoteCard`, and `NotesList`
- Add simple form validation messages for empty title or body fields
- Add a delete confirmation for accidental deletions
- Add note timestamps or sorting options
- Add screenshot assets to complete the portfolio presentation

## Interview Talking Points

- I used React state to manage notes, form values, edit mode, and search text.
- I used `localStorage` so notes persist without adding a backend.
- I added automated tests with Vitest and React Testing Library for the most important user flows.
- I used Codex as an AI coding assistant, but kept the workflow review-driven with human decisions, Git checkpoints, and test verification.
- I kept the scope intentionally small so the app stays readable, maintainable, and easy to explain.
