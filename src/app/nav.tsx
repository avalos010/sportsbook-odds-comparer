"use client";
import Link from "next/link";
import { Sport } from "../../lib/api";
import { useState } from "react";
import Snackbar from "../components/Snackbar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";
import ThemeToggle from "@/components/ThemeToggle";

function Nav() {
  const { data: sports, error } = useSWR(
    "/api/sports",
    async (url: string) => await fetch(url).then((res) => res.json())
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b dark:bg-neutral-950">
      <nav className="w-full" aria-label="Primary">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button
            type="button"
            data-cy="bars-icon"
            aria-label="Open menu"
            aria-controls="primary-navigation"
            aria-expanded={isOpen}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 dark:text-slate-200 dark:hover:bg-neutral-900 dark:focus-visible:ring-cyan-300"
            onClick={() => setIsOpen(true)}
          >
            <Bars3Icon width={24} aria-hidden="true" />
          </button>
          <Link href="/" className="text-xl font-semibold tracking-tight">
            SportsBooks Odds
          </Link>
          <ThemeToggle />
        </div>
        {error && (
          <Snackbar
            className="absolute top-0 left-0"
            message={error.message}
            type="error"
          />
        )}
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsOpen(false)}
          />
          <aside
            id="primary-navigation"
            role="navigation"
            aria-label="Main menu"
            className="absolute left-0 top-0 h-full w-full max-w-sm bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-r border-slate-200 dark:border-neutral-800 shadow-xl p-4 transform translate-x-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Leagues
              </h2>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 dark:text-slate-200 dark:hover:bg-neutral-800 dark:focus-visible:ring-cyan-300"
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon aria-hidden="true" className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              {sports?.length ? (
                sports.map((sportItem: Sport) => (
                  <Link
                    className="text-slate-900 dark:text-slate-100 font-medium px-3 py-2 rounded-md hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 dark:hover:bg-neutral-800 dark:focus-visible:ring-cyan-300"
                    key={sportItem.key}
                    data-cy={`${sportItem.title.toLowerCase()}-link`}
                    onClick={() => setIsOpen(false)}
                    href={`/odds/${sportItem.key}/moneyline`}
                  >
                    {sportItem.title}
                  </Link>
                ))
              ) : (
                <Snackbar
                  message="Oops! it looks like no data is available!"
                  type="error"
                />
              )}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

export default Nav;
