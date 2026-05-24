"use client";

interface BadgeProps {
  type: "New" | "Sale" | "Out of Stock" | "Hot";
}

export default function Badge({ type }: BadgeProps) {
  const styles: Record<string, string> = {
    New: "bg-indigo-600 text-white",
    Sale: "bg-orange-500 text-white",
    "Out of Stock": "bg-gray-500 text-white",
    Hot: "bg-red-500 text-white",
  };

  return (
    <span
      className={
        "inline-block px-2 py-0.5 text-xs font-bold rounded-full uppercase tracking-wide " +
        (styles[type] || "bg-gray-400 text-white")
      }
    >
      {type}
    </span>
  );
}
