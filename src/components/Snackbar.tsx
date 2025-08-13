"use client";
function Snackbar({ message, type, className }: SnackbarProps) {
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      className={`${
        type === "error" ? "bg-red-700" : "bg-green-700"
      } p-3 text-center w-full ${className ?? ""}`}
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
