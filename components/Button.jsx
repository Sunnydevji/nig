import React from "react";

export function Button({ children, variant = "solid", ...props }) {
  const base = "px-4 py-2 rounded font-semibold transition focus:outline-none";
  const solid = "bg-[var(--accent)] text-white hover:bg-[var(--buttonHover)]";
  const outlined = "border border-[var(--accent)] text-[var(--accent)] bg-transparent hover:bg-[var(--accent)] hover:text-white";
  return (
    <button
      className={`${base} ${variant === "solid" ? solid : outlined}`}
      {...props}
    >
      {children}
    </button>
  );
}