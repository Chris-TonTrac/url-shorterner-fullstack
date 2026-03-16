# URL Shortener UI

Frontend application for the URL Shortener project, built with React, TypeScript, Vite, Tailwind CSS, and DaisyUI.

## Features

- User authentication (sign up and login)
- JWT token storage with remember-me support
- Create short URLs (custom code optional)
- View all URLs created by the current user
- Delete URLs
- Copy public short links
- Dashboard stats (total URLs, total clicks, average clicks)

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS + DaisyUI
- React Icons
- Framer Motion

## Project Structure

```text
src/
  api/
    user.api.ts       # Auth API helpers
    url.api.ts        # URL API helpers
  pages/
    home.page.tsx
    login.page.tsx
    register.page.tsx
    dashboard.page.tsx
```

## Environment Variables

Create a .env file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000
```

If not provided, the frontend falls back to http://localhost:5000.

## Backend Endpoints Used

Auth:
- POST /user/sign-up
- POST /user/login

URLs:
- POST /url/shorten
- GET /url/codes
- DELETE /url/:id
- GET /url/:shortCode (public redirect link target)

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

3. Open the app:

```text
http://localhost:5173
```

## Available Scripts

- pnpm dev: Run Vite dev server
- pnpm build: Type-check and build for production
- pnpm preview: Preview production build
- pnpm lint: Run ESLint

## Notes

- The app expects the backend server to be running and accessible at VITE_API_BASE_URL.
- Auth token is saved to localStorage when remember-me is checked, otherwise sessionStorage is used.
