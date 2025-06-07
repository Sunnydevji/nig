"use client"
import React, { useState } from "react";

// Simulate fetched employee KPI submission
const EMPLOYEE_NAME = "John Doe";
const EMPLOYEE_KPI = {
	find_better_way: {
		employeeScore: "3",
		comments: "I tried new approaches in Q2.",
		improvement: "More collaboration with other teams.",
	},
	one_team_one_dream: {
		employeeScore: "4",
		comments: "Supported my team on the new project.",
		improvement: "Participate more in cross-team meetings.",
	},
	be_accountable: {
		employeeScore: "4",
		comments: "Delivered all my tasks on time.",
		improvement: "Be more proactive in reporting blockers.",
	},
	customer_first: {
		employeeScore: "5",
		comments: "Handled all customer queries promptly.",
		improvement: "Share customer feedback with the team.",
	},
};

const MORALS = [
	{
		key: "find_better_way",
		label: "Find A Better Way",
		description:
			"We constantly seek innovative solutions and improvements in our work, processes, and products.",
	},
	{
		key: "one_team_one_dream",
		label: "One Team One Dream",
		description:
			"We collaborate, support each other, and work towards shared goals as a unified team.",
	},
	{
		key: "be_accountable",
		label: "Be Accountable",
		description:
			"We take responsibility for our actions, deliver on commitments, and own our results.",
	},
	{
		key: "customer_first",
		label: "Consumer & Customer First",
		description:
			"We put the needs of our consumers and customers at the center of every decision.",
	},
];

const RATINGS = [
	{ value: 1, label: "Need Support" },
	{ value: 2, label: "Developing" },
	{ value: 3, label: "Doing Well" },
	{ value: 4, label: "Excellent" },
	{ value: 5, label: "Outstanding" },
];

const RATING_DESCRIPTIONS = {
	find_better_way: {
		1: "Rarely suggests improvements or new ideas.",
		2: "Sometimes suggests improvements but needs encouragement.",
		3: "Often suggests practical improvements and new ideas.",
		4: "Consistently brings valuable innovations to the team.",
		5: "Leads others in finding better ways and inspires innovation.",
	},
	one_team_one_dream: {
		1: "Rarely collaborates or supports team members.",
		2: "Sometimes works with the team but needs reminders.",
		3: "Works well with the team and supports others.",
		4: "Actively collaborates and encourages teamwork.",
		5: "Is a role model for unity and team spirit.",
	},
	be_accountable: {
		1: "Avoids responsibility and misses commitments.",
		2: "Sometimes needs reminders to deliver on commitments.",
		3: "Usually accountable and delivers on promises.",
		4: "Consistently responsible and owns results.",
		5: "Sets the standard for accountability and reliability.",
	},
	customer_first: {
		1: "Rarely considers customer needs in decisions.",
		2: "Sometimes considers customer needs but inconsistently.",
		3: "Usually puts customer needs first.",
		4: "Consistently prioritizes customer needs in all actions.",
		5: "Champions customer focus and influences others to do the same.",
	},
};

// Temporary data for submitted KPIs (employee and manager)
const EMPLOYEE_KPI_LIST = [
	{
		id: 1,
		period: "Q2 2025",
		status: "Submitted",
		date: "2025-06-01",
		morals: EMPLOYEE_KPI,
	},
	{
		id: 2,
		period: "Q1 2025",
		status: "Reviewed",
		date: "2025-03-31",
		morals: {
			find_better_way: {
				employeeScore: "4",
				comments: "Tried new tools.",
				improvement: "Share more ideas.",
			},
			one_team_one_dream: {
				employeeScore: "3",
				comments: "Helped team.",
				improvement: "More cross-team work.",
			},
			be_accountable: {
				employeeScore: "5",
				comments: "Always on time.",
				improvement: "",
			},
			customer_first: {
				employeeScore: "4",
				comments: "Quick responses.",
				improvement: "Gather more feedback.",
			},
		},
	},
];

const MANAGER_KPI_LIST = [
	{
		id: 1,
		employee: "John Doe",
		period: "Q2 2025",
		status: "Pending Review",
		date: "2025-06-01",
		morals: EMPLOYEE_KPI,
	},
	{
		id: 2,
		employee: "Jane Smith",
		period: "Q2 2025",
		status: "Reviewed",
		date: "2025-06-01",
		morals: {
			find_better_way: { employeeScore: "4", comments: "Good ideas.", improvement: "Share more." },
			one_team_one_dream: { employeeScore: "5", comments: "Great team player.", improvement: "" },
			be_accountable: { employeeScore: "4", comments: "Meets deadlines.", improvement: "Proactive reporting." },
			customer_first: { employeeScore: "5", comments: "Excellent service.", improvement: "" },
		},
	},
];

export default function MoralsKPIPage() {
	const [role, setRole] = useState("employee"); // "employee" or "manager"
	const [showModal, setShowModal] = useState(false);

	// Employee form state
	const [employeeForm, setEmployeeForm] = useState(
		MORALS.reduce(
			(acc, moral) => ({
				...acc,
				[moral.key]: {
					employeeScore: "",
					comments: "",
					improvement: "",
				},
			}),
			{}
		)
	);
	const [employeeSubmitted, setEmployeeSubmitted] = useState(false);

	// Manager form state
	const [managerForm, setManagerForm] = useState(
		MORALS.reduce(
			(acc, moral) => ({
				...acc,
				[moral.key]: {
					managerScore: "",
					agreedScore: "",
					managerComments: "",
				},
			}),
			{}
		)
	);
	const [managerSubmitted, setManagerSubmitted] = useState(false);
	const [meetingSent, setMeetingSent] = useState(false);

	// Handlers
	const handleEmployeeChange = (moralKey, field, value) => {
		setEmployeeForm((prev) => ({
			...prev,
			[moralKey]: {
				...prev[moralKey],
				[field]: value,
			},
		}));
	};

	const handleManagerChange = (moralKey, field, value) => {
		setManagerForm((prev) => ({
			...prev,
			[moralKey]: {
				...prev[moralKey],
				[field]: value,
			},
		}));
	};

	const handleEmployeeSubmit = (e) => {
		e.preventDefault();
		setEmployeeSubmitted(true);
		setShowModal(false);
		// Here you would send employeeForm to backend
	};

	const handleManagerSubmit = (e) => {
		e.preventDefault();
		setManagerSubmitted(true);
		setShowModal(false);
		// Here you would send managerForm to backend
	};

	const handleSendMeeting = () => {
		setMeetingSent(true);
		// Here you would integrate with Outlook API or mailto link
	};

	// Modal content for employee
	const EmployeeModal = (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="relative bg-cardBackground dark:bg-darkcardBackground rounded-xl p-8 shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<button
					className="sticky top-3 right-3 float-right text-xl text-error dark:text-darkerror"
					onClick={() => setShowModal(false)}
					aria-label="Close"
				>
					&times;
				</button>
				<h3 className="text-2xl font-bold mb-4 text-accent">
					Submit Your Morals KPI
				</h3>
				<form onSubmit={handleEmployeeSubmit}>
					{MORALS.map((moral) => (
						<div
							key={moral.key}
							className="mb-6 border-b border-border dark:border-darkborder pb-4"
						>
							<div className="font-semibold text-accent dark:text-darkaccent">
								{moral.label}
							</div>
							<div className="text-xs text-textSecondary dark:text-darktextSecondary mb-2">
								{moral.description}
							</div>
							<div className="mb-2">
								<div className="font-medium mb-1 text-textPrimary dark:text-darktextPrimary">Your Score</div>
								<div className="flex items-center text-textSecondary dark:text-darktextSecondary gap-4 flex-wrap">
									{RATINGS.map((rating) => (
										<label
											key={rating.value}
											className="flex flex-col items-center cursor-pointer"
										>
											<input
												type="radio"
												name={`${moral.key}_employeeScore`}
												value={rating.value}
												checked={
													employeeForm[moral.key].employeeScore ===
													String(rating.value)
												}
												onChange={() =>
													handleEmployeeChange(
														moral.key,
														"employeeScore",
														String(rating.value)
													)
												}
												className="accent-accent"
												required
											/>
											<span className="text-xs">{rating.label}</span>
										</label>
									))}
								</div>
								{employeeForm[moral.key].employeeScore && (
									<div className=" text-textSecondary dark:text-darktextSecondary font-semibold underline text-xs italic mt-2">
										{
											RATING_DESCRIPTIONS[moral.key][
												employeeForm[moral.key].employeeScore
											]
										}
									</div>
								)}
							</div>
							<div className="mb-2">
								<label className="font-medium  text-textPrimary dark:text-darktextPrimary">Comments</label>
								<textarea
									className="w-full p-2 placeholder:text-textSecondary dark:placeholder:text-darktextSecondary border border-border dark:border-darkborder rounded resize-vertical mt-1"
									placeholder="Comments"
									value={employeeForm[moral.key].comments}
									onChange={(e) =>
										handleEmployeeChange(moral.key, "comments", e.target.value)
									}
									rows={2}
								/>
							</div>
							<div>
								<label className="font-medium text-textPrimary dark:text-darktextPrimary">Area of Improvement</label>
								<textarea
									className="w-full p-2 placeholder:text-textSecondary placeholder:dark:text-darktextSecondary border border-border dark:border-darkborder rounded resize-vertical mt-1"
									placeholder="Area of Improvement"
									value={employeeForm[moral.key].improvement}
									onChange={(e) =>
										handleEmployeeChange(moral.key, "improvement", e.target.value)
									}
									rows={2}
								/>
							</div>
						</div>
					))}
					<button
						type="submit"
						className="bg-accent dark:bg-darkaccent hover:bg-buttonHover dark:hover:bg-darkbuttonHover text-white px-6 py-2 rounded font-semibold text-lg transition"
					>
						Submit KPI
					</button>
				</form>
			</div>
		</div>
	);

	// Modal content for manager
	const ManagerModal = (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="relative bg-cardBackground dark:bg-darkcardBackground rounded-xl p-8 shadow-lg w-full max-w-7xl max-h-[90vh] overflow-y-auto">
				<button
					className="sticky top-3 right-3 float-right text-xl text-error dark:text-darkerror"
					onClick={() => setShowModal(false)}
					aria-label="Close"
				>
					&times;
				</button>
				<h3 className="text-2xl font-bold mb-4 text-accent">
					Morals KPI Review:{" "}
					<span className="text-accent">{EMPLOYEE_NAME}</span>
				</h3>
				<form onSubmit={handleManagerSubmit}>
					<table className="min-w-full text-sm mb-8">
						<thead>
							<tr className="bg-background dark:bg-darkBackground">
								<th className="px-3 py-2 text-left">Morals</th>
								<th className="px-3 py-2 text-center">Employee Score</th>
								<th className="px-3 py-2 text-center">Manager Score</th>
								<th className="px-3 py-2 text-center">Agreed Score</th>
								<th className="px-3 py-2 text-left">Employee Comments</th>
								<th className="px-3 py-2 text-left">Manager Comments</th>
								<th className="px-3 py-2 text-left">Area of Improvement</th>
							</tr>
						</thead>
						<tbody>
							{MORALS.map((moral) => (
								<tr
									key={moral.key}
									className="border-b border-border dark:border-darkborder align-top"
								>
									<td className="px-3 py-3 min-w-[180px]">
										<div className="font-semibold text-accent dark:text-darkaccent">
											{moral.label}
										</div>
										<div className="text-xs text-textSecondary dark:text-darktextSecondary mb-2">
											{moral.description}
										</div>
									</td>
									{/* Employee Score */}
									<td className="px-3 py-3 text-center">
										<input
											type="text"
											value={
												EMPLOYEE_KPI[moral.key]?.employeeScore
													? RATINGS.find(
															(r) =>
																r.value ===
																Number(
																	EMPLOYEE_KPI[moral.key]
																		.employeeScore
																)
													  )?.label
													: ""
											}
											disabled
											className="w-28 p-2 border border-border dark:border-darkborder rounded bg-gray-100 dark:bg-darkborder text-center"
										/>
										{EMPLOYEE_KPI[moral.key]?.employeeScore && (
											<div className="text-info dark:text-darkinfo text-xs italic mt-2">
												{
													RATING_DESCRIPTIONS[moral.key][
														EMPLOYEE_KPI[moral.key].employeeScore
													]
												}
											</div>
										)}
									</td>
									{/* Manager Score */}
									<td className="px-3 py-3 text-center">
										<div className="flex flex-col items-center gap-1">
											{RATINGS.map((rating) => (
												<label
													key={rating.value}
													className="flex flex-col items-center cursor-pointer"
												>
													<input
														type="radio"
														name={`${moral.key}_managerScore`}
														value={rating.value}
														checked={
															managerForm[moral.key].managerScore ===
															String(rating.value)
														}
														onChange={() =>
															handleManagerChange(
																moral.key,
																"managerScore",
																String(rating.value)
															)
														}
														className="accent-accent"
														required
													/>
													<span className="text-xs">{rating.label}</span>
												</label>
											))}
										</div>
										{managerForm[moral.key].managerScore && (
											<div className="text-info dark:text-darkinfo text-xs italic mt-2">
												{
													RATING_DESCRIPTIONS[moral.key][
														managerForm[moral.key].managerScore
													]
												}
											</div>
										)}
									</td>
									{/* Agreed Score */}
									<td className="px-3 py-3 text-center">
										<div className="flex flex-col items-center gap-1">
											{RATINGS.map((rating) => (
												<label
													key={rating.value}
													className="flex flex-col items-center cursor-pointer"
												>
													<input
														type="radio"
														name={`${moral.key}_agreedScore`}
														value={rating.value}
														checked={
															managerForm[moral.key].agreedScore ===
															String(rating.value)
														}
														onChange={() =>
															handleManagerChange(
																moral.key,
																"agreedScore",
																String(rating.value)
															)
														}
														className="accent-accent"
														required
													/>
													<span className="text-xs">{rating.label}</span>
												</label>
											))}
										</div>
										{managerForm[moral.key].agreedScore && (
											<div className="text-info dark:text-darkinfo text-xs italic mt-2">
												{
													RATING_DESCRIPTIONS[moral.key][
														managerForm[moral.key].agreedScore
													]
												}
											</div>
										)}
									</td>
									{/* Employee Comments */}
									<td className="px-3 py-3">
										<textarea
											className="w-full p-2 border border-border dark:border-darkborder rounded resize-vertical bg-gray-100 dark:bg-darkborder"
											value={EMPLOYEE_KPI[moral.key]?.comments || ""}
											disabled
											rows={2}
										/>
									</td>
									{/* Manager Comments */}
									<td className="px-3 py-3">
										<textarea
											className="w-full p-2 border border-border dark:border-darkborder rounded resize-vertical"
											placeholder="Manager Comments"
											value={managerForm[moral.key].managerComments}
											onChange={(e) =>
												handleManagerChange(moral.key, "managerComments", e.target.value)
											}
											rows={2}
										/>
									</td>
									{/* Area of Improvement */}
									<td className="px-3 py-3">
										<textarea
											className="w-full p-2 border border-border dark:border-darkborder rounded resize-vertical bg-gray-100 dark:bg-darkborder"
											value={EMPLOYEE_KPI[moral.key]?.improvement || ""}
											disabled
											rows={2}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<button
						type="submit"
						className="bg-accent dark:bg-darkaccent hover:bg-buttonHover dark:hover:bg-darkbuttonHover text-white px-6 py-2 rounded font-semibold text-lg transition"
					>
						Save Manager Review
					</button>
				</form>
				{managerSubmitted && (
					<div className="mt-4 flex flex-col gap-2">
						<span className="text-success dark:text-darksuccess font-semibold">
							Manager review saved! (mock)
						</span>
						<button
							type="button"
							className="bg-info hover:bg-info/80 text-white px-6 py-2 rounded font-semibold text-lg transition"
							onClick={handleSendMeeting}
							disabled={meetingSent}
						>
							{meetingSent
								? "Meeting Invite Sent!"
								: "Send Outlook Meeting Invite"}
						</button>
						{meetingSent && (
							<span className="text-info dark:text-darkinfo text-sm">
								Outlook invite sent for face-to-face meeting (mock).
							</span>
						)}
					</div>
				)}
			</div>
		</div>
	);

	// Table for employee view
	const EmployeeTable = (
		<div className="mb-10">
			<h3 className="text-xl font-semibold mb-4 text-textSecondary dark:text-darktextSecondary">
				My Submitted Morals KPIs
			</h3>
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm border rounded-xl overflow-hidden">
					<thead>
						<tr className="bg-background dark:bg-darkBackground">
							<th className="px-4 py-2">Period</th>
							<th className="px-4 py-2">Status</th>
							<th className="px-4 py-2">Date</th>
							<th className="px-4 py-2">Action</th>
						</tr>
					</thead>
					<tbody>
						{EMPLOYEE_KPI_LIST.map((kpi) => (
							<tr key={kpi.id} className="border-b border-border dark:border-darkborder">
								<td className="px-4 py-2">{kpi.period}</td>
								<td className="px-4 py-2">{kpi.status}</td>
								<td className="px-4 py-2">{kpi.date}</td>
								<td className="px-4 py-2">
									<button
										className="text-accent underline"
										onClick={() => {
											// Show details in modal (read-only)
											setRole("employee");
											setShowModal(true);
											setEmployeeForm(kpi.morals);
										}}
									>
										View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);

	// Table for manager view
	const ManagerTable = (
		<div className="mb-10">
			<h3 className="text-xl font-semibold mb-4 text-textSecondary dark:text-darktextSecondary">
				Employee Morals KPIs
			</h3>
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm border rounded-xl overflow-hidden">
					<thead>
						<tr className="bg-background dark:bg-darkBackground">
							<th className="px-4 py-2">Employee</th>
							<th className="px-4 py-2">Period</th>
							<th className="px-4 py-2">Status</th>
							<th className="px-4 py-2">Date</th>
							<th className="px-4 py-2">Action</th>
						</tr>
					</thead>
					<tbody>
						{MANAGER_KPI_LIST.map((kpi) => (
							<tr key={kpi.id} className="border-b border-border dark:border-darkborder">
								<td className="px-4 py-2">{kpi.employee}</td>
								<td className="px-4 py-2">{kpi.period}</td>
								<td className="px-4 py-2">{kpi.status}</td>
								<td className="px-4 py-2">{kpi.date}</td>
								<td className="px-4 py-2">
									<button
										className="text-accent underline"
										onClick={() => {
											setRole("manager");
											setShowModal(true);
											// You can set managerForm here if you want to prefill
										}}
									>
										Review
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);

	return (
		<div className="max-w-5xl mx-auto p-6">
			<div className="flex items-center gap-4 mb-8">
				<label className="font-semibold text-lg">Role:</label>
				<select
					className="border border-border dark:border-darkborder rounded px-3 py-2"
					value={role}
					onChange={(e) => {
						setRole(e.target.value);
						setEmployeeSubmitted(false);
						setManagerSubmitted(false);
						setMeetingSent(false);
					}}
				>
					<option value="employee">Employee</option>
					<option value="manager">Manager</option>
				</select>
				<button
					className="ml-auto bg-accent dark:bg-darkaccent hover:bg-buttonHover dark:hover:bg-darkbuttonHover text-white px-6 py-2 rounded font-semibold text-lg transition"
					onClick={() => setShowModal(true)}
				>
					{role === "employee" ? "Submit Your KPI" : "Review Employee KPI"}
				</button>
			</div>

			{/* Show table for each role */}
			{role === "employee" && EmployeeTable}
			{role === "manager" && ManagerTable}

			{/* Show modal if open */}
			{showModal && (role === "employee" ? EmployeeModal : ManagerModal)}

			{/* Show submitted message outside modal */}
			{employeeSubmitted && role === "employee" && (
				<div className="mt-4 text-success dark:text-darksuccess font-semibold">
					Your KPI has been submitted! (mock)
				</div>
			)}
			{managerSubmitted && role === "manager" && (
				<div className="mt-4 text-success dark:text-darksuccess font-semibold">
					Manager review saved! (mock)
				</div>
			)}
		</div>
	);
}