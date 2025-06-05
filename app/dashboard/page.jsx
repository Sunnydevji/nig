"use client";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import RequireAuth from "@/components/RequireAuth";
import { FaUserTie, FaUser, FaUsers, FaChartBar, FaTasks } from "react-icons/fa";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [role, setRole] = useState(user?.role?.toLowerCase() || "employee");

  // Mock data for demonstration
  const EMPLOYEE_STATS = {
    kpis: 5,
    avgScore: 82,
    pendingTasks: 2,
    completedTasks: 12,
  };
  const MANAGER_STATS = {
    teamMembers: 8,
    teamAvgScore: 79,
    teamKPIs: 22,
    pendingReviews: 3,
  };

  return (
    <RequireAuth>
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-accent dark:text-darkaccent">
            Welcome, {user?.name}!
          </h1>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-textSecondary dark:text-darktextSecondary">View as:</span>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="border border-border dark:border-darkborder rounded px-3 py-1 bg-cardBackground dark:bg-darkcardBackground text-textPrimary dark:text-darktextPrimary"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>

        {/* Employee Dashboard */}
        {role === "employee" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6 flex flex-col items-center">
                <FaChartBar className="text-3xl text-accent dark:text-darkaccent mb-2" />
                <span className="text-2xl font-bold text-textPrimary dark:text-darktextPrimary">{EMPLOYEE_STATS.kpis}</span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-1">Your KPIs</span>
              </div>
              <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6 flex flex-col items-center">
                <FaUser className="text-3xl text-success dark:text-darksuccess mb-2" />
                <span className="text-2xl font-bold text-textPrimary dark:text-darktextPrimary">{EMPLOYEE_STATS.avgScore}</span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-1">Avg Score</span>
              </div>
              <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6 flex flex-col items-center">
                <FaTasks className="text-3xl text-textSecondary dark:text-darktextSecondary mb-2" />
                <span className="text-2xl font-bold text-textPrimary dark:text-darktextPrimary">{EMPLOYEE_STATS.pendingTasks}</span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-1">Pending Tasks</span>
              </div>
              <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6 flex flex-col items-center">
                <FaTasks className="text-3xl text-textSecondary dark:text-darktextSecondary mb-2" />
                <span className="text-2xl font-bold text-textPrimary dark:text-darktextPrimary">{EMPLOYEE_STATS.completedTasks}</span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-1">Completed Tasks</span>
              </div>
            </div>
            <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-textSecondary dark:text-darktextSecondary">
                Quick Links
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="/kpi"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-accent/10 dark:bg-darkaccent/10 hover:bg-accent/20 dark:hover:bg-darkaccent/20 transition shadow group"
                >
                  <FaChartBar className="text-2xl text-accent dark:text-darkaccent group-hover:scale-110 transition" />
                  <span className="font-semibold text-accent dark:text-darkaccent group-hover:underline">
                    View or Submit KPIs
                  </span>
                </a>
                <a
                  href="/tasks"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-success/10 dark:bg-darksuccess/10 hover:bg-success/20 dark:hover:bg-darksuccess/20 transition shadow group"
                >
                  <FaTasks className="text-2xl text-success dark:text-darksuccess group-hover:scale-110 transition" />
                  <span className="font-semibold text-success dark:text-darksuccess group-hover:underline">
                    View Tasks
                  </span>
                </a>
                <a
                  href="/profile"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-info/10 dark:bg-darkinfo/10 hover:bg-info/20 dark:hover:bg-darkinfo/20 transition shadow group"
                >
                  <FaUser className="text-2xl text-textPrimary dark:text-darktextPrimary group-hover:scale-110 transition" />
                  <span className="font-semibold text-textSecondary dark:text-darktextSecondary text-info dark:text-darkinfo group-hover:underline">
                    Your Profile
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Manager Dashboard */}
        {role === "manager" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6 flex flex-col items-center">
                <FaUsers className="text-3xl text-accent dark:text-darkaccent mb-2" />
                <span className="text-2xl font-bold">{MANAGER_STATS.teamMembers}</span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-1">Team Members</span>
              </div>
              <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6 flex flex-col items-center">
                <FaChartBar className="text-3xl text-success dark:text-darksuccess mb-2" />
                <span className="text-2xl font-bold">{MANAGER_STATS.teamAvgScore}</span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-1">Team Avg Score</span>
              </div>
              <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6 flex flex-col items-center">
                <FaTasks className="text-3xl text-warning dark:text-darkwarning mb-2" />
                <span className="text-2xl font-bold">{MANAGER_STATS.teamKPIs}</span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-1">Team KPIs</span>
              </div>
              <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6 flex flex-col items-center">
                <FaUserTie className="text-3xl text-info dark:text-darkinfo mb-2" />
                <span className="text-2xl font-bold">{MANAGER_STATS.pendingReviews}</span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-1">Pending Reviews</span>
              </div>
            </div>
            <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-textSecondary dark:text-darktextSecondary">
                Quick Links
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="/kpi"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-accent/10 dark:bg-darkaccent/10 hover:bg-accent/20 dark:hover:bg-darkaccent/20 transition shadow group"
                >
                  <FaChartBar className="text-2xl text-accent dark:text-darkaccent group-hover:scale-110 transition" />
                  <span className="font-semibold text-accent dark:text-darkaccent group-hover:underline">
                    Team KPIs
                  </span>
                </a>
                <a
                  href="/employees"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-success/10 dark:bg-darksuccess/10 hover:bg-success/20 dark:hover:bg-darksuccess/20 transition shadow group"
                >
                  <FaUsers className="text-2xl text-success dark:text-darksuccess group-hover:scale-110 transition" />
                  <span className="font-semibold text-success dark:text-darksuccess group-hover:underline">
                    Manage Employees
                  </span>
                </a>
                <a
                  href="/reviews"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-info/10 dark:bg-darkinfo/10 hover:bg-info/20 dark:hover:bg-darkinfo/20 transition shadow group"
                >
                  <FaUserTie className="text-2xl text-info dark:text-darkinfo group-hover:scale-110 transition" />
                  <span className="font-semibold text-info dark:text-darkinfo group-hover:underline">
                    Review Requests
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}