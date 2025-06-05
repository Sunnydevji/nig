import React from "react";
import { FaHome, FaUsers, FaChartBar, FaCog } from "react-icons/fa";

export function Sidebar({ user }) {
  // Define all possible links with allowed roles
  const allLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <FaHome />, roles: ["CEO", "Manager", "Team Leader", "Employee"] },
    { label: "Employees", href: "/employees", icon: <FaUsers />, roles: ["CEO", "Manager"] },
    { label: "KPIs", href: "/kpi", icon: <FaChartBar />, roles: ["CEO", "Manager", "Team Leader","Employee"] },
    { label: "Settings", href: "/settings", icon: <FaCog />, roles: ["CEO"] },
  ];

  // Filter links based on user role
  const navLinks = user
    ? allLinks.filter(link => link.roles.includes(user.role))
    : [];

  return (
    <aside className="h-screen w-64 bg-cardBackground dark:bg-darkcardBackground shadow-lg border-r border-border dark:border-darkborder flex flex-col py-6 px-4 transition-colors">
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