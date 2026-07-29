# Auth System

A full authentication system built with Next.js, NextAuth.js (Auth.js v5), and Prisma. Supports email/password and Google OAuth login, email verification, password reset, and role-based route protection.

## Features

- **Credentials login** — email + password, hashed with bcrypt, validated with Zod
- **Google OAuth** — sign in with Google via NextAuth's OAuth provider
- **JWT sessions** — session strategy handled by NextAuth (Auth.js v5)
- **Email verification** — token-based verification flow with expiry, sent via Nodemailer
- **Password reset** — token-based reset flow with expiry
- **Role-based access control** — `USER` / `ADMIN` roles enforced in middleware
  - `/dashboard` — requires login
  - `/admin` — requires `ADMIN` role
  - Logged-in users are redirected away from `/login` and `/register`

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Auth:** NextAuth.js (Auth.js) v5
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Password hashing:** bcryptjs
- **Email:** Nodemailer
- **Styling:** Tailwind CSS

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (create `.env`):
   ```
   DATABASE_URL=
   AUTH_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
  app/
    (auth)/          # login, register, forgot-password, reset-password, verify-email pages
    api/              # NextAuth handler + register/verify/reset routes
    admin/            # admin-only page
    dashboard/        # authenticated user page
  components/         # auth form, navbar, providers
  lib/                # auth config, prisma client, mail, token helpers
  middleware.ts        # route protection (auth + role checks)
prisma/
  schema.prisma        # User, Account, Session, VerificationToken models
```

## Notes

- Built with AI-assisted tooling (Claude Code) for scaffolding; the auth flow, schema design, and route protection logic were reviewed, tested, and are understood by the author.
- This project prioritizes using a well-vetted auth library (NextAuth.js) over hand-rolling session/token logic — a deliberate choice to avoid the common security pitfalls of custom auth implementations.

## Possible next steps

- Rate limiting on auth endpoints (login, register, password reset)
- Automated tests for auth flows
- CSRF protection review
