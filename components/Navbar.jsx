import React from "react";
import ToggleDark from "../app/utils/toogleDark";
import { FaUserCircle } from "react-icons/fa";

export function Navbar({ user }) {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-cardBackground dark:bg-darkcardBackground shadow border-b border-border dark:border-darkborder transition-colors z-40">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="Logo"
          className="w-8 h-8 rounded-full bg-white p-1 shadow"
        />
        <span className="font-bold text-xl text-accent dark:text-darkaccent tracking-tight">
          HR System
        </span>
      </div>
      {/* User Info & Theme Toggle */}
      <div className="flex items-center gap-4">
        <ToggleDark />
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-accent dark:text-darkaccent" />
          <span className="font-medium text-textPrimary dark:text-darktextPrimary">
            {user.name}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          logout();
          router.push("/auth");
        }}
        className="ml-4 px-3 py-1 rounded bg-error dark:bg-darkerror text-textPrimary dark:text-darktextPrimary transition"
      >
        Logout
      </button>
    </nav>
  );
}