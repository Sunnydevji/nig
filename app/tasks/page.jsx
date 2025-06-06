"use client";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import RequireAuth from "@/components/RequireAuth";
import { FaCheckCircle, FaHourglassHalf, FaUserTie, FaUser } from "react-icons/fa";

const MOCK_EMPLOYEE_TASKS = [
  { id: 1, title: "Submit Q2 sales report", due: "2024-06-10", status: "Pending", detail: "Prepare and submit the Q2 sales report to your manager." },
  { id: 2, title: "Complete compliance training", due: "2024-06-20", status: "Pending", detail: "Finish the annual compliance training module." },
  { id: 3, title: "Update CRM records", due: "2024-05-30", status: "Completed", detail: "Ensure all customer records are up to date in the CRM." },
];

const MOCK_MANAGER_TASKS = [
  { id: 1, title: "Review Alice's KPI", due: "2024-06-12", status: "Pending", detail: "Review and score Alice Johnson's submitted KPI." },
  { id: 2, title: "Approve leave requests", due: "2024-06-15", status: "Pending", detail: "Check and approve pending leave requests from your team." },
  { id: 3, title: "Team meeting prep", due: "2024-06-18", status: "Completed", detail: "Prepare agenda and materials for the upcoming team meeting." },
];

export default function TasksPage() {
  const user = useAuthStore((state) => state.user);
  const [role, setRole] = useState(user?.role?.toLowerCase() || "employee");
  const tasks = role === "manager" ? MOCK_MANAGER_TASKS : MOCK_EMPLOYEE_TASKS;
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-accent dark:text-darkaccent flex items-center gap-2">
            {role === "manager" ? <FaUserTie /> : <FaUser />}
            {role === "manager" ? "Manager Tasks" : "Your Tasks"}
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
        <div className="grid gap-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`flex flex-col md:flex-row md:items-center justify-between bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-4 border-l-4 ${
                task.status === "Completed"
                  ? "border-success"
                  : "border-warning"
              }`}
            >
              <div>
                <div className="font-semibold text-textPrimary dark:text-darktextPrimary text-lg flex items-center gap-2">
                  {task.status === "Completed" ? (
                    <FaCheckCircle className="text-success dark:text-darksuccess" />
                  ) : (
                    <FaHourglassHalf className="text-warning dark:text-darkwarning" />
                  )}
                  {task.title}
                </div>
                <div className="text-sm text-textSecondary dark:text-darktextSecondary">
                  Due: {task.due}
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                {/* <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    task.status === "Completed"
                      ? "bg-success/10 text-success dark:bg-darksuccess/10 dark:text-darksuccess"
                      : "bg-warning/10 text-warning dark:bg-darkwarning/10 dark:text-darkwarning"
                  }`}
                >
                  {task.status}
                </span> */}
                <button
                  className="ml-2 px-3 py-1 rounded bg-accent dark:bg-darkaccent text-white font-medium hover:bg-buttonHover dark:hover:bg-darkbuttonHover transition"
                  onClick={() => setSelectedTask(task)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Task Detail Modal */}
        {selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl p-8 shadow-lg max-w-md w-full relative">
              <button
                className="absolute top-3 right-3 text-xl text-error dark:text-darkerror"
                onClick={() => setSelectedTask(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-2 text-accent dark:text-darkaccent">{selectedTask.title}</h3>
              {/* <div className="mb-2 text-textSecondary dark:text-darktextSecondary">
                <b>Status:</b> {selectedTask.status}
              </div> */}
              <div className="mb-2 text-textSecondary dark:text-darktextSecondary">
                <b>Due Date:</b> {selectedTask.due}
              </div>
              <div className="mb-2 text-textPrimary dark:text-darktextPrimary">
                <b>Details:</b> {selectedTask.detail}
              </div>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}