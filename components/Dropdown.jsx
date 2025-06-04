import React, { useState } from "react";

export function Dropdown({ options = [], onSelect, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    onSelect && onSelect(option);
  };

  return (
    <div className="relative">
      <button
        className="w-full px-4 py-2 border rounded bg-white dark:bg-zinc-900 text-left"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        {selected ? selected.label : placeholder}
      </button>
      {open && (
        <ul className="absolute z-10 w-full bg-white dark:bg-zinc-900 border rounded mt-1 shadow">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 hover:bg-[var(--accent)] hover:text-white cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}