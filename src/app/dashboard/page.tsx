import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--purple)]/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[var(--cyan)]/10 blur-[100px]" />
        <div className="absolute top-1/3 left-0 h-[300px] w-[300px] rounded-full bg-[var(--magenta)]/15 blur-[90px]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="text-xl font-display font-bold tracking-tight">
          Auth<span className="text-[var(--gold)]">System</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-[var(--text-muted)] sm:block">
            {session.user.email}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="rounded-full border border-[var(--border)] px-5 py-2 text-sm font-medium text-white transition hover:border-[var(--electric)] hover:bg-white/5"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-10 sm:pt-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[var(--electric)]">
          Dashboard
        </p>

        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Welcome back
          {session.user.name ? (
            <>
              ,{" "}
              <span className="bg-gradient-to-r from-[var(--gold)] via-[#FBBF24] to-[var(--cyan)] bg-clip-text text-transparent">
                {session.user.name.split(" ")[0]}
              </span>
            </>
          ) : null}
        </h1>

        <p className="mt-3 text-[var(--text-muted)]">
          You’re signed in. Here’s your session overview.
        </p>

        {/* Session card */}
        <div className="auth-card mt-10 space-y-4 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-dim)]">Signed in as</p>
            <strong className="text-right text-sm sm:text-base">
              {session.user.email}
            </strong>
          </div>

          <div className="h-px bg-[var(--border)]" />

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-dim)]">Name</p>
            <span className="text-sm sm:text-base">
              {session.user.name || "—"}
            </span>
          </div>

          <div className="h-px bg-[var(--border)]" />

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-dim)]">Role</p>
            <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/5 px-2.5 py-0.5 text-xs font-medium text-[var(--gold)]">
              {session.user.role}
            </span>
          </div>

          <div className="h-px bg-[var(--border)]" />

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-dim)]">User ID</p>
            <code className="max-w-[60%] truncate font-mono text-xs text-[var(--text-muted)]">
              {session.user.id}
            </code>
          </div>
        </div>

        {/* Admin note */}
        {session.user.role === "ADMIN" && (
          <p className="mt-6 text-sm text-[var(--text-muted)]">
            You have admin privileges. Visit the{" "}
            <Link
              href="/admin"
              className="font-medium text-[var(--electric)] underline-offset-4 hover:underline"
            >
              Admin panel
            </Link>
            .
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full border border-[var(--border)] px-6 text-sm font-medium transition hover:border-[var(--electric)] hover:bg-white/5"
          >
            Back to home
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="btn-gold inline-flex h-11 items-center rounded-full px-6 text-sm"
            >
              Sign out
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}