# URL Shortener API

Simple URL shortener backend built with Express, PostgreSQL, Drizzle ORM, JWT auth, and Zod validation.

## Features

- User sign-up and login
- JWT-protected routes
- Create custom or generated short codes
- List current user's short links
- Delete short links owned by current user
- Public redirect from short code to target URL

## Tech Stack

- Node.js (ESM)
- Express
- PostgreSQL
- Drizzle ORM + Drizzle Kit
- Zod
- JSON Web Token

## Project Structure

```text
.
├─ docker-compose.yml
├─ drizzle.config.js
├─ index.js
├─ src/
│  ├─ db/
│  ├─ middleware/
│  ├─ model/
│  ├─ routes/
│  ├─ service/
│  ├─ utils/
│  └─ validation/
└─ drizzle/
```

## Prerequisites

- Node.js 18+
- pnpm
- Docker (for local Postgres)

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=8000
DATABASE_URL=postgres://postgres:ChrisDev@localhost:5435/url_shortener_api
JWT_ACCESS_TOKEN_SECRETE=your_jwt_secret_here
```

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Start PostgreSQL (Docker):

```bash
docker compose up -d
```

3. Push schema to the database:

```bash
pnpm db:push
```

4. Run the server:

```bash
pnpm devStart
```

Server runs on `http://localhost:8000` by default.

## Available Scripts

- `pnpm dev` - run with Node watch mode
- `pnpm devStart` - run with nodemon
- `pnpm db:push` - push schema with Drizzle
- `pnpm db:studio` - open Drizzle Studio

## API Endpoints

Base URL: `http://localhost:8000`

### Auth

#### POST `/user/sign-up`

Create a new user.

Request body:

```json
{
	"firstName": "John",
	"lastName": "Doe",
	"email": "john@example.com",
	"password": "StrongPass1!"
}
```

Success response (`201`):

```json
{
	"data": {
		"userId": "uuid"
	}
}
```

#### POST `/user/login`

Log in with email and password.

Request body:

```json
{
	"email": "john@example.com",
	"password": "StrongPass1!"
}
```

Success response (`200`):

```json
{
	"token": "jwt_token"
}
```

### URLs

#### POST `/shorten` (Auth required)

Create a short link. If `code` is omitted, server generates one.

Headers:

```text
Authorization: Bearer <token>
```

Request body:

```json
{
	"url": "https://example.com",
	"code": "my-custom-code"
}
```

Success response (`201`):

```json
{
	"success": {
		"shortCode": "my-custom-code"
	}
}
```

#### GET `/codes` (Auth required)

List all links for the authenticated user.

Headers:

```text
Authorization: Bearer <token>
```

Response when links exist (`200`):

```json
{
	"codes": [
		{
			"targetUrl": "https://example.com",
			"shortCode": "my-custom-code"
		}
	]
}
```

Response when none exist (`200`):

```json
{
	"message": "No short codes created yet."
}
```

#### DELETE `/:id` (Auth required)

Delete a short link by URL row id (must belong to authenticated user).

Headers:

```text
Authorization: Bearer <token>
```

Success response (`200`):

```json
{
	"success": "URL deleted successfully."
}
```

Not found (`404`):

```json
{
	"error": "URL not found for this user."
}
```

#### GET `/:shortCode` (Public)

Redirects to the original URL associated with `shortCode`.

If not found:

```json
{
	"error": "Invalid short code provided."
}
```

## Validation Rules

- Sign-up password must include:
	- at least 8 characters
	- one uppercase letter
	- one lowercase letter
	- one number
	- one special character
- Short code max length: 20

## Notes

- Passwords are hashed with HMAC SHA-256 + per-user salt before storage.
- JWT payload currently contains user id only.
- Protected routes require `Authorization: Bearer <token>`.
