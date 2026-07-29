# 🔐 Auth System

A full authentication system built with Next.js 16, Auth.js (NextAuth v5), Prisma, and PostgreSQL. Supports email/password and Google OAuth login, email verification, password reset, and role-based route protection.

Built as a portfolio project to understand authentication architecture end-to-end — not just wiring up a library, but working through why each piece (session strategy, token expiry, role checks, rate limiting) is there.

## ✨ Features

**Authentication**
- Email & password registration
- Secure login (credentials + Google OAuth)
- Email verification (token-based, 24h expiry)
- Password reset (token-based, 1h expiry)
- Logout

**Security**
- Password hashing with bcrypt (cost factor 12)
- JWT session management via Auth.js
- Input validation with Zod
- Rate limiting on `/api/register` and `/api/forgot-password` (in-memory; resets per server instance — fine for this project, would need Redis/Upstash for a multi-instance production deployment)
- Email enumeration protection on password reset (always returns the same response whether or not the account exists)

**Authorization**
- `USER` / `ADMIN` roles
- Role-based middleware protecting `/dashboard` (any logged-in user) and `/admin` (ADMIN only)
- Logged-in users redirected away from `/login` and `/register`

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Authentication | Auth.js (NextAuth v5) |
| Database | PostgreSQL |
| ORM | Prisma 7 (with `@prisma/adapter-pg` driver adapter) |
| Validation | Zod |
| Password Hashing | bcryptjs |
| Email | Resend |
| Styling | Tailwind CSS |

## 📁 Project Structure

```
src/
  app/
    (auth)/          # login, register, forgot-password, reset-password, verify-email pages
    api/              # NextAuth handler + register/verify/reset/forgot-password routes
    admin/            # admin-only page
    dashboard/        # authenticated user page
  components/         # auth form, navbar, providers
  lib/                # auth config, prisma client, mail (Resend), rate limiter, token helpers
  middleware.ts        # route protection (runs on Node.js runtime, not Edge — required
                        # because the Prisma driver adapter needs Node APIs unavailable on Edge)
prisma/
  schema.prisma        # User, Account, Session, VerificationToken models
```

## 🚀 Authentication Flow

```
Register → Email Verification → Login → Dashboard
                                           ├── USER
                                           └── ADMIN (role-gated)

Forgot Password → Email Sent → Reset Password → Login
```

## ⚙️ Getting Started

```bash
git clone https://github.com/keketsoleu25/Auth-System.git
cd Auth-System
npm install
cp .env.example .env
```

Fill in `.env` with real values (see table below), then:

```bash
npx prisma db push
npm run dev
```

> Note: this project doesn't have Prisma migration history (`prisma/migrations`), so schema changes are applied with `prisma db push` rather than `prisma migrate dev/deploy`. A future improvement would be establishing proper migration history with `prisma migrate dev --name init`.

### Environment variables

| Variable | Notes |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (e.g. from Neon) |
| `AUTH_SECRET` | Generate with `npx auth secret` |
| `NEXTAUTH_URL` | `http://localhost:3000` locally |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | From Google Cloud Console; redirect URI must be `<NEXTAUTH_URL>/api/auth/callback/google` |
| `RESEND_API_KEY` | From resend.com |
| `EMAIL_FROM` | `onboarding@resend.dev` works out of the box for testing without domain verification |

## 🧠 What I learned building this

- How session strategy (JWT vs. database sessions) actually works under the hood in Auth.js, and why middleware needs to run on the Node.js runtime rather than Edge once a database driver adapter is involved
- Token-based flows (email verification, password reset) — generation, expiry, and why email enumeration needs to be prevented by design, not as an afterthought
- Why rate limiting matters on public-facing auth endpoints, and the tradeoffs of an in-memory limiter vs. a distributed one
- Debugging real deployment/tooling friction: Prisma 7's driver adapter requirement, Edge Runtime incompatibilities, stale build caches, and workspace-root resolution issues

## 📌 Possible next steps

- Automated tests for the auth flows
- Real Prisma migration history instead of `db push`
- Rate limiting on the credentials login path itself (harder — needs a different approach than the route-handler pattern used for register/forgot-password, since login goes through Auth.js's internal `authorize` callback)
- Two-factor authentication
- Deployed demo link

## 📖 Notes

This project uses established libraries (Auth.js, Prisma) rather than hand-rolled session/token logic — a deliberate choice to avoid the security pitfalls of custom auth. Some scaffolding was AI-assisted; I reviewed, tested, and worked through the authentication flows and underlying decisions rather than treating any of it as a black box.

## 📄 License

MIT
