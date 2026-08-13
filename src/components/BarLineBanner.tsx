"use client";

import { useEffect, useState } from "react";
import { Activity, ExternalLink, X } from "lucide-react";

interface BarLineBannerProps {
  className?: string;
  link: string;
}

const dismissalKey = "barline-promo-dismissed";

export default function BarLineBanner({ className = "", link }: BarLineBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(dismissalKey) !== "true");
  }, []);

  function dismissBanner() {
    window.localStorage.setItem(dismissalKey, "true");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="BarLine promotion"
      className={`mx-auto my-3 flex w-[calc(100%_-_2rem)] max-w-2xl items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 ${className}`}
    >
      <Activity aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-600" />
      <span className="min-w-0 flex-1 truncate text-xs sm:text-sm">
        BarLine Player Props
      </span>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-cyan-700 hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-300"
      >
        View props
        <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
      </a>
      <button
        type="button"
        onClick={dismissBanner}
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
        aria-label="Dismiss BarLine promotion"
        title="Dismiss"
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </aside>
  );
}
