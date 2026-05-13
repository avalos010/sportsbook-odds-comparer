'use client";';
import { Activity, Zap, ChartBar, Target } from "lucide-react";

interface BarLineBannerProps {
  className?: string;
  link: string;
}

export default function BarLineBanner({ className, link }: BarLineBannerProps) {
  return (
    <div
      className={`
      relative overflow-hidden rounded-xl bg-linear-to-r 
      from-slate-900 via-slate-800 to-slate-900 
      p-6 text-white border-l-4 border-red-500
      shadow-lg w-85/100 mx-auto my-6 sm:text-base
      ${className}
    `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Alpha Badge */}
          <div className="hidden sm:block bg-linear-to-r from-amber-500 to-orange-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md">
            Alpha
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-400 shrink-0" />
            <h3 className="text-xl font-bold">
              BarLine <span className="text-cyan-500">Player Props</span>
            </h3>
          </div>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:block bg-gray-500 hover:bg-cyan-600 transition-colors px-4 py-1.5 rounded text-sm font-medium"
        >
          Visit
        </a>
      </div>

      {/* Mobile-only link */}
      <a
        href={link}
        className="sm:hidden mt-4  bg-gray-500 hover:bg-cyan-600 transition-colors py-2 rounded text-center text-sm font-medium flex justify-center"
      >
        Visit
      </a>
    </div>
  );
}
