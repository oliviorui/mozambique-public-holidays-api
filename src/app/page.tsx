import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Globe2,
  ShieldCheck,
  Zap,
} from "lucide-react";

import ApiPlayground from "@/components/api-playground";

const features = [
  {
    icon: CalendarDays,
    title: "National holidays",
    description:
      "Access Mozambique's national public holidays by year, month or date.",
  },
  {
    icon: Zap,
    title: "Simple REST API",
    description:
      "Clean JSON responses with predictable endpoints and no authentication.",
  },
  {
    icon: Globe2,
    title: "Bilingual data",
    description:
      "Holiday names in Portuguese and English, ready for international apps.",
  },
  {
    icon: ShieldCheck,
    title: "Observed holidays",
    description:
      "Identify Monday observances when a holiday falls on Sunday.",
  },
];

const routes = [
  {
    method: "GET",
    path: "/api/holidays?year=2027",
    description: "List holidays by year",
  },
  {
    method: "GET",
    path: "/api/holidays?year=2027&month=6",
    description: "Filter holidays by month",
  },
  {
    method: "GET",
    path: "/api/holidays/2027-06-25",
    description: "Get holiday by date",
  },
  {
    method: "GET",
    path: "/api/holidays/check?date=2027-06-25",
    description: "Check if a date is a holiday",
  },
  {
    method: "GET",
    path: "/api/holidays/next?date=2027-06-01",
    description: "Get the next holiday",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080f1c] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#080f1c]/90 backdrop-blur-xl">
        <nav className="container-page flex h-18 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
              <CalendarDays size={21} />
            </div>
            <span className="text-sm font-bold tracking-tight sm:text-base">
              Mozambique <span className="text-emerald-400">Holidays API</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 text-sm text-slate-400 sm:gap-7">
            <a
              href="#features"
              className="hidden transition hover:text-white sm:inline"
            >
              Features
            </a>
            <a
              href="#documentation"
              className="hidden transition hover:text-white sm:inline"
            >
              Docs
            </a>
            <a
              href="#playground"
              className="transition hover:text-white"
            >
              Playground
            </a>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden border-b border-slate-800/70">
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[130px]" />

        <div className="container-page relative grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Free & Open Source REST API
            </div>

            <h1 className="max-w-xl text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Public holidays,
              <span className="block text-emerald-400">
                made simple.
              </span>
              <span className="mt-3 block text-3xl sm:text-4xl">
                🇲🇿
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-slate-400">
              A developer-friendly REST API for public
              holidays in Mozambique. Built for calendars,
              business platforms, scheduling systems and
              modern applications.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#playground"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
              >
                Try the API <ArrowRight size={16} />
              </a>

              <a
                href="#documentation"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold transition hover:border-slate-500 hover:bg-slate-800"
              >
                <Code2 size={16} /> Documentation
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400"
                />
                No API key
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400"
                />
                JSON responses
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400"
                />
                Open source
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#0e192b] shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div className="flex items-center gap-2">
                <Database
                  size={16}
                  className="text-emerald-400"
                />
                <span className="text-sm font-medium">
                  API Response
                </span>
              </div>

              <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                200 OK · Example
              </span>
            </div>

            <div className="border-b border-slate-800 bg-[#0a1322] px-5 py-4 font-mono text-xs">
              <span className="mr-3 font-bold text-emerald-400">
                GET
              </span>
              <span className="text-slate-300">
                /api/holidays?year=2027
              </span>
            </div>

            <pre className="overflow-x-auto p-5 text-xs leading-7 text-emerald-200 sm:p-7 sm:text-sm">
              <code>{`{
  "success": true,
  "country": "Mozambique",
  "countryCode": "MZ",
  "year": 2027,
  "total": 9,
  "holidays": [
    {
      "date": "2027-01-01",
      "name": "Ano Novo",
      "nameEn": "New Year's Day",
      "type": "national",
      "countryCode": "MZ"
    }
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      <div className="container-page">
        <section
          id="features"
          className="scroll-mt-24 py-20"
        >
          <span className="section-label">
            WHY THIS API
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Everything you need.
            <span className="text-emerald-400">
              {" "}Nothing you don&apos;t.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-slate-400">
            A lightweight solution for integrating
            Mozambique&apos;s public holiday information
            into your applications.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-800 bg-[#0e1929] p-6 transition hover:border-emerald-500/30"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                    <Icon size={21} />
                  </div>

                  <h3 className="font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="documentation"
          className="scroll-mt-24 border-t border-slate-800 py-20"
        >
          <span className="section-label">
            API REFERENCE
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Simple, predictable endpoints.
          </h2>

          <p className="mt-4 max-w-2xl text-slate-400">
            Use standard HTTP GET requests to retrieve
            holiday information. All responses use JSON.
          </p>

          <div className="mt-9 overflow-hidden rounded-2xl border border-slate-800">
            {routes.map((route, index) => (
              <div
                key={route.path}
                className={`flex flex-col gap-3 bg-[#0e1929] p-5 lg:flex-row lg:items-center lg:justify-between ${
                  index !== routes.length - 1
                    ? "border-b border-slate-800"
                    : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="shrink-0 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-400">
                    {route.method}
                  </span>

                  <code className="min-w-0 break-all font-mono text-xs text-slate-200 sm:text-sm">
                    {route.path}
                  </code>
                </div>

                <span className="text-sm text-slate-400 lg:text-right">
                  {route.description}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-[#0e1929] p-5">
            <h3 className="text-sm font-semibold">
              Response conventions
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-400">
              Dates follow ISO 8601 (YYYY-MM-DD).
              Holiday types are national or observed.
              Invalid requests return HTTP 400, while
              missing holiday resources may return
              HTTP 404.
            </p>
          </div>
        </section>

        <ApiPlayground />

        <section className="border-t border-slate-800 py-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold">
                Built for developers.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
                Use the API in your next project,
                contribute improvements and help make
                Mozambique&apos;s public data more accessible.
              </p>
            </div>

            <a
              href="#documentation"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
            >
              <ExternalLink size={17} />
              Explore documentation
            </a>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-800 py-8">
        <div className="container-page flex flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p>🇲🇿 Mozambique Public Holidays API</p>
          <p>
            Open source · Built with Next.js & TypeScript
          </p>
        </div>
      </footer>
    </main>
  );
}
