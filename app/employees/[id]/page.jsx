"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Mock data for demonstration
const MOCK_EMPLOYEES = [
  {
    id: "E001",
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "Employee",
    department: "Sales",
    manager: "Bob Smith",
    phone: "123-456-7890",
    joinDate: "2022-03-15",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    address: "123 Main St, Springfield",
    dob: "1990-05-12",
  },
  {
    id: "E002",
    name: "John Doe",
    email: "john@company.com",
    role: "Employee",
    department: "Marketing",
    manager: "Bob Smith",
    phone: "987-654-3210",
    joinDate: "2023-01-10",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    address: "456 Elm St, Springfield",
    dob: "1988-11-23",
  },
];

const MOCK_KPIS = [
  {
    id: 1,
    year: 2023,
    measure: "Increase sales",
    target: "20% growth",
    employeeScore: 85,
    managerScore: 90,
    status: "final",
  },
  {
    id: 2,
    year: 2022,
    measure: "Reduce complaints",
    target: "Below 5/month",
    employeeScore: 78,
    managerScore: 80,
    status: "final",
  },
];

const MOCK_PENDING = [
  { id: 1, task: "Submit Q2 sales report", due: "2024-06-10" },
  { id: 2, task: "Complete compliance training", due: "2024-06-20" },
];

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employee = MOCK_EMPLOYEES.find((e) => e.id === params.id) || MOCK_EMPLOYEES[0];

  // Pie chart data for KPI scores
  const pieData = {
    labels: MOCK_KPIS.map((kpi) => `${kpi.year} - ${kpi.measure}`),
    datasets: [
      {
        label: "Employee Score",
        data: MOCK_KPIS.map((kpi) => kpi.employeeScore),
        backgroundColor: [
          "rgba(37, 99, 235, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(251, 191, 36, 0.7)",
        ],
        borderColor: [
          "rgba(37, 99, 235, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(251, 191, 36, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        className="mb-6 flex items-center gap-2 text-accent dark:text-darkaccent hover:underline"
        onClick={() => router.back()}
      >
        <FaArrowLeft /> Back to Employees
      </button>
      {/* Top Section: Image + Details | KPI Chart + List */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Employee Image & Personal Details */}
        <div className="flex-1 bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6 flex flex-col items-center md:items-start">
          <img
            src={employee.image}
            alt={employee.name}
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-accent shadow"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 w-full">
            <div className="text-secondary dark:text-darktextSecondary"><b className="text-textPrimary dark:text-darktextPrimary">Name:</b> {employee.name}</div>
            <div className="text-secondary dark:text-darktextSecondary"><b className="text-textPrimary dark:text-darktextPrimary">ID:</b> {employee.id}</div>
            <div className="text-secondary dark:text-darktextSecondary"><b className="text-textPrimary dark:text-darktextPrimary">Email:</b> {employee.email}</div>
            <div className="text-secondary dark:text-darktextSecondary"><b className="text-textPrimary dark:text-darktextPrimary">Role:</b> {employee.role}</div>
            <div className="text-secondary dark:text-darktextSecondary"><b className="text-textPrimary dark:text-darktextPrimary">Department:</b> {employee.department}</div>
            <div className="text-secondary dark:text-darktextSecondary"><b className="text-textPrimary dark:text-darktextPrimary">Manager:</b> {employee.manager}</div>
            <div className="text-secondary dark:text-darktextSecondary"><b className="text-textPrimary dark:text-darktextPrimary">Phone:</b> {employee.phone}</div>
            <div className="text-secondary dark:text-darktextSecondary"><b className="text-textPrimary dark:text-darktextPrimary">Join Date:</b> {employee.joinDate}</div>
            <div className="text-secondary dark:text-darktextSecondary"><b className="text-textPrimary dark:text-darktextPrimary">DOB:</b> {employee.dob}</div>
            <div className="md:col-span-2 text-secondary dark:text-darktextSecondary"><b className="text-textPrimary dark:text-darktextPrimary">Address:</b> {employee.address}</div>
          </div>
        </div>
        {/* KPI Pie Chart & List */}
        <div className="flex-1 bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-textSecondary dark:text-darktextSecondary">
            Previous Year KPIs
          </h3>
          <div className="w-48 h-48 mx-auto mb-4">
            <Pie data={pieData} />
          </div>
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left text-textPrimary dark:text-darktextPrimary">Year</th>
                <th className="px-2 py-1 text-left text-textPrimary dark:text-darktextPrimary">Measure</th>
                <th className="px-2 py-1 text-center text-textPrimary dark:text-darktextPrimary">Emp. Score</th>
                <th className="px-2 py-1 text-center text-textPrimary dark:text-darktextPrimary">Mgr. Score</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_KPIS.map((kpi) => (
                <tr key={kpi.id} className="border-b border-border text-textSecondary dark:text-darktextSecondary dark:border-darkborder">
                  <td className="px-2 py-1">{kpi.year}</td>
                  <td className="px-2 py-1">{kpi.measure}</td>
                  <td className="px-2 py-1 text-center">{kpi.employeeScore}</td>
                  <td className="px-2 py-1 text-center">{kpi.managerScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Bottom Section: Pending Work */}
      <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-textSecondary dark:text-darktextSecondary">
          Pending Work
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          {MOCK_PENDING.map((item) => (
            <li key={item.id}>
              <span className="font-medium text-textPrimary dark:text-darktextPrimary">{item.task}</span>
              <span className="ml-2 text-xs text-textSecondary dark:text-darktextSecondary">
                (Due: {item.due})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}