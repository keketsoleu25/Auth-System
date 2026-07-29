"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          AuthSystem
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {status === "loading" ? (
            <span className="text-zinc-400">…</span>
          ) : session ? (
            <>
              <span className="text-zinc-600 dark:text-zinc-400">
                {session.user?.email}{" "}
                <span className="ml-1 rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-xs">
                  {session.user?.role}
                </span>
              </span>
              <Link href="/dashboard" className="hover:underline underline-offset-4">
                Dashboard
              </Link>
              {session.user?.role === "ADMIN" && (
                <Link href="/admin" className="hover:underline underline-offset-4">
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1.5 text-sm font-medium hover:opacity-90"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline underline-offset-4">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1.5 text-sm font-medium hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}