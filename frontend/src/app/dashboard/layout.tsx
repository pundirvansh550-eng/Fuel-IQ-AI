import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Dataset Center",
      href: "/dashboard/datasets",
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
    },
    {
      name: "Sustainability",
      href: "/dashboard/sustainability",
    },
    {
      name: "AI Intelligence",
      href: "/dashboard/ai",
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
    },
    {
      name: "Admin Center",
      href: "/dashboard/admin",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6">
        <h1 className="text-2xl font-bold">
          Fuel<span className="text-cyan-400">IQ</span>
        </h1>

        <nav className="mt-10 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg p-3 transition hover:bg-zinc-900"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-12 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
          <div className="text-green-400">
            AI Core Online
          </div>

          <div className="mt-1 text-sm text-zinc-400">
            Agent System Active
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-8">
          <div>
            FuelIQ AI Platform
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
              Online
            </div>

            <div className="h-10 w-10 rounded-full bg-cyan-500" />
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}