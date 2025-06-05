"use client";
import React, { useState } from "react";
import { FaRegEye, FaPlus } from "react-icons/fa";

const MOCK_EMPLOYEES = [
  {
    id: "E001",
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "Employee",
    department: "Sales",
    manager: "Bob Smith",
    phone: "123-456-7890",
  },
  {
    id: "E002",
    name: "John Doe",
    email: "john@company.com",
    role: "Employee",
    department: "Marketing",
    manager: "Bob Smith",
    phone: "987-654-3210",
  },
  {
    id: "M001",
    name: "Bob Smith",
    email: "bob@company.com",
    role: "Manager",
    department: "Sales",
    manager: "CEO",
    phone: "555-555-5555",
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [searchId, setSearchId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    email: "",
    role: "Employee",
    department: "",
    manager: "",
    phone: "",
  });

  // Filter by ID if searchId is set
  const filteredEmployees = searchId
    ? employees.filter((emp) => emp.id.toLowerCase() === searchId.toLowerCase())
    : employees;

  const openModal = (emp) => {
    setSelectedEmployee(emp);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setEmployees((prev) => [...prev, newEmployee]);
    setShowAddModal(false);
    setNewEmployee({
      id: "",
      name: "",
      email: "",
      role: "Employee",
      department: "",
      manager: "",
      phone: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-textPrimary dark:text-darktextPrimary">
          Employees
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Search by Employee ID"
            className="border border-border dark:border-darkborder rounded px-3 py-1 bg-background dark:bg-darkBackground text-textPrimary dark:text-darktextPrimary"
            style={{ maxWidth: 200 }}
          />
          <button
            className="flex items-center gap-2 px-4 py-2 bg-accent dark:bg-darkaccent text-white rounded font-semibold shadow hover:bg-buttonHover dark:hover:bg-darkbuttonHover transition"
            onClick={openAddModal}
          >
            <FaPlus /> Add Employee
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-background dark:bg-darkBackground">
              <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">ID</th>
              <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">Name</th>
              <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">Email</th>
              <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">Role</th>
              <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">Department</th>
              <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">Manager</th>
              <th className="px-4 py-2 text-left font-semibold text-textSecondary dark:text-darktextSecondary">Phone</th>
              <th className="px-4 py-2 text-center font-semibold text-textSecondary dark:text-darktextSecondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="border-b border-border dark:border-darkborder hover:bg-accent/10 dark:hover:bg-darkaccent/10 text-textPrimary dark:text-darktextPrimary transition">
                <td className="px-4 py-2">{emp.id}</td>
                <td className="px-4 py-2">
                  <a
                    href={`/employees/${emp.id}`}
                    className="text-accent dark:text-darkaccent hover:underline"
                  >
                    {emp.name}
                  </a>
                </td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.role}</td>
                <td className="px-4 py-2">{emp.department}</td>
                <td className="px-4 py-2">{emp.manager}</td>
                <td className="px-4 py-2">{emp.phone}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="p-2 rounded hover:bg-accent/20 dark:hover:bg-darkaccent/20 transition"
                    title="View Details"
                    onClick={() => openModal(emp)}
                  >
                    <FaRegEye className="text-accent dark:text-darkaccent text-lg" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-textSecondary dark:text-darktextSecondary">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Employee Detail Modal */}
      {showModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl p-8 shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-xl text-error dark:text-darkerror"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 text-accent dark:text-darkaccent">
              {selectedEmployee.name}
            </h3>
            <div className="mb-2"><b>ID:</b> {selectedEmployee.id}</div>
            <div className="mb-2"><b>Email:</b> {selectedEmployee.email}</div>
            <div className="mb-2"><b>Role:</b> {selectedEmployee.role}</div>
            <div className="mb-2"><b>Department:</b> {selectedEmployee.department}</div>
            <div className="mb-2"><b>Manager:</b> {selectedEmployee.manager}</div>
            <div className="mb-2"><b>Phone:</b> {selectedEmployee.phone}</div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            className="bg-cardBackground dark:bg-darkcardBackground rounded-xl p-8 shadow-lg max-w-md w-full relative"
            onSubmit={handleAddEmployee}
          >
            <button
              className="absolute top-3 right-3 text-xl text-error dark:text-darkerror"
              onClick={closeAddModal}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 text-accent dark:text-darkaccent">
              Add New Employee
            </h3>
            <div className="mb-3">
              <label className="block font-medium mb-1">ID</label>
              <input
                type="text"
                name="id"
                value={newEmployee.id}
                onChange={handleAddChange}
                required
                className="w-full p-2 border border-border dark:border-darkborder rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={newEmployee.name}
                onChange={handleAddChange}
                required
                className="w-full p-2 border border-border dark:border-darkborder rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={newEmployee.email}
                onChange={handleAddChange}
                required
                className="w-full p-2 border border-border dark:border-darkborder rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Role</label>
              <select
                name="role"
                value={newEmployee.role}
                onChange={handleAddChange}
                className="w-full p-2 border border-border dark:border-darkborder rounded"
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Team Leader">Team Leader</option>
                <option value="CEO">CEO</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={newEmployee.department}
                onChange={handleAddChange}
                className="w-full p-2 border border-border dark:border-darkborder rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Manager</label>
              <input
                type="text"
                name="manager"
                value={newEmployee.manager}
                onChange={handleAddChange}
                className="w-full p-2 border border-border dark:border-darkborder rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={newEmployee.phone}
                onChange={handleAddChange}
                className="w-full p-2 border border-border dark:border-darkborder rounded"
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-accent dark:bg-darkaccent hover:bg-buttonHover dark:hover:bg-darkbuttonHover text-white px-6 py-2 rounded font-semibold text-lg transition"
            >
              Add Employee
            </button>
          </form>
        </div>
      )}
    </div>
  );
}