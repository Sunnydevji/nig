"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Add this import at the top

// Dummy data for analytics and reports
const EMPLOYEE_ANALYTICS = {
  totalKPIs: 6,
  submitted: 5,
  pending: 1,
  avgScore: 4.2,
  bestKPI: "Moral KPI",
};

const MANAGER_ANALYTICS = {
  totalEmployees: 4,
  allSubmitted: 2,
  pending: 2,
  avgScore: 3.9,
  topPerformer: "Jane Smith",
};

const EMPLOYEE_KPI_REPORT = [
  { type: "Individual KPI", status: "Submitted", score: 4.5, period: "Q2 2025" },
  { type: "Moral KPI", status: "Submitted", score: 4.0, period: "Q2 2025" },
  { type: "Performance KPI", status: "Pending", score: null, period: "Q2 2025" },
];

const MANAGER_KPI_REPORT = [
  {
    employee: "John Doe",
    type: "Individual KPI",
    status: "Submitted",
    score: 4.2,
    period: "Q2 2025",
  },
  {
    employee: "Jane Smith",
    type: "Moral KPI",
    status: "Submitted",
    score: 4.7,
    period: "Q2 2025",
  },
  {
    employee: "Alex Lee",
    type: "Performance KPI",
    status: "Pending",
    score: null,
    period: "Q2 2025",
  },
  {
    employee: "Sam Patel",
    type: "Individual KPI",
    status: "Pending",
    score: null,
    period: "Q2 2025",
  },
];

const KPI_TABS = [
  { key: "individual", label: "Individual KPI" },
  { key: "moral", label: "Moral KPI" },
  { key: "performance", label: "Performance KPI" },
];

function StatCard({ title, value, color, icon, sub }) {
  return (
    <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl p-6 shadow border border-border dark:border-darkborder flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {icon && <span className={`text-3xl ${color}`}>{icon}</span>}
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
      </div>
      <div className="text-sm text-textSecondary dark:text-darktextSecondary">{title}</div>
      {sub && <div className="text-xs text-info dark:text-darkinfo">{sub}</div>}
    </div>
  );
}

// SlideTabs component for animated tab switching
function SlideTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="relative flex gap-2 mb-6 border-b border-border dark:border-darkborder">
      {tabs.map((tab, idx) => (
        <button
          key={tab.key}
          className={`relative px-4 py-2 font-semibold rounded-t transition-colors duration-300
            ${activeTab === tab.key
              ? "bg-accent text-white shadow"
              : "bg-cardBackground dark:bg-darkcardBackground text-textPrimary dark:text-darktextPrimary hover:bg-accent/10"}
          `}
          style={{
            zIndex: activeTab === tab.key ? 2 : 1,
            transition: "background 0.3s, color 0.3s"
          }}
          onClick={() => setActiveTab(tab.key)}
          type="button"
        >
          {tab.label}
          {activeTab === tab.key && (
            <span
              className="absolute left-0 bottom-0 w-full h-1 bg-accent rounded-t transition-all duration-300"
              style={{ zIndex: 3 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

// AnimatedTable wrapper for smooth tab transitions
function AnimatedTable({ children, activeKey }) {
  // Use a key on the wrapper to trigger React's transition
  return (
    <div
      key={activeKey}
      className="transition-all duration-500 ease-in-out animate-fadein"
      style={{
        animation: "fadein 0.5s",
      }}
    >
      {children}
      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateX(40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        .animate-fadein {
          animation: fadein 0.5s;
        }
      `}</style>
    </div>
  );
}

export default function ReportPage() {
  const [role, setRole] = useState("employee");
  const [activeTab, setActiveTab] = useState("individual");
  const router = useRouter();

  // Filtered data for tabs
  const employeeTabData = EMPLOYEE_KPI_REPORT.filter((kpi) =>
    activeTab === "individual"
      ? kpi.type === "Individual KPI"
      : activeTab === "moral"
      ? kpi.type === "Moral KPI"
      : kpi.type === "Performance KPI"
  );

  const managerTabData = MANAGER_KPI_REPORT.filter((kpi) =>
    activeTab === "individual"
      ? kpi.type === "Individual KPI"
      : activeTab === "moral"
      ? kpi.type === "Moral KPI"
      : kpi.type === "Performance KPI"
  );

  // Pending KPIs for manager
  const pendingKPIs = MANAGER_KPI_REPORT.filter(
    (kpi) => kpi.status === "Pending" && (
      (activeTab === "individual" && kpi.type === "Individual KPI") ||
      (activeTab === "moral" && kpi.type === "Moral KPI") ||
      (activeTab === "performance" && kpi.type === "Performance KPI")
    )
  );

  // Helper to get employee id by name (from your MOCK_EMPLOYEES)
  const getEmployeeIdByName = (name) => {
    // In real app, fetch from backend or context
    const EMPLOYEE_IDS = {
      "John Doe": "E002",
      "Jane Smith": "E003",
      "Alex Lee": "E004",
      "Sam Patel": "E005",
    };
    return EMPLOYEE_IDS[name] || "";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <label className="font-semibold text-lg">Role:</label>
        <select
          className="border border-border dark:border-darkborder rounded px-3 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {role === "employee" ? (
          <>
            <StatCard
              title="Total KPIs"
              value={EMPLOYEE_ANALYTICS.totalKPIs}
              color="text-accent"
              icon="📊"
            />
            <StatCard
              title="Submitted"
              value={EMPLOYEE_ANALYTICS.submitted}
              color="text-success"
              icon="✅"
            />
            <StatCard
              title="Pending"
              value={EMPLOYEE_ANALYTICS.pending}
              color="text-warning"
              icon="⏳"
            />
            <StatCard
              title="Average Score"
              value={EMPLOYEE_ANALYTICS.avgScore}
              color="text-info"
              icon="⭐"
              sub={`Best KPI: ${EMPLOYEE_ANALYTICS.bestKPI}`}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Total Employees"
              value={MANAGER_ANALYTICS.totalEmployees}
              color="text-accent"
              icon="👥"
            />
            <StatCard
              title="All KPIs Submitted"
              value={MANAGER_ANALYTICS.allSubmitted}
              color="text-success"
              icon="✅"
            />
            <StatCard
              title="Pending KPIs"
              value={MANAGER_ANALYTICS.pending}
              color="text-warning"
              icon="⏳"
            />
            <StatCard
              title="Average Score"
              value={MANAGER_ANALYTICS.avgScore}
              color="text-info"
              icon="⭐"
              sub={`Top Performer: ${MANAGER_ANALYTICS.topPerformer}`}
            />
          </>
        )}
      </div>

      {/* KPI Tabs with animation */}
      <SlideTabs tabs={KPI_TABS} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* KPI Table with animated slide-in */}
      <AnimatedTable activeKey={role + "-" + activeTab}>
        {role === "employee" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-xl overflow-hidden shadow bg-white dark:bg-darkcardBackground">
              <thead>
                <tr className="bg-background dark:bg-darkBackground">
                  <th className="px-6 py-3 text-left font-semibold text-xs uppercase tracking-wider">KPI Type</th>
                  <th className="px-6 py-3 text-left font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-xs uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left font-semibold text-xs uppercase tracking-wider">Period</th>
                </tr>
              </thead>
              <tbody>
                {employeeTabData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-textSecondary">
                      No data found.
                    </td>
                  </tr>
                ) : (
                  employeeTabData.map((kpi, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-border dark:border-darkborder hover:bg-accent/10 transition group"
                    >
                      <td className="px-6 py-3 font-medium">{kpi.type}</td>
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                          kpi.status === "Submitted"
                            ? "bg-success/10 text-success border border-success/20"
                            : "bg-warning/10 text-warning border border-warning/20"
                        }`}>
                          {kpi.status}
                        </span>
                      </td>
                      <td className="px-6 py-3">{kpi.score !== null ? kpi.score : "-"}</td>
                      <td className="px-6 py-3">{kpi.period}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full text-sm border rounded-xl overflow-hidden shadow bg-white dark:bg-darkcardBackground">
                <thead>
                  <tr className="bg-background dark:bg-darkBackground">
                    <th className="px-6 py-3 text-left font-semibold text-xs uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left font-semibold text-xs uppercase tracking-wider">KPI Type</th>
                    <th className="px-6 py-3 text-left font-semibold text-xs uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left font-semibold text-xs uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left font-semibold text-xs uppercase tracking-wider">Period</th>
                  </tr>
                </thead>
                <tbody>
                  {managerTabData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-textSecondary">
                        No data found.
                      </td>
                    </tr>
                  ) : (
                    managerTabData.map((kpi, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border dark:border-darkborder hover:bg-accent/10 transition group"
                      >
                        <td className="px-6 py-3 font-medium">
                          <button
                            className="text-accent underline hover:text-accent/80 transition"
                            onClick={() => {
                              const id = getEmployeeIdByName(kpi.employee);
                              if (id) {
                                router.push(`/employees/${id}`);
                              } else {
                                alert("Employee profile not found.");
                              }
                            }}
                            type="button"
                          >
                            {kpi.employee}
                          </button>
                        </td>
                        <td className="px-6 py-3">{kpi.type}</td>
                        <td className="px-6 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                            kpi.status === "Submitted"
                              ? "bg-success/10 text-success border border-success/20"
                              : "bg-warning/10 text-warning border border-warning/20"
                          }`}>
                            {kpi.status}
                          </span>
                        </td>
                        <td className="px-6 py-3">{kpi.score !== null ? kpi.score : "-"}</td>
                        <td className="px-6 py-3">{kpi.period}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pending KPIs */}
            {pendingKPIs.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-2 text-warning flex items-center gap-2">
                  <span>Pending KPIs</span>
                  <span className="inline-block bg-warning text-white rounded-full px-2 text-xs">{pendingKPIs.length}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingKPIs.map((kpi, idx) => (
                    <div
                      key={idx}
                      className="bg-warning/10 border border-warning rounded-xl p-4 shadow flex flex-col gap-1"
                    >
                      <div className="font-semibold text-warning mb-1">
                        {kpi.employee} - {kpi.type}
                      </div>
                      <div className="text-sm text-textSecondary dark:text-darktextSecondary">
                        Period: <span className="font-semibold">{kpi.period}</span>
                      </div>
                      <div className="text-sm text-textSecondary dark:text-darktextSecondary">
                        Status: <span className="font-semibold">{kpi.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </AnimatedTable>
    </div>
  );
}