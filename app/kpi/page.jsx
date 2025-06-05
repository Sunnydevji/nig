"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaRegEye, FaRegCommentDots } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
// import { fetchEmployeeKPIs, fetchTeamKPIs, submitKPI, scoreKPI, finalizeKPI, fetchPreviousEmployeeKPIs } from "../services/kpi";
import RequireAuth from "@/components/RequireAuth";
import Notification from "@/components/Notification";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- TEMP MOCK DATA ---
const MOCK_PREVIOUS_KPIS = [
  {
    id: 1,
    measure: "Increase sales",
    target: "20% growth",
    startTime: "2024-01-01",
    endTime: "2024-06-30",
    employeeScore: 85,
    managerScore: 90,
    comments: "Great improvement in Q2.",
    managerComments: "Excellent leadership and initiative.",
    employee: "You",
  },
  {
    id: 2,
    measure: "Reduce customer complaints",
    target: "Below 5 per month",
    startTime: "2024-02-01",
    endTime: "2024-05-31",
    employeeScore: 78,
    managerScore: 80,
    comments: "Met the target consistently.",
    managerComments: "Good job maintaining quality.",
    employee: "You",
  },
];

const MOCK_TEAM_KPIS = [
  {
    id: 3,
    measure: "Improve onboarding",
    target: "Reduce time by 15%",
    startTime: "2024-03-01",
    endTime: "2024-06-30",
    employeeScore: 88,
    managerScore: 85,
    comments: "Streamlined process.",
    managerComments: "Well done.",
    employee: "Alice",
  },
  {
    id: 4,
    measure: "Boost engagement",
    target: "10% more survey responses",
    startTime: "2024-01-15",
    endTime: "2024-05-15",
    employeeScore: 80,
    managerScore: 82,
    comments: "Good communication.",
    managerComments: "Keep it up.",
    employee: "Bob",
  },
];

const initialKPI = {
  measure: "",
  target: "",
  startTime: "",
  endTime: "",
  employeeScore: "",
  managerScore: "",
  comments: "",
};

const avg = (arr) => (arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0);

export default function KPIRoleDashboard() {
  const user = useAuthStore((state) => state.user);
  const [role, setRole] = useState(user?.role?.toLowerCase() || "employee");
  const [kpi, setKpi] = useState(initialKPI);
  const [activeTab, setActiveTab] = useState("new");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [search, setSearch] = useState("");
  // --- Use mock data for now ---
  const [employeeKPIs, setEmployeeKPIs] = useState(MOCK_PREVIOUS_KPIS);
  const [previousKPIs, setPreviousKPIs] = useState(MOCK_PREVIOUS_KPIS);
  const [teamKPIs, setTeamKPIs] = useState(MOCK_TEAM_KPIS);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // --- COMMENTED OUT API CALLS ---
  /*
  useEffect(() => {
    if (role === "employee") {
      fetchPreviousEmployeeKPIs().then(data => setPreviousKPIs(data.kpis || []));
    }
  }, [role]);

  useEffect(() => {
    setLoading(true);
    if (role === "employee") {
      fetchEmployeeKPIs().then(data => {
        setEmployeeKPIs(data.kpis || []);
        setLoading(false);
      });
    } else {
      fetchTeamKPIs().then(data => {
        setTeamKPIs(data.kpis || []);
        setLoading(false);
      });
    }
  }, [role]);
  */

  // Submit new KPI (mock)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification({ type: "success", message: "KPI Submitted! (mock)" });
    setKpi(initialKPI);
    setLoading(false);
  };

  // Manager scores a KPI (mock)
  const handleScore = async (id, score, comments) => {
    setLoading(true);
    setNotification({ type: "success", message: "KPI scored! (mock)" });
    setLoading(false);
  };

  // Manager finalizes a KPI (mock)
  const handleFinalize = async (id) => {
    setLoading(true);
    setNotification({ type: "success", message: "KPI finalized and email sent! (mock)" });
    setLoading(false);
  };

  // Chart Data
  const employeeChartData = {
    labels: previousKPIs.map((kpi) => kpi.measure),
    datasets: [
      {
        label: "Employee Score",
        data: previousKPIs.map((kpi) => kpi.employeeScore),
        backgroundColor: "rgba(37, 99, 235, 0.7)",
      },
      {
        label: "Manager Score",
        data: previousKPIs.map((kpi) => kpi.managerScore),
        backgroundColor: "rgba(16, 185, 129, 0.7)",
      },
    ],
  };

  const managerChartData = {
    labels: teamKPIs.map((kpi) => kpi.employee),
    datasets: [
      {
        label: "Employee Score",
        data: teamKPIs.map((kpi) => kpi.employeeScore),
        backgroundColor: "rgba(37, 99, 235, 0.7)",
      },
      {
        label: "Manager Score",
        data: teamKPIs.map((kpi) => kpi.managerScore),
        backgroundColor: "rgba(16, 185, 129, 0.7)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    indexAxis: role === "manager" ? "y" : "x",
    plugins: {
      legend: {
        labels: { color: "var(--textSecondary)" },
      },
      title: {
        display: true,
        text: role === "manager" ? "Team KPI Comparison" : "Previous KPI Scores",
        color: "var(--textPrimary)",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: "var(--textSecondary)" },
        grid: { color: "var(--border)" },
      },
      y: {
        ticks: { color: "var(--textSecondary)" },
        grid: { color: "var(--border)" },
        beginAtZero: true,
      },
    },
  };

  // Modal for KPI details
  const openModal = (kpi) => {
    setSelectedKPI(kpi);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedKPI(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKpi((prev) => ({ ...prev, [name]: value }));
  };

  // Filtered KPIs for manager table
  const filteredTeamKPIs = teamKPIs.filter(
    (kpi) =>
      kpi.employee.toLowerCase().includes(search.toLowerCase()) ||
      kpi.measure.toLowerCase().includes(search.toLowerCase())
  );

  // --- UI ---
  return (
    <RequireAuth>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="max-w-7xl mx-auto p-6">
        {/* Role Switcher */}
        <div className="flex items-center gap-4 mb-8">
        <span className="font-semibold text-textSecondary dark:text-darktextSecondary">View as:</span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-border dark:border-darkborder rounded px-3 py-1 bg-cardBackground dark:bg-darkcardBackground text-textPrimary dark:text-darktextPrimary"
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
      </div>

        {/* Employee Dashboard */}
        {role === "employee" && (
          <>
            <h2 className="text-3xl font-bold mb-8 text-textPrimary dark:text-darktextPrimary">
              Individual KPI (SMART Goal)
            </h2>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border dark:border-darkborder">
              <button
                className={`px-4 py-2 font-semibold rounded-t ${activeTab === "new"
                    ? "bg-accent text-white"
                    : "bg-cardBackground dark:bg-darkcardBackground text-textPrimary dark:text-darktextPrimary"
                  }`}
                onClick={() => setActiveTab("new")}
              >
                New Objective
              </button>
              <button
                className={`px-4 py-2 font-semibold rounded-t ${activeTab === "previous"
                    ? "bg-accent text-white"
                    : "bg-cardBackground dark:bg-darkcardBackground text-textPrimary dark:text-darktextPrimary"
                  }`}
                onClick={() => setActiveTab("previous")}
              >
                Previous KPI Scores
              </button>
            </div>
            {/* Tab Content */}
            {activeTab === "new" && (
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* KPI Form */}
                <form
                  onSubmit={handleSubmit}
                  className="flex-1 bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow"
                >
                  <div className="mb-4">
                    <label className="font-medium text-textSecondary dark:text-darktextSecondary">Measure</label>
                    <input
                      type="text"
                      name="measure"
                      value={kpi.measure}
                      onChange={handleChange}
                      required
                      className="w-full mt-1 p-2 placeholder:text-textSecondary dark:placeholder:text-textSecondary border border-border dark:border-darkborder rounded focus:outline-accent"
                      placeholder="e.g. Increase sales"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="font-medium text-textSecondary dark:text-darktextSecondary">Target</label>
                    <input
                      type="text"
                      name="target"
                      value={kpi.target}
                      onChange={handleChange}
                      required
                      className="w-full mt-1 p-2 placeholder:text-textSecondary dark:placeholder:text-textSecondary border border-border dark:border-darkborder rounded focus:outline-accent"
                      placeholder="e.g. 20% growth"
                    />
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <label className="font-medium text-textSecondary dark:text-darktextSecondary">Start Time</label>
                      <input
                        type="date"
                        name="startTime"
                        value={kpi.startTime}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 text-textSecondary dark:text-textSecondary border border-border dark:border-darkborder rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-medium text-textSecondary dark:text-darktextSecondary">End Time</label>
                      <input
                        type="date"
                        name="endTime"
                        value={kpi.endTime}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 dark:text-textSecondary text-textSecondary border border-border dark:border-darkborder rounded"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <label className="font-medium text-textSecondary dark:text-darktextSecondary">Employee Score</label>
                      <input
                        type="number"
                        name="employeeScore"
                        value={kpi.employeeScore}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full mt-1 p-2 placeholder:text-textSecondary dark:placeholder:text-textSecondary border border-border dark:border-darkborder rounded"
                        placeholder="0-100"
                      />
                    </div>
                    <div className="flex-1 ">
                      <label className="font-medium text-textSecondary dark:text-darktextSecondary">Manager Score</label>
                      <input
                        type="number"
                        name="managerScore"
                        value={kpi.managerScore}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full mt-1 p-2 disabled:cursor-not-allowed placeholder:text-textSecondary dark:placeholder:text-textSecondary border border-border dark:border-darkborder rounded"
                        placeholder="0-100"
                        disabled={role === "employee"}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="font-medium text-textSecondary dark:text-darktextSecondary">Comments</label>
                    <textarea
                      name="comments"
                      value={kpi.comments}
                      onChange={handleChange}
                      rows={3}
                      className="w-full mt-1 p-2 placeholder:text-textSecondary dark:placeholder:text-textSecondary border border-border dark:border-darkborder rounded resize-vertical"
                      placeholder="Add any comments..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 bg-accent dark:bg-darkaccent hover:bg-buttonHover dark:hover:bg-darkbuttonHover text-white px-6 py-2 rounded font-semibold text-lg transition"
                  >
                    Submit KPI
                  </button>
                </form>
                {/* Chart */}
                <div className="flex-1 bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow min-w-[320px]">
                  <h3 className="text-xl font-semibold mb-4 text-textSecondary dark:text-darktextSecondary">
                    Previous KPI Scores
                  </h3>
                  <Bar data={employeeChartData} options={chartOptions} />
                </div>
              </div>
            )}

            {activeTab === "previous" && (
              <div className="bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow">
                <h3 className="text-xl font-semibold mb-4 text-textSecondary dark:text-darktextSecondary">
                  Previous KPI Scores
                </h3>
                <ul className="space-y-4">
                  {previousKPIs.map((item) => (
                    <li
                      key={item.id}
                      className="border-b border-border dark:border-darkborder pb-3 cursor-pointer hover:bg-accent/10 dark:hover:bg-darkaccent/10 rounded transition"
                      onClick={() => openModal(item)}
                    >
                      <div className="font-medium text-accent dark:text-darkaccent">{item.measure}</div>
                      <div className="text-sm text-textSecondary dark:text-darktextSecondary">
                        Target: <b>{item.target}</b>
                      </div>
                      <div className="text-xs text-textSecondary dark:text-darktextSecondary">
                        Period: {item.startTime} to {item.endTime}
                      </div>
                      <div className="text-xs text-success dark:text-darksuccess">
                        Employee Score: <b>{item.employeeScore}</b> | Manager Score: <b>{item.managerScore}</b>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Manager Dashboard */}
        {role === "manager" && (
          <>
            <h2 className="text-3xl font-bold mb-8 text-textPrimary dark:text-darktextPrimary">
              Manager KPI Dashboard
            </h2>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-accent dark:text-darkaccent">{teamKPIs.length}</span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-2">Objectives</span>
              </div>
              <div className="bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-success dark:text-darksuccess">
                  {avg(teamKPIs.map((k) => k.employeeScore))}
                </span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-2">Avg Employee Score</span>
              </div>
              <div className="bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-success dark:text-darksuccess">
                  {avg(teamKPIs.map((k) => k.managerScore))}
                </span>
                <span className="text-textSecondary dark:text-darktextSecondary mt-2">Avg Manager Score</span>
              </div>
            </div>
            {/* Chart */}
            <div className="bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow mb-8 overflow-x-auto" style={{ maxHeight: 500 }}>
              <div style={{ minWidth: Math.max(600, teamKPIs.length * 60) }}>
                <Bar data={managerChartData} options={{ ...chartOptions, indexAxis: "y" }} />
              </div>
            </div>
            {/* Table */}
            <div className="bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <h3 className="text-xl font-semibold text-textSecondary dark:text-darktextSecondary">
                  Team KPI Details
                </h3>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search employee or objective..."
                  className="border border-border dark:border-darkborder rounded px-3 py-1 bg-background dark:bg-darkBackground text-textPrimary dark:text-darktextPrimary"
                  style={{ maxWidth: 260 }}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-background dark:bg-darkBackground">
                      <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">Employee</th>
                      <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">Measure</th>
                      <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">Target</th>
                      <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">Period</th>
                      <th className="px-4 py-2 text-center font-semibold text-textSecondary dark:text-darktextSecondary">Emp. Score</th>
                      <th className="px-4 py-2 text-center font-semibold text-textSecondary dark:text-darktextSecondary">Mgr. Score</th>
                      <th className="px-4 py-2 text-center font-semibold text-textSecondary dark:text-darktextSecondary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeamKPIs.map((kpi) => (
                      <tr key={kpi.id} className="border-b border-border dark:border-darkborder hover:bg-accent/10 dark:hover:bg-darkaccent/10 transition">
                        <td className="px-4 py-2 text-textSecondary dark:text-darktextPrimary">{kpi.employee}</td>
                        <td className="px-4 py-2 text-textSecondary dark:text-darktextPrimary">{kpi.measure}</td>
                        <td className="px-4 py-2 text-textSecondary dark:text-darktextPrimary">{kpi.target}</td>
                        <td className="px-4 py-2 text-textSecondary dark:text-darktextPrimary">{kpi.startTime} - {kpi.endTime}</td>
                        <td className="px-4 py-2 text-center text-success dark:text-darksuccess font-semibold">{kpi.employeeScore}</td>
                        <td className="px-4 py-2 text-center text-success dark:text-darksuccess font-semibold">{kpi.managerScore}</td>
                        <td className="px-4 py-2 text-center flex gap-2 justify-center">
                          <button
                            className="p-2 rounded hover:bg-accent/20 dark:hover:bg-darkaccent/20 transition"
                            title="View Details"
                            onClick={() => openModal(kpi)}
                          >
                            <FaRegEye className="text-accent dark:text-darkaccent text-lg" />
                          </button>
                          <button
                            className="p-2 rounded hover:bg-accent/20 dark:hover:bg-darkaccent/20 transition"
                            title="Score KPI"
                            onClick={() => {
                              const score = prompt("Enter manager score:");
                              const comments = prompt("Enter manager comments:");
                              if (score) handleScore(kpi.id, score, comments);
                            }}
                          >
                            <FaRegCommentDots className="text-accent dark:text-darkaccent text-lg" />
                          </button>
                          <button
                            className="p-2 rounded hover:bg-accent/20 dark:hover:bg-darkaccent/20 transition"
                            title="Finalize KPI"
                            onClick={() => handleFinalize(kpi.id)}
                          >
                            <span className="text-accent dark:text-darkaccent text-lg font-bold">✔️</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredTeamKPIs.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-6 text-textSecondary dark:text-darktextSecondary">
                          No results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Modal for KPI Details */}
        {modalOpen && selectedKPI && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl p-8 shadow-lg max-w-lg w-full relative">
              <button
                className="absolute top-3 right-3 text-xl text-error dark:text-darkerror"
                onClick={closeModal}
                aria-label="Close"
              >
                &times;
              </button>
              <h4 className="text-2xl font-bold mb-2 text-accent dark:text-darkaccent">{selectedKPI.measure}</h4>
              {role === "manager" && (
                <div className="mb-2 text-textSecondary dark:text-darktextSecondary">
                  <b>Employee:</b> {selectedKPI.employee}
                </div>
              )}
              <div className="mb-2 text-textSecondary dark:text-darktextSecondary">
                <b>Target:</b> {selectedKPI.target}
              </div>
              <div className="mb-2 text-textSecondary dark:text-darktextSecondary">
                <b>Period:</b> {selectedKPI.startTime} to {selectedKPI.endTime}
              </div>
              <div className="mb-2 text-success dark:text-darksuccess">
                <b>Employee Score:</b> {selectedKPI.employeeScore}
              </div>
              <div className="mb-2 text-success dark:text-darksuccess">
                <b>Manager Score:</b> {selectedKPI.managerScore}
              </div>
              <div className="mb-2 text-textPrimary dark:text-darktextPrimary">
                <b>Employee Comments:</b> <i>{selectedKPI.comments}</i>
              </div>
              <div className="mb-2 text-textPrimary dark:text-darktextPrimary">
                <b>Manager Comments:</b> <i>{selectedKPI.managerComments}</i>
              </div>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}