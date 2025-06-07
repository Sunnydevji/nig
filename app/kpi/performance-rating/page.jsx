"use client"
import React, { useState } from "react";

const KPI_LIST = [
	{
		key: "goal_achievement",
		label: "Goal Achievement",
		description:
			"How well did you achieve your set goals and objectives?",
	},
	{
		key: "quality_of_work",
		label: "Quality of Work",
		description:
			"Evaluate the accuracy, thoroughness, and effectiveness of your work.",
	},
	{
		key: "initiative",
		label: "Initiative",
		description: "How often do you take proactive steps and show ownership?",
	},
	{
		key: "collaboration",
		label: "Collaboration",
		description:
			"How well do you work with others and contribute to team success?",
	},
	{
		key: "adaptability",
		label: "Adaptability",
		description: "How effectively do you handle change and new challenges?",
	},
];

const RATING_SCALE = [
	{
		value: 1,
		label: "Unsatisfactory",
		description:
			"Performance is below the acceptable standard. Significant improvement is needed.",
	},
	{
		value: 2,
		label: "Needs Improvement",
		description:
			"Performance occasionally meets objectives but falls short in several areas.",
	},
	{
		value: 3,
		label: "Meets Expectations",
		description: "Performance consistently meets objectives and standards.",
	},
	{
		value: 4,
		label: "Exceeds Expectations",
		description: "Performance often exceeds objectives and standards.",
	},
	{
		value: 5,
		label: "Outstanding",
		description: "Performance significantly exceeds objectives and standards.",
	},
];

export default function PerformanceRatingKPIPage() {
	const [form, setForm] = useState(
		KPI_LIST.reduce(
			(acc, kpi) => ({
				...acc,
				[kpi.key]: { rating: "", comment: "" },
			}),
			{}
		)
	);
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (kpiKey, field, value) => {
		setForm((prev) => ({
			...prev,
			[kpiKey]: {
				...prev[kpiKey],
				[field]: value,
			},
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
		// Send form to backend here if needed
	};

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4 text-accent">
				Performance Rating (KPI Based)
			</h1>
			<div className="bg-cardBackground dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow mb-8">
				<p className="mb-4 text-lg">
					<strong>Welcome to the KPI-based Performance Review!</strong> Please
					rate your performance for each KPI area below. Use the scale to guide
					your ratings and provide comments for context. This process helps
					align your individual contributions with our business objectives and
					supports your growth.
				</p>
			</div>

			<div className="mb-8">
				<h2 className="text-2xl font-semibold mb-3 text-accent">
					Performance Rating Scale
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{RATING_SCALE.map((item) => (
						<div
							key={item.value}
							className="bg-white dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-lg p-4 shadow-sm"
						>
							<div className="flex items-center gap-2 mb-1">
								<span className="font-bold text-lg text-accent">
									{item.value}
								</span>
								<span className="font-semibold">{item.label}</span>
							</div>
							<div className="text-sm text-textSecondary dark:text-darktextSecondary">
								{item.description}
							</div>
						</div>
					))}
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className="bg-white dark:bg-darkcardBackground border border-border dark:border-darkborder rounded-xl p-6 shadow space-y-8"
			>
				{KPI_LIST.map((kpi) => (
					<div key={kpi.key}>
						<div className="mb-2">
							<span className="font-semibold text-accent">{kpi.label}</span>
							<div className="text-xs text-textSecondary dark:text-darktextSecondary">
								{kpi.description}
							</div>
						</div>
						<div className="flex flex-wrap items-center gap-4 mb-2">
							{RATING_SCALE.map((rating) => (
								<label
									key={rating.value}
									className="flex flex-col items-center cursor-pointer"
								>
									<input
										type="radio"
										name={`${kpi.key}_rating`}
										value={rating.value}
										checked={
											form[kpi.key].rating === String(rating.value)
										}
										onChange={() =>
											handleChange(kpi.key, "rating", String(rating.value))
										}
										className="accent-accent"
										required
									/>
									<span className="text-xs">{rating.label}</span>
								</label>
							))}
						</div>
						{form[kpi.key].rating && (
							<div className="text-info dark:text-darkinfo text-xs italic mb-2">
								{
									RATING_SCALE.find(
										(r) => String(r.value) === form[kpi.key].rating
									)?.description
								}
							</div>
						)}
						<textarea
							className="w-full p-2 border border-border dark:border-darkborder rounded resize-vertical"
							placeholder="Comments (optional)"
							value={form[kpi.key].comment}
							onChange={(e) =>
								handleChange(kpi.key, "comment", e.target.value)
							}
							rows={2}
						/>
					</div>
				))}
				<button
					type="submit"
					className="bg-accent dark:bg-darkaccent hover:bg-buttonHover dark:hover:bg-darkbuttonHover text-white px-6 py-2 rounded font-semibold text-lg transition"
				>
					Submit Performance Rating
				</button>
				{submitted && (
					<div className="mt-4 text-success dark:text-darksuccess font-semibold">
						Performance rating submitted! (mock)
					</div>
				)}
			</form>
		</div>
	);
}