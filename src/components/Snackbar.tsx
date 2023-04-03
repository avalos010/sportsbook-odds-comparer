"use client";
function Snackbar({ message, type, className }: SnackbarProps) {
  return (
    <div
      className={`${
        type === "error" ? "bg-red-700" : "bg-green-700"
      } p-3 text-center w-full bg-red ${className}}`}
    >
      <p className="text-lg text-white">{message}</p>
    </div>
  );
}

interface SnackbarProps {
  message: string;
  type: "success" | "error";
  className?: string;
}

export default Snackbar;
