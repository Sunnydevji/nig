"use client";
import React, { useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import Notification from "@/components/Notification";
import { FaCheckCircle, FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaRegSave, FaPaperPlane } from "react-icons/fa";

const initialKPI = {
  measure: "",
  target: "",
  startTime: "",
  endTime: "",
  employeeScore: "",
  comments: "",
  step: "add", // add | score | send
};

const steps = [
  { key: "add", label: "Add Objective", icon: <FaEdit /> },
  { key: "score", label: "Score Yourself", icon: <FaRegSave /> },
  { key: "send", label: "Send to Manager", icon: <FaPaperPlane /> },
];

export default function IndividualKPIPage() {
  const [kpis, setKpis] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [draft, setDraft] = useState(initialKPI);
  const [notification, setNotification] = useState(null);
  const [activeStep, setActiveStep] = useState("add");

  // Add or update KPI in the list
  const handleSave = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      setKpis((prev) =>
        prev.map((k, idx) => (idx === editingIndex ? { ...draft, step: "add" } : k))
      );
    } else {
      setKpis((prev) => [...prev, { ...draft, step: "add" }]);
    }
    setDraft(initialKPI);
    setEditingIndex(null);
    setActiveStep("add");
  };

  // Edit a KPI
  const handleEdit = (idx) => {
    setDraft(kpis[idx]);
    setEditingIndex(idx);
    setActiveStep(kpis[idx].step);
  };

  // Remove a KPI
  const handleRemove = (idx) => {
    setKpis((prev) => prev.filter((_, i) => i !== idx));
    if (editingIndex === idx) {
      setDraft(initialKPI);
      setEditingIndex(null);
      setActiveStep("add");
    }
  };

  // Move KPI to next step
  const handleNextStep = (idx) => {
    setKpis((prev) =>
      prev.map((k, i) =>
        i === idx
          ? {
              ...k,
              step:
                k.step === "add"
                  ? "score"
                  : k.step === "score"
                  ? "send"
                  : "send",
            }
          : k
      )
    );
    setActiveStep(
      kpis[idx].step === "add"
        ? "score"
        : kpis[idx].step === "score"
        ? "send"
        : "send"
    );
  };

  // Move KPI to previous step
  const handlePrevStep = (idx) => {
    setKpis((prev) =>
      prev.map((k, i) =>
        i === idx
          ? {
              ...k,
              step:
                k.step === "send"
                  ? "score"
                  : k.step === "score"
                  ? "add"
                  : "add",
            }
          : k
      )
    );
    setActiveStep(
      kpis[idx].step === "send"
        ? "score"
        : kpis[idx].step === "score"
        ? "add"
        : "add"
    );
  };

  // Handle input change for draft or for scoring/comments
  const handleDraftChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleKpiChange = (idx, e) => {
    const { name, value } = e.target;
    setKpis((prev) =>
      prev.map((k, i) => (i === idx ? { ...k, [name]: value } : k))
    );
  };

  // Final submit (mock)
  const handleSend = (idx) => {
    setNotification({ type: "success", message: "KPI sent to manager! (mock)" });
    setKpis((prev) => prev.filter((_, i) => i !== idx));
    setActiveStep("add");
  };

  return (
    <RequireAuth>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-textPrimary dark:text-darktextPrimary">
          Individual KPI (SMART Goal)
        </h2>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-10">
          {steps.map((step, idx) => (
            <React.Fragment key={step.key}>
              <button
                type="button"
                className={`flex flex-col items-center px-6 py-2 font-semibold focus:outline-none transition
                  ${activeStep === step.key
                    ? "bg-accent text-white shadow-lg"
                    : "bg-cardBackground dark:bg-darkcardBackground text-textPrimary dark:text-darktextPrimary"}
                  rounded-t-lg border-b-4
                  ${activeStep === step.key
                    ? "border-accent"
                    : "border-transparent"}
                `}
                onClick={() => setActiveStep(step.key)}
                style={{ minWidth: 120 }}
              >
                <span className="text-xl mb-1">{step.icon}</span>
                <span className="text-sm">{step.label}</span>
              </button>
              {idx < steps.length - 1 && (
                <span className="w-8 h-1 bg-border dark:bg-darkborder rounded-full mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Add/Edit KPI Form (Add Step) */}
        {activeStep === "add" && (
          <form
            onSubmit={handleSave}
            className="bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow max-w-2xl mb-8"
          >
            <div className="mb-4">
              <label className="font-medium text-textSecondary dark:text-darktextSecondary">
                Measure
              </label>
              <input
                type="text"
                name="measure"
                value={draft.measure}
                onChange={handleDraftChange}
                required
                className="w-full mt-1 p-2 placeholder:text-textSecondary dark:placeholder:text-darktextSecondary border border-border dark:border-darkborder rounded"
                placeholder="e.g. Increase sales"
              />
            </div>
            <div className="mb-4">
              <label className="font-medium text-textSecondary dark:text-darktextSecondary">
                Target
              </label>
              <input
                type="text"
                name="target"
                value={draft.target}
                onChange={handleDraftChange}
                required
                className="w-full mt-1 p-2 border placeholder:text-textSecondary dark:placeholder:text-darktextSecondary border-border dark:border-darkborder rounded"
                placeholder="e.g. 20% growth"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="font-medium text-textSecondary dark:text-darktextSecondary">
                  Start Time
                </label>
                <input
                  type="date"
                  name="startTime"
                  value={draft.startTime}
                  onChange={handleDraftChange}
                  required
                  className="w-full mt-1 p-2 text-textSecondary dark:text-darktextSecondary border border-border dark:border-darkborder rounded"
                />
              </div>
              <div className="flex-1">
                <label className="font-medium text-textSecondary dark:text-darktextSecondary">
                  End Time
                </label>
                <input
                  type="date"
                  name="endTime"
                  value={draft.endTime}
                  onChange={handleDraftChange}
                  required
                  className="w-full mt-1 p-2 text-textSecondary dark:text-darktextSecondary border border-border dark:border-darkborder rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 bg-accent dark:bg-darkaccent hover:bg-buttonHover dark:hover:bg-darkbuttonHover text-white px-6 py-2 rounded font-semibold text-lg transition"
            >
              {editingIndex !== null ? "Update Objective" : "+ Add Objective"}
            </button>
            {editingIndex !== null && (
              <button
                type="button"
                className="ml-4 text-error dark:text-darkerror underline"
                onClick={() => {
                  setDraft(initialKPI);
                  setEditingIndex(null);
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        )}

        {/* Table of KPIs with stepper */}
        {kpis.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-textSecondary dark:text-darktextSecondary">
              Your Objectives (In Progress)
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-background dark:bg-darkBackground">
                    <th className="px-4 py-2">Measure</th>
                    <th className="px-4 py-2">Target</th>
                    <th className="px-4 py-2">Period</th>
                    <th className="px-4 py-2">Step</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {kpis.map((kpi, idx) => (
                    <tr key={idx} className="border-b border-border dark:border-darkborder">
                      <td className="px-4 py-2 text-textPrimary dark:text-darktextPrimary">{kpi.measure}</td>
                      <td className="px-4 py-2 text-textPrimary dark:text-darktextPrimary">{kpi.target}</td>
                      <td className="px-4 py-2 text-textPrimary dark:text-darktextPrimary">
                        {kpi.startTime} to {kpi.endTime}
                      </td>
                      <td className="px-4 py-2 text-textPrimary dark:text-darktextPrimary">
                        <div className="flex items-center gap-2">
                          {steps.map((step, sidx) => (
                            <span
                              key={step.key}
                              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs
                                ${kpi.step === step.key
                                  ? "bg-accent text-white font-bold"
                                  : "bg-gray-100 dark:bg-darkborder text-gray-500 dark:text-gray-400"}
                              `}
                            >
                              {step.icon}
                              {step.label.split(". ")[1]}
                              {kpi.step === step.key && <FaCheckCircle className="ml-1 text-green-400" />}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-2 flex gap-2 flex-wrap">
                        {kpi.step !== "add" && (
                          <button
                            className="flex items-center text-textPrimary dark:text-darktextPrimary gap-1 px-2 py-1 rounded bg-warning/20 text-warning text-xs hover:bg-warning/40 transition"
                            onClick={() => handlePrevStep(idx)}
                            title="Previous Step"
                          >
                            <FaArrowLeft /> Prev
                          </button>
                        )}
                        {kpi.step !== "send" && (
                          <button
                            className="flex items-center gap-1 px-2 py-1  rounded bg-accent/20 text-accent text-xs hover:bg-accent/40 transition"
                            onClick={() => handleNextStep(idx)}
                            title="Next Step"
                          >
                            Next <FaArrowRight />
                          </button>
                        )}
                        <button
                          className="flex items-center text-textPrimary dark:text-darktextPrimary gap-1 px-2 py-1 rounded bg-info/20 text-info text-xs hover:bg-info/40 transition"
                          onClick={() => handleEdit(idx)}
                          title="Edit"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="flex items-center gap-1 px-2 py-1 rounded bg-error/20 text-error text-xs hover:bg-error/40 transition"
                          onClick={() => handleRemove(idx)}
                          title="Remove"
                        >
                          <FaTrash /> Remove
                        </button>
                        {kpi.step === "score" && (
                          <button
                            className="flex items-center gap-1 px-2 py-1 rounded bg-success/20 text-success text-xs hover:bg-success/40 transition"
                            onClick={() => handleNextStep(idx)}
                            title="Save Score"
                          >
                            <FaRegSave /> Save Score
                          </button>
                        )}
                        {kpi.step === "send" && (
                          <button
                            className="flex items-center gap-1 px-2 py-1 rounded bg-success text-white text-xs hover:bg-success/80 transition"
                            onClick={() => handleSend(idx)}
                            title="Send to Manager"
                          >
                            <FaPaperPlane /> Send
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Per-KPI Stepper Forms */}
            {kpis.map((kpi, idx) =>
              activeStep === "score" && kpi.step === "score" ? (
                <form
                  key={idx}
                  onSubmit={e => {
                    e.preventDefault();
                    handleNextStep(idx);
                  }}
                  className="bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow max-w-xl my-6"
                >
                  <h4 className="font-semibold mb-4 text-accent dark:text-darkaccent">
                    Score Yourself for: {kpi.measure}
                  </h4>
                  <div className="mb-4">
                    <label className="font-medium text-textSecondary dark:text-darktextSecondary">
                      Employee Score
                    </label>
                    <input
                      type="number"
                      name="employeeScore"
                      value={kpi.employeeScore}
                      onChange={e => handleKpiChange(idx, e)}
                      min="0"
                      max="100"
                      required
                      className="w-full placeholder:text-textSecondary dark:placeholder:text-darktextSecondary mt-1 p-2 border border-border dark:border-darkborder rounded"
                      placeholder="0-100"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="font-medium text-textSecondary dark:text-darktextSecondary">
                      Comments
                    </label>
                    <textarea
                      name="comments"
                      value={kpi.comments}
                      onChange={e => handleKpiChange(idx, e)}
                      rows={3}
                      className="w-full mt-1 p-2 placeholder:text-textSecondary dark:placeholder:text-darktextSecondary border border-border dark:border-darkborder rounded resize-vertical"
                      placeholder="Add any comments..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 bg-accent dark:bg-darkaccent hover:bg-buttonHover dark:hover:bg-darkbuttonHover text-white px-6 py-2 rounded font-semibold text-lg transition"
                  >
                    Next: Send to Manager
                  </button>
                </form>
              ) : null
            )}
            {kpis.map((kpi, idx) =>
              activeStep === "send" && kpi.step === "send" ? (
                <div
                  key={idx}
                  className="bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow max-w-xl my-6"
                >
                  <h4 className="font-semibold mb-4 text-accent dark:text-darkaccent">
                    Review &amp; Send: {kpi.measure}
                  </h4>
                  <div className="mb-2 text-textPrimary dark:text-darktextPrimary"><b className="text-textSecondary dark:text-darktextSecondary">Target:</b> {kpi.target}</div>
                  <div className="mb-2 text-textPrimary dark:text-darktextPrimary"><b className="text-textSecondary dark:text-darktextSecondary">Period:</b> {kpi.startTime} to {kpi.endTime}</div>
                  <div className="mb-2 text-textPrimary dark:text-darktextPrimary"><b className="text-textSecondary dark:text-darktextSecondary">Employee Score:</b> {kpi.employeeScore}</div>
                  <div className="mb-2 text-textPrimary dark:text-darktextPrimary"><b className="text-textSecondary dark:text-darktextSecondary">Comments:</b> {kpi.comments}</div>
                  <button
                    className="mt-4 bg-success text-white px-6 py-2 rounded font-semibold text-lg transition"
                    onClick={() => handleSend(idx)}
                  >
                    Send to Manager
                  </button>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </RequireAuth>
  );
}