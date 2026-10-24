import Link from "next/link";
import type { ReactNode } from "react";

interface CompanyLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  {
    label: "Command Center",
    href: "/company",
  },
  {
    label: "Datasets",
    href: "/company/datasets",
  },
  {
    label: "Fleet",
    href: "/company/fleet",
  },
  {
    label: "Analytics",
    href: "/company/analytics",
  },
  {
    label: "Sustainability",
    href: "/company/sustainability",
  },
  {
    label: "Risk",
    href: "/company/risk",
  },
  {
    label: "Recommendations",
    href: "/company/recommendations",
  },
  {
    label: "Reports",
    href: "/company/reports",
  },
  {
    label: "Settings",
    href: "/company/settings",
  },
];

export default function CompanyLayout({
  children,
}: CompanyLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <Link
            href="/company"
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 font-bold text-white">
              N
            </span>

            <span className="text-xl font-bold">
              Fuel
              <span className="text-cyan-600">
                IQ
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">
                FuelIQ
              </p>

              <p className="text-xs text-slate-500">
                Company Admin
              </p>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 font-semibold text-cyan-700"
              aria-label="Open account menu"
            >
              FI
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
          <nav className="sticky top-16 space-y-1 p-4">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              FuelIQ Command Center
            </p>

            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700"
              >
                {item.label}
              </Link>
            ))}
            </nav>
        </aside>

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}