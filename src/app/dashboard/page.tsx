import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-3">
        <p>
          <span className="text-zinc-500">Signed in as:</span>{" "}
          <strong>{session.user.email}</strong>
        </p>
        <p>
          <span className="text-zinc-500">Name:</span> {session.user.name || "—"}
        </p>
        <p>
          <span className="text-zinc-500">Role:</span>{" "}
          <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-medium">
            {session.user.role}
          </span>
        </p>
        <p>
          <span className="text-zinc-500">User ID:</span>{" "}
          <code className="text-xs">{session.user.id}</code>
        </p>
      </div>

      {session.user.role === "ADMIN" && (
        <p className="text-sm text-zinc-500">
          You have admin privileges. Visit the{" "}
          <a href="/admin" className="underline">
            Admin panel
          </a>
          .
        </p>
      )}
    </div>
  );
}