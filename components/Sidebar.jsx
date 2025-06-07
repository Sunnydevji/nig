// import React from "react";
// import { FaHome, FaUsers, FaChartBar, FaCog, FaTasks, FaUserCircle, FaClipboardCheck } from "react-icons/fa";

// export function Sidebar({ user }) {
//   // Define all possible links with allowed roles
//   const allLinks = [
//     { label: "Dashboard", href: "/dashboard", icon: <FaHome />, roles: ["CEO", "Manager", "Team Leader", "Employee"] },
//     { label: "Employees", href: "/employees", icon: <FaUsers />, roles: ["CEO", "Manager"] },
//     { label: "KPIs", href: "/kpi", icon: <FaChartBar />, roles: ["CEO", "Manager", "Team Leader", "Employee"] },
//     { label: "Tasks", href: "/tasks", icon: <FaTasks />, roles: ["CEO", "Manager", "Team Leader", "Employee"] },
//     { label: "Profile", href: "/profile", icon: <FaUserCircle />, roles: ["CEO", "Manager", "Team Leader", "Employee"] },
//     { label: "Review Requests", href: "/reviews", icon: <FaClipboardCheck />, roles: ["CEO", "Manager"] },
//     { label: "Settings", href: "/settings", icon: <FaCog />, roles: ["CEO"] },
//   ];

//   // Filter links based on user role
//   const navLinks = user
//     ? allLinks.filter(link => link.roles.includes(user.role))
//     : [];

//   return (
//     <aside className="h-screen w-64 bg-cardBackground dark:bg-darkcardBackground shadow-lg border-r border-border dark:border-darkborder flex flex-col py-6 px-4 transition-colors">
//       {/* Sidebar Title */}
//       <div className="flex items-center gap-2 mb-8">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
//           alt="Logo"
//           className="w-8 h-8 rounded-full bg-white p-1 shadow"
//         />
//         <span className="font-bold text-xl text-accent dark:text-darkaccent tracking-tight">
//           HR System
//         </span>
//       </div>
//       {/* Navigation Links */}
//       <nav className="flex flex-col gap-2 flex-1">
//         {navLinks.map((link) => (
//           <a
//             key={link.href}
//             href={link.href}
//             className="flex items-center gap-3 px-3 py-2 rounded-lg text-textPrimary dark:text-darktextPrimary hover:bg-accent hover:text-white dark:hover:bg-darkaccent transition font-medium"
//             aria-label={link.label}
//           >
//             <span className="text-lg">{link.icon}</span>
//             {link.label}
//           </a>
//         ))}
//       </nav>
//       {/* Footer or User Info */}
//       <div className="mt-8 text-xs text-textSecondary dark:text-darktextSecondary text-center">
//         &copy; {new Date().getFullYear()} HR System. All rights reserved.
//       </div>
//     </aside>
//   );
// }

import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaCog,
  FaTasks,
  FaUserCircle,
  FaClipboardCheck,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

export function Sidebar({ user }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const allLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <FaHome />, roles: ["CEO", "Manager", "Team Leader", "Employee"] },
    { label: "Employees", href: "/employees", icon: <FaUsers />, roles: ["CEO", "Manager"] },
    {
      label: "KPIs",
      icon: <FaChartBar />,
      roles: ["CEO", "Manager", "Team Leader", "Employee"],
      dropdown: [
        { label: "Individual KPI", href: "/kpi/individual" },
        { label: "Morals KPI", href: "/kpi/morals" },
        // { label: "Performance Rating", href: "/kpi/performance-rating" },
        { label: "Report", href: "/kpi/report" },
      ],
    },
    { label: "Tasks", href: "/tasks", icon: <FaTasks />, roles: ["CEO", "Manager", "Team Leader", "Employee"] },
    { label: "Profile", href: "/profile", icon: <FaUserCircle />, roles: ["CEO", "Manager", "Team Leader", "Employee"] },
    { label: "Review Requests", href: "/reviews", icon: <FaClipboardCheck />, roles: ["CEO", "Manager"] },
    { label: "Settings", href: "/settings", icon: <FaCog />, roles: ["CEO"] },
  ];

  const navLinks = user
    ? allLinks.filter((link) => link.roles.includes(user.role))
    : [];

  return (
    <aside className="h-screen w-64 bg-cardBackground dark:bg-darkcardBackground shadow-lg border-r border-border dark:border-darkborder flex flex-col py-6 px-4 transition-colors">
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
      <nav className="flex flex-col gap-2 flex-1">
        {navLinks.map((link) =>
          link.dropdown ? (
            <div key={link.label} className="relative">
              <button
                type="button"
                className={`flex items-center justify-between w-full gap-3 px-3 py-2 rounded-lg text-textPrimary dark:text-darktextPrimary hover:bg-accent/90 hover:text-white dark:hover:bg-darkaccent/90 transition font-medium focus:outline-none`}
                onClick={() =>
                  setOpenDropdown(openDropdown === link.label ? null : link.label)
                }
                aria-haspopup="menu"
                aria-expanded={openDropdown === link.label}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </span>
                {openDropdown === link.label ? (
                  <FaChevronUp className="text-xs" />
                ) : (
                  <FaChevronDown className="text-xs" />
                )}
              </button>
              {openDropdown === link.label && (
                <div className="ml-7 mt-1 flex flex-col bg-cardBackground dark:bg-darkcardBackground rounded-lg shadow border border-border dark:border-darkborder animate-fadein z-10 absolute left-0 w-48">
                  {link.dropdown.map((dropdownLink) => (
                    <a
                      key={dropdownLink.href}
                      href={dropdownLink.href}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-textPrimary dark:text-darktextPrimary hover:bg-accent hover:text-white dark:hover:bg-darkaccent transition font-medium"
                      aria-label={dropdownLink.label}
                    >
                      {dropdownLink.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-textPrimary dark:text-darktextPrimary hover:bg-accent hover:text-white dark:hover:bg-darkaccent transition font-medium"
              aria-label={link.label}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </a>
          )
        )}
      </nav>
      <div className="mt-8 text-xs text-textSecondary dark:text-darktextSecondary text-center">
        &copy; {new Date().getFullYear()} HR System. All rights reserved.
      </div>
    </aside>
  );
}