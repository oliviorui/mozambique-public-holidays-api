"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Clipboard,
  LoaderCircle,
  Play,
  RotateCcw,
  Terminal,
} from "lucide-react";

type Endpoint = {
  id: string;
  label: string;
  description: string;
  path: string;
};

const endpoints: Endpoint[] = [
  {
    id: "all",
    label: "List holidays",
    description: "List all holidays for a given year.",
    path: "/api/holidays?year=2027",
  },
  {
    id: "month",
    label: "Holidays by month",
    description: "Filter holidays by year and month.",
    path: "/api/holidays?year=2027&month=6",
  },
  {
    id: "date",
    label: "Holiday by date",
    description: "Get information about a specific holiday.",
    path: "/api/holidays/2027-06-25",
  },
  {
    id: "check",
    label: "Check a date",
    description: "Check if a date is a public holiday.",
    path: "/api/holidays/check?date=2027-06-25",
  },
  {
    id: "next",
    label: "Next holiday",
    description: "Find the next public holiday.",
    path: "/api/holidays/next?date=2027-06-01",
  },
];

const exampleResponse = {
  success: true,
  country: "Mozambique",
  countryCode: "MZ",
  year: 2027,
  total: 9,
  holidays: [
    {
      date: "2027-01-01",
      name: "Ano Novo",
      nameEn: "New Year's Day",
      type: "national",
      countryCode: "MZ",
    },
  ],
};

export default function ApiPlayground() {
  const [selected, setSelected] = useState("all");
  const [path, setPath] = useState(endpoints[0].path);
  const [response, setResponse] = useState<unknown>(
    exampleResponse
  );
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const currentEndpoint =
    endpoints.find((item) => item.id === selected) ??
    endpoints[0];

  function changeEndpoint(id: string) {
    const endpoint = endpoints.find(
      (item) => item.id === id
    );

    if (!endpoint) return;

    setSelected(endpoint.id);
    setPath(endpoint.path);
    setStatus(null);
    setResponse(exampleResponse);
    setHasExecuted(false);
  }

  async function executeRequest() {
    setLoading(true);
    setStatus(null);
    setHasExecuted(false);

    try {
      const url = new URL(path, window.location.origin);

      if (
        url.origin !== window.location.origin ||
        !url.pathname.startsWith("/api/holidays")
      ) {
        throw new Error(
          "Only local holidays API endpoints are allowed."
        );
      }

      const result = await fetch(url.toString(), {
        method: "GET",
        cache: "no-store",
      });

      const data: unknown = await result.json();

      setStatus(result.status);
      setResponse(data);
    } catch (error) {
      setStatus(null);
      setResponse({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected request error.",
      });
    } finally {
      setLoading(false);
      setHasExecuted(true);
    }
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function reset() {
    setPath(currentEndpoint.path);
    setResponse(exampleResponse);
    setStatus(null);
    setHasExecuted(false);
  }

  return (
    <section
      id="playground"
      className="scroll-mt-24 py-20"
    >
      <div className="mb-8">
        <span className="section-label">
          INTERACTIVE PLAYGROUND
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Try the API
        </h2>

        <p className="mt-3 max-w-2xl text-slate-400">
          Execute real API requests directly from your
          browser. No authentication required.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1727] shadow-2xl shadow-black/20">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-2">
            <Terminal
              size={18}
              className="text-emerald-400"
            />
            <span className="font-semibold">
              API Console
            </span>
          </div>

          <span className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live API
          </span>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr]">
          <aside className="border-b border-slate-800 p-4 lg:border-r lg:border-b-0">
            <p className="mb-4 px-2 text-xs font-semibold tracking-widest text-slate-500 uppercase">
              Endpoints
            </p>

            <div className="space-y-2">
              {endpoints.map((endpoint) => (
                <button
                  key={endpoint.id}
                  onClick={() =>
                    changeEndpoint(endpoint.id)
                  }
                  className={`w-full rounded-lg border px-3 py-3 text-left transition ${
                    selected === endpoint.id
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-transparent hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-400">
                      GET
                    </span>
                    <span className="text-sm font-medium">
                      {endpoint.label}
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {endpoint.description}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <div className="min-w-0 p-4 sm:p-6">
            <div className="mb-3 flex items-center justify-between gap-2">
              <label
                htmlFor="request-path"
                className="text-sm font-semibold"
              >
                Request URL
              </label>

              <button
                onClick={reset}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
              >
                <RotateCcw size={13} />
                Reset
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
                <span className="border-r border-slate-700 px-3 py-3 text-xs font-bold text-emerald-400">
                  GET
                </span>

                <input
                  id="request-path"
                  value={path}
                  onChange={(event) =>
                    setPath(event.target.value)
                  }
                  spellCheck={false}
                  aria-label="Request path"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-xs text-slate-200 outline-none"
                />
              </div>

              <button
                onClick={executeRequest}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
              >
                {loading ? (
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <Play size={16} />
                )}
                {loading ? "Running..." : "Send"}
              </button>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold">
                    Response
                  </h3>

                  {hasExecuted && status !== null && (
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${
                        status >= 200 && status < 300
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      HTTP {status}
                    </span>
                  )}

                  {!hasExecuted && (
                    <span className="text-xs text-slate-500">
                      Example
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    copyText(
                      JSON.stringify(response, null, 2)
                    )
                  }
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
                >
                  {copied ? (
                    <Check size={14} />
                  ) : (
                    <Clipboard size={14} />
                  )}
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#070d18]">
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>

                  <span className="text-[10px] tracking-wider text-slate-500 uppercase">
                    JSON
                  </span>
                </div>

                <pre
                  aria-live="polite"
                  className="max-h-[430px] min-h-[280px] overflow-auto p-5 font-mono text-xs leading-7 text-emerald-200 sm:text-sm"
                >
                  <code>
                    {JSON.stringify(response, null, 2)}
                  </code>
                </pre>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                <ChevronDown
                  size={12}
                  className="mr-1 inline"
                />
                Responses are generated by the local API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
