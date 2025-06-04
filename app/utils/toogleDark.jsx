import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function ToggleDark() {
  const [dark, setDark] = useState(false);

  // On mount, check localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Update theme and localStorage
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className={`relative w-21 h-7 flex items-center rounded-full shadow-lg transition-colors duration-300
        ${dark ? "bg-gradient-to-r from-zinc-800 to-zinc-600" : "bg-gradient-to-r from-yellow-300 to-yellow-500"}
        focus:outline-none`}
      style={{
        perspective: "300px",
      }}
      aria-label="Toggle dark mode"
    >
      <span
        className={`absolute left-1 top-1 w-5 h-5 flex items-center justify-center rounded-full shadow-md transition-all duration-500
          ${dark ? "translate-x-7 rotate-y-180 bg-zinc-900 text-yellow-300" : "translate-x-0 bg-white text-yellow-500"}
        `}
        style={{
          transform: dark
            ? "translateX(28px) rotateY(180deg)"
            : "translateX(0px) rotateY(0deg)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        {dark ? <FaMoon size={15} /> : <FaSun size={15} />}
      </span>
      <span className="absolute left-2 text-yellow-400 opacity-70">
        <FaSun size={12} />
      </span>
      <span className="absolute right-2 text-zinc-400 opacity-70">
        <FaMoon size={12} />
      </span>
    </button>
  );
}

export default ToggleDark;