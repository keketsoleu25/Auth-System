"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Mode = "login" | "register" | "forgot";

interface AuthFormProps {
  mode: Mode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "register") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Registration failed");
          return;
        }
        setSuccess(data.message);
        return;
      }

      if (mode === "forgot") {
        const res = await fetch("/api/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Request failed");
          return;
        }
        setSuccess(data.message);
        return;
      }

      // login
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {mode === "login" && "Sign in"}
          {mode === "register" && "Create account"}
          {mode === "forgot" && "Reset password"}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {mode === "login" && "Enter your credentials to continue"}
          {mode === "register" && "Fill in the form to get started"}
          {mode === "forgot" && "We'll send you a reset link"}
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-3 py-2 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-md bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-900 px-3 py-2 text-sm text-green-700 dark:text-green-400">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400"
              placeholder="Jane Doe"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400"
            placeholder="you@example.com"
          />
        </div>

        {mode !== "forgot" && (
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400"
              placeholder="••••••••"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading
            ? "Please wait…"
            : mode === "login"
            ? "Sign in"
            : mode === "register"
            ? "Create account"
            : "Send reset link"}
        </button>
      </form>

      {mode !== "forgot" && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            Google
          </button>
        </>
      )}

      <p className="text-center text-sm text-zinc-500">
        {mode === "login" && (
          <>
            No account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Register
            </Link>
            {" · "}
            <Link href="/forgot-password" className="underline underline-offset-4">
              Forgot password?
            </Link>
          </>
        )}
        {mode === "register" && (
          <>
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </>
        )}
        {mode === "forgot" && (
          <>
            Remembered?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}