import Link from "next/link";

export default function Home() {
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
        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-bold tracking-tight">
            Auth<span className="text-[var(--gold)]">System</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="btn-gold rounded-full px-5 py-2 text-sm"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-16 text-center sm:pt-24">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[var(--electric)]">
          Secure · Fast · Built for scale
        </p>

        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
          We Turn
          <br />
          <span className="bg-gradient-to-r from-[var(--gold)] via-[#FBBF24] to-[var(--cyan)] bg-clip-text text-transparent">
            Access into Trust.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          A modern authentication system with the same premium craft as{" "}
          <span className="text-white">The Tech Alchemy Lab</span> — dark,
          precise, and conversion-ready.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/signup"
            className="btn-gold inline-flex h-12 items-center justify-center rounded-full px-8 text-base"
          >
            Create account
          </Link>
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--border)] px-8 text-base font-medium text-white transition hover:border-[var(--electric)] hover:bg-white/5"
          >
            Sign in
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "99.9%", label: "Uptime" },
            { value: "<100ms", label: "Auth latency" },
            { value: "JWT", label: "Secure tokens" },
            { value: "SA", label: "Built in Joburg" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="auth-card flex flex-col items-center gap-1 px-4 py-5"
            >
              <span className="font-display text-xl font-bold text-[var(--gold)] sm:text-2xl">
                {stat.value}
              </span>
              <span className="text-xs text-[var(--text-dim)]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid w-full max-w-4xl gap-4 text-left sm:grid-cols-3">
          {[
            {
              title: "Secure by default",
              desc: "Hashed passwords, HTTP-only cookies, and modern session handling out of the box.",
              accent: "var(--cyan)",
            },
            {
              title: "Premium UI",
              desc: "Dark glass surfaces, gold CTAs, and Syne + Inter typography matched to your brand.",
              accent: "var(--gold)",
            },
            {
              title: "Ready to extend",
              desc: "Built on Next.js + Tailwind so you can add OAuth, MFA, and roles when you need them.",
              accent: "var(--magenta)",
            },
          ].map((f) => (
            <div key={f.title} className="auth-card p-6 transition hover:bg-[var(--card-hover)]">
              <div
                className="mb-3 h-1 w-8 rounded-full"
                style={{ background: f.accent }}
              />
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}