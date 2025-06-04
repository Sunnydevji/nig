import React from "react";
import { FaHome, FaUsers, FaChartBar, FaCog } from "react-icons/fa";

export function Sidebar({ links = [] }) {
  // Example default links if none provided
  const defaultLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <FaHome /> },
    { label: "Employees", href: "/employees", icon: <FaUsers /> },
    { label: "KPIs", href: "/kpi", icon: <FaChartBar /> },
    { label: "Settings", href: "/settings", icon: <FaCog /> },
  ];
  const navLinks = links.length ? links : defaultLinks;

  return (
    <aside className=" h-screen w-64 bg-cardBackground dark:bg-darkcardBackground shadow-lg border-r border-border dark:border-darkborder flex flex-col py-6 px-4 transition-colors">
      {/* Sidebar Title */}
      <div className="flex items-center gap-2 mb-8">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="Logo"
          className="w-8 h-8 rounded-full bg-white p-1 shadow"
        />
        <span className="font-bold text-xl text-accent dark:text-darkaccent tracking-tight">
          HR System
        </span>
      </div>
      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 flex-1">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-textPrimary dark:text-darktextPrimary hover:bg-accent hover:text-white dark:hover:bg-darkaccent transition font-medium"
            aria-label={link.label}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </a>
        ))}
      </nav>
      {/* Footer or User Info */}
      <div className="mt-8 text-xs text-textSecondary dark:text-darktextSecondary text-center">
        &copy; {new Date().getFullYear()} HR System. All rights reserved.
      </div>
    </aside>
  );
}