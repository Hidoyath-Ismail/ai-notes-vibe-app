# AGENTS.md

## Project Overview

This is a React + Vite notes app built as an AI-assisted coding project using Codex.

The goal is to demonstrate:
- AI-assisted prototyping
- controlled feature development
- code review
- testing
- documentation
- maintainable frontend architecture

## Tech Stack

- React
- Vite
- Tailwind CSS
- Browser localStorage
- Vitest
- React Testing Library

## Coding Rules

- Keep components small and readable.
- Do not create files longer than 250 lines.
- Prefer simple React state management unless complexity requires otherwise.
- Do not introduce backend services unless explicitly requested.
- Do not add external dependencies without explaining why.
- All new features should include basic tests where practical.
- Keep UI clean, responsive, and beginner-friendly.
- Use meaningful component names.
- Explain major changes after modifying code.

## Testing Commands

- Install dependencies: `npm install`
- Run development server: `npm run dev`
- Run tests: `npm test`

## Review Checklist

Before finalizing a change:
- Confirm the app runs without errors.
- Confirm create, edit, delete, and search still work.
- Confirm localStorage persistence works.
- Confirm tests pass.
- Update README if behavior changes.