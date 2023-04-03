"use client";

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={`mt-5 animate-spin w-52 mx-auto h-52 border-r-2 border-l-gray-700 border-l-2 border-r-black rounded-full ${className}`}
    ></div>
  );
}

export default LoadingSpinner;
