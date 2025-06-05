"use client";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/RequireAuth";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  React.useEffect(() => {
    if (!user) router.replace("/auth");
  }, [user, router]);

  if (!user) return null; // Or a loading spinner

  return (
    <RequireAuth>
    <h1 className="text-2xl font-bold mb-4 text-textSecondary dark:text-darktextSecondary">
      Welcome, {user.name}!
    </h1>
    </RequireAuth>
    // ...other dashboard content...
  );
}