"use client";

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <div
        aria-hidden="true"
        className={`mt-5 animate-spin w-52 mx-auto h-52 border-r-2 border-l-gray-700 border-l-2 border-r-black rounded-full ${className ?? ""}`}
      ></div>
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default LoadingSpinner;
