"use client";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import RequireAuth from "@/components/RequireAuth";
import { FaUserTie, FaUserCheck } from "react-icons/fa";

const MOCK_REVIEWS = [
  { id: 1, employee: "Alice Johnson", kpi: "Increase sales", status: "Pending", detail: "Review Alice's Q2 sales KPI submission." },
  { id: 2, employee: "John Doe", kpi: "Reduce complaints", status: "Reviewed", detail: "Reviewed John's KPI for customer complaints." },
];

export default function ReviewsPage() {
  const user = useAuthStore((state) => state.user);
  const [role, setRole] = useState(user?.role?.toLowerCase() || "employee");
  // Manager sees all, employee sees only their own
  const reviews = role === "manager"
    ? MOCK_REVIEWS
    : MOCK_REVIEWS.filter(r => r.employee === user?.name);

  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-accent dark:text-darkaccent flex items-center gap-2">
            {role === "manager" ? <FaUserTie /> : <FaUserCheck />}
            {role === "manager" ? "Review Requests" : "Your Reviews"}
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
          {reviews.length === 0 && (
            <div className="text-center py-6 text-textSecondary dark:text-darktextSecondary">
              No reviews found.
            </div>
          )}
          {reviews.map(review => (
            <div
              key={review.id}
              className={`flex flex-col md:flex-row md:items-center justify-between bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-4 border-l-4 ${
                review.status === "Reviewed"
                  ? "border-success"
                  : "border-warning"
              }`}
            >
              <div>
                <div className="font-semibold text-lg text-textPrimary dark:text-darktextPrimary">{review.kpi}</div>
                <div className="text-sm text-textSecondary dark:text-darktextSecondary">
                  Employee: {review.employee}
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                {/* <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    review.status === "Reviewed"
                      ? "bg-success/10 text-success dark:bg-darksuccess/10 dark:text-darksuccess"
                      : "bg-warning/10 text-warning dark:bg-darkwarning/10 dark:text-darkwarning"
                  }`}
                >
                  {review.status}
                </span> */}
                <button
                  className="ml-2 px-3 py-1 rounded bg-accent dark:bg-darkaccent text-white font-medium hover:bg-buttonHover dark:hover:bg-darkbuttonHover transition"
                  onClick={() => setSelectedReview(review)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Review Detail Modal */}
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl p-8 shadow-lg max-w-md w-full relative">
              <button
                className="absolute top-3 right-3 text-xl text-error dark:text-darkerror"
                onClick={() => setSelectedReview(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-2 text-accent dark:text-darkaccent">{selectedReview.kpi}</h3>
              <div className="mb-2 text-textSecondary dark:text-darktextSecondary">
                <b>Employee:</b> {selectedReview.employee}
              </div>
              {/* <div className="mb-2 text-textSecondary dark:text-darktextSecondary">
                <b>Status:</b> {selectedReview.status}
              </div> */}
              <div className="mb-2 text-textPrimary dark:text-darktextPrimary">
                <b>Details:</b> {selectedReview.detail}
              </div>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}