"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import Notification from "../../components/Notification";
import { Button } from "../../components/Button";
import { registerUser, verifyOtp, loginUser } from "../services/authClient";
import ToggleDark from "../utils/toogleDark";

const logoUrl = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"; // Replace with your logo

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("form");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({
    name: "",
    role: "",
    department_id: "",
    email: "",
    phone: "",
    password: "",
    manager_id: "",
  });
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  async function handleRegister(form) {
    setLoading(true);
    setNotification(null);
    const data = await registerUser(form);
    if (data.success) {
      setCredentials({ email: form.email, password: form.password });
      setStep("otp");
      setNotification({ type: "success", message: "Registration successful! OTP sent to email." });
    } else {
      setNotification({ type: "error", message: data.msg || "Registration failed" });
    }
    setLoading(false);
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);
    setNotification(null);
    const data = await verifyOtp({ email: credentials.email, otp });
    if (data.success) {
      setStep("login");
      setNotification({ type: "success", message: "OTP verified! Please login." });
    } else {
      setNotification({ type: "error", message: data.msg || "OTP verification failed" });
    }
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setNotification(null);
    const data = await loginUser(credentials);
    console.log("Login data:", data);
    if (data.success) {
      console.log("Login successful:", data.user);
      login(data.user); // updates Zustand store
      setNotification({ type: "success", message: "Login successful!" });
      console.log("Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);

    } else {
      setNotification({ type: "error", message: data.msg || "Login failed" });
    }
    setLoading(false);
  }

  return (
    <div className="bg-background dark:bg-darkBackground min-h-screen flex items-center justify-center transition-colors">
      {/* Left Info Block */}
      <div className="hidden md:flex flex-col justify-between bg-cardBackground dark:bg-darkcardBackground rounded-l-2xl shadow-2xl p-10 w-96 min-h-[32rem] text-primary dark:text-darktextPrimary">
        <div>
          <img
            src={logoUrl}
            alt="Logo"
            className="w-16 h-16 mb-6 mx-auto drop-shadow-lg rounded-full bg-white p-2"
          />
          <h1 className="text-3xl font-extrabold mb-2 text-center tracking-tight drop-shadow">
            HR System
          </h1>
          <h2 className="text-lg font-semibold mb-4 text-center opacity-90">
            Welcome to Your HR Portal
          </h2>
          <ul className="list-none space-y-3 mt-8 text-textSecondary dark:text-darktextSecondary">
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
              Role-based access (CEO, Manager, Team Leader, Employee)
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400"></span>
              Personal KPI tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-pink-400"></span>
              Modern UI with dark &amp; light mode
            </li>
          </ul>
        </div>
        <ToggleDark className="mt-6" />
      </div>

      {/* Right Form Block with Slide Animation */}
      <div className="relative w-full max-w-md md:max-w-lg min-h-[32rem] flex items-center justify-center bg-cardBackground dark:bg-darkcardBackground rounded-none md:rounded-r-2xl shadow-2xl overflow-hidden border border-border dark:border-darkborder">
        {/* Mobile theme toggle */}
        <div className="absolute right-4 md:hidden z-10">
          <ToggleDark />
        </div>
        <div className="w-full justify-center items-center flex">
          {/* Notification */}
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          )}
          {/* Slide Animation */}
          <div
            className={`w-full transition-transform duration-500 ease-in-out ${showLogin ? "translate-x-0" : "-translate-x-full"
              } absolute`}
            style={{ zIndex: showLogin ? 2 : 1 }}
          >
            <LoginForm
              onSwitch={() => setShowLogin(false)}
              setNotification={setNotification}
              handleLogin={handleLogin}
              loading={loading}
              credentials={credentials}
              setCredentials={setCredentials}
            />
          </div>
          <div
            className={`w-full transition-transform duration-500 ease-in-out ${showLogin ? "translate-x-full" : "translate-x-0"
              } absolute`}
            style={{ zIndex: showLogin ? 1 : 2 }}
          >
            <RegisterForm
              onSwitch={() => {
                setShowLogin(true);
                setStep("form"); // Only reset if you want to start over
              }}
              setNotification={setNotification}
              handleRegister={handleRegister}
              handleVerifyOtp={handleVerifyOtp}
              loading={loading}
              step={step}
              setStep={setStep}
              credentials={credentials}
              setCredentials={setCredentials}
              otp={otp}
              setOtp={setOtp}
              form={form}
              setForm={setForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ onSwitch, setNotification, handleLogin, loading, credentials, setCredentials }) {
  const [error, setError] = useState("");

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full p-8">
        <h2 className="text-2xl font-bold mb-2 text-center text-accent dark:text-darkaccent">Sign In</h2>
        <p className="mb-6 text-center text-textSecondary dark:text-darktextSecondary">Access your HR dashboard</p>
        <form className="space-y-5" onSubmit={handleLogin}>
          <FormInput
            label="Email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            value={credentials.email}
            onChange={e => setCredentials({ ...credentials, email: e.target.value })}
            disabled={loading}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            disabled={loading}
          />
          {error && <div className="text-error dark:text-darkerror text-sm">{error}</div>}
          <div className="shadow-2xl shadow-gray-200 dark:shadow-neutral-900 dark:shadow-2xl">
            <Button
              type="submit"
              className="w-full hover:bg-buttonHover dark:hover:bg-darkbuttonHover bg-accent dark:bg-darkaccent rounded-2xl cursor-pointer p-2 flex-1 text-primary dark:text-darktextPrimary mt-2 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <span className="text-textSecondary">Don't have an account? </span>
          <button
            className="text-accent font-semibold hover:underline"
            onClick={onSwitch}
            type="button"
            disabled={loading}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

function RegisterForm({ onSwitch, setNotification, handleRegister, handleVerifyOtp, loading, step, setStep, credentials, setCredentials, otp, setOtp, form, setForm }) {
  // Example options (replace with API data if needed)
  const roles = ["CEO", "Manager", "Team Leader", "Employee"];
  const departments = [
    { id: "D001", name: "Executive" },
    { id: "D002", name: "Sales" },
    { id: "D003", name: "HR" },
    { id: "D004", name: "IT" },
  ];
  const managers = [
    { id: "E001", name: "Ananya Sharma" },
    { id: "E002", name: "Rajiv Mehta" },
    // ...add more managers
  ];

  // const [form, setform] = useState({
  //   name: "",
  //   role: "",
  //   department_id: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  //   manager_id: "",
  // });

  // Show manager_id only if role is Employee
  const showManager = form.role === "Employee";

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full p-8">
        <h2 className="text-2xl font-bold mb-2 text-center text-[var(--accent)]">Sign Up</h2>
        <p className="mb-6 text-center text-[var(--textSecondary)]">Create your HR account</p>
        {step === "form" && (
          <form className="space-y-5" onSubmit={(e) => {
            e.preventDefault();
            handleRegister(form); // Pass the form state directly
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                disabled={loading}
              />
              <div>
                <label className="block mb-1 text-sm font-medium text-textSecondary dark:text-darktextSecondary">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border dark:border-darkborder rounded-lg bg-cardBackground dark:bg-darkcardBackground text-textPrimary dark:text-darktextPrimary focus:outline-none focus:ring-2 focus:ring-accent transition"
                  required
                  disabled={loading}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-textSecondary dark:text-darktextSecondary">Department</label>
                <select
                  name="department_id"
                  value={form.department_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border dark:border-darkborder rounded-lg bg-cardBackground dark:bg-darkcardBackground text-textPrimary dark:text-darktextPrimary focus:outline-none focus:ring-2 focus:ring-accent transition"
                  required
                  disabled={loading}
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <FormInput
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                disabled={loading}
              />
            </div>
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              disabled={loading}
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              disabled={loading}
            />
            {showManager && (
              <div>
                <label className="block mb-1 text-sm font-medium text-textSecondary dark:text-darktextSecondary">Manager</label>
                <select
                  name="manager_id"
                  value={form.manager_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border dark:border-darkborder rounded-lg bg-cardBackground dark:bg-darkcardBackground text-textPrimary dark:text-darktextPrimary focus:outline-none focus:ring-2 focus:ring-accent transition"
                  required
                  disabled={loading}
                >
                  <option value="">Select Manager</option>
                  {managers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="shadow-2xl shadow-gray-200 dark:shadow-neutral-900 dark:shadow-2xl">
              <Button
                type="submit"

                className="w-full hover:bg-buttonHover dark:hover:bg-darkbuttonHover bg-accent dark:bg-darkaccent rounded-2xl cursor-pointer p-2 flex-1 text-primary dark:text-darktextPrimary mt-2 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
        )}
        {step === "otp" && (
          <form className="space-y-5" onSubmit={handleVerifyOtp}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Email"
                type="email"
                value={credentials.email}
                disabled
              />
              <FormInput
                label="OTP"
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                required
                disabled={loading}
              />
            </div>
            <div className="shadow-2xl shadow-gray-200 dark:shadow-neutral-900 dark:shadow-2xl">
              <Button
                type="submit"
                className="w-full hover:bg-buttonHover dark:hover:bg-darkbuttonHover bg-accent dark:bg-darkaccent rounded-2xl cursor-pointer p-2 flex-1 text-primary dark:text-darktextPrimary mt-2 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>
          </form>
        )}
        <div className="mt-6 text-center">
          <span className="text-textSecondary">Already have an account? </span>
          <button
            className="text-accent font-semibold hover:underline"
            onClick={onSwitch}
            type="button"
            disabled={loading}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable input with dark/light support and focus ring
function FormInput({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-textSecondary dark:text-darktextSecondary">{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2 border border-border dark:border-darkborder rounded-lg bg-cardBackground dark:bg-darkcardBackground text-textPrimary dark:text-darktextPrimary focus:outline-none focus:ring-2 focus:ring-accent transition placeholder:text-textSecondary"
      />
    </div>
  );
}