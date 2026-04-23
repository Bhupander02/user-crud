# User CRUD — Next.js App

A simple User CRUD app built with **Next.js (App Router)** and **JSONPlaceholder**.

## Features

- `/users` — Lists all users (name + email) with a View button
- `/users/[id]` — View full user details, Update name/email, Delete user
- **Optimistic updates** — UI updates instantly before API confirms

## Tech Stack

- Next.js 14 (App Router)
- React 18
- CSS Modules (global CSS)
- JSONPlaceholder API

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Used

Base URL: `https://jsonplaceholder.typicode.com`

| Method | Endpoint   | Usage           |
| ------ | ---------- | --------------- |
| GET    | /users     | List all users  |
| GET    | /users/:id | Get single user |
| PUT    | /users/:id | Update user     |
| DELETE | /users/:id | Delete user     |

> Note: JSONPlaceholder is a mock API — changes are not persisted server-side,
> but the app reflects them optimistically in local state.

## Project Structure

```
src/
└── app/
    ├── layout.js           # Root layout
    ├── page.js             # Redirects to /users
    ├── globals.css         # Global styles
    ├── components/
    │   └── Nav.js          # Navigation bar
    └── users/
        ├── page.js         # /users — user list (Server Component)
        └── [id]/
            ├── page.js     # /users/[id] — user detail (Server Component)
            └── UserDetail.js  # Interactive UI (Client Component)
```
