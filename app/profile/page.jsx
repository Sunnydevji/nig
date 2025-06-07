"use client";
import { useAuthStore } from "../store/useAuthStore";
import RequireAuth from "@/components/RequireAuth";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const role = user?.role?.toLowerCase() || "employee";

  // Example: Add more manager info
  const managerExtra = role === "manager" && (
    <>
      <div><b>Team Size:</b> 8</div>
      <div><b>Pending Reviews:</b> 3</div>
    </>
  );

  return (
    <RequireAuth>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-accent dark:text-darkaccent">Your Profile</h1>
        <div className="bg-cardBackground dark:bg-darkcardBackground rounded-xl shadow p-6">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User")}
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-accent mb-2"
            />
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <div className="text-textSecondary dark:text-darktextSecondary capitalize">{user?.role}</div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div><b>Email:</b> {user?.email}</div>
            <div><b>Department:</b> {user?.department || "N/A"}</div>
            <div><b>Manager:</b> {user?.manager || "N/A"}</div>
            <div><b>Phone:</b> {user?.phone || "N/A"}</div>
            {managerExtra}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}