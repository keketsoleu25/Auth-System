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
    <div className="w-full max-w-sm space-y-6 auth-card p-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">
          {mode === "login" && "Sign in"}
          {mode === "register" && "Create account"}
          {mode === "forgot" && "Reset password"}
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          {mode === "login" && "Enter your credentials to continue"}
          {mode === "register" && "Fill in the form to get started"}
          {mode === "forgot" && "We'll send you a reset link"}
        </p>
      </div>

      {error && (
        <div
          className="rounded-md border px-3 py-2 text-sm"
          style={{
            background: "rgba(192, 38, 211, 0.08)",
            borderColor: "rgba(192, 38, 211, 0.35)",
            color: "#e879f9",
          }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="rounded-md border px-3 py-2 text-sm"
          style={{
            background: "rgba(245, 158, 11, 0.08)",
            borderColor: "rgba(245, 158, 11, 0.35)",
            color: "var(--gold)",
          }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md bg-transparent px-3 py-2 text-sm text-white outline-none"
              style={{ border: "1px solid var(--border)" }}
              placeholder="Jane Doe"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1 text-white">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-transparent px-3 py-2 text-sm text-white outline-none"
            style={{ border: "1px solid var(--border)" }}
            placeholder="you@example.com"
          />
        </div>

        {mode !== "forgot" && (
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-transparent px-3 py-2 text-sm text-white outline-none"
              style={{ border: "1px solid var(--border)" }}
              placeholder="••••••••"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full rounded-md py-2 text-sm disabled:opacity-50"
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
              <div className="w-full border-t" style={{ borderColor: "var(--border)" }} />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span
                className="px-2"
                style={{ background: "var(--background-secondary)", color: "var(--text-dim)" }}
              >
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full rounded-md py-2 text-sm font-medium text-white disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
            style={{ border: "1px solid var(--border)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--card-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Google
          </button>
        </>
      )}

      <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
        {mode === "login" && (
          <>
            No account?{" "}
            <Link href="/register" className="underline underline-offset-4" style={{ color: "var(--electric)" }}>
              Register
            </Link>
            {" · "}
            <Link href="/forgot-password" className="underline underline-offset-4" style={{ color: "var(--electric)" }}>
              Forgot password?
            </Link>
          </>
        )}
        {mode === "register" && (
          <>
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4" style={{ color: "var(--electric)" }}>
              Sign in
            </Link>
          </>
        )}
        {mode === "forgot" && (
          <>
            Remembered?{" "}
            <Link href="/login" className="underline underline-offset-4" style={{ color: "var(--electric)" }}>
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
