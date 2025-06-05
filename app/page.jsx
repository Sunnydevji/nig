"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./store/useAuthStore";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const timeout = setTimeout(() => {
        router.replace("/auth");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [user, router]);

  if (!user) {
    // Optionally, show the welcome screen while waiting for redirect
    return (
      <div className="flex flex-col items-center justify-center h-full w-full animate-fadein">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="Logo"
          className="w-24 h-24 mb-6 drop-shadow-lg rounded-full bg-white p-2 animate-bounce"
        />
        <h1 className="text-4xl font-extrabold mb-2 text-accent dark:text-darkaccent tracking-tight drop-shadow">
          Welcome to the HR System!
        </h1>
        <p className="text-lg text-textSecondary dark:text-darktextSecondary mb-8 text-center max-w-xl">
          Redirecting to login...
        </p>
        <div className="flex gap-4">
          <span className="inline-block w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
          <span className="inline-block w-3 h-3 rounded-full bg-pink-400 animate-pulse"></span>
        </div>
      </div>
    );
  }

  // If user is logged in, show the main welcome screen or dashboard
  return (
    <div className="flex flex-col items-center justify-center h-full w-full animate-fadein">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="Logo"
        className="w-24 h-24 mb-6 drop-shadow-lg rounded-full bg-white p-2 animate-bounce"
      />
      <h1 className="text-4xl font-extrabold mb-2 text-accent dark:text-darkaccent tracking-tight drop-shadow">
        Welcome to the HR System!
      </h1>
      <p className="text-lg text-textSecondary dark:text-darktextSecondary mb-8 text-center max-w-xl">
        Manage your KPIs, track your goals, and collaborate with your team. Use the
        sidebar to navigate through the system.
      </p>
      <div className="flex gap-4">
        <span className="inline-block w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
        <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
        <span className="inline-block w-3 h-3 rounded-full bg-pink-400 animate-pulse"></span>
      </div>
    </div>
  );
}

// Add this to your global CSS (e.g., globals.css or tailwind.config.js if using Tailwind):
/*
@keyframes fadein {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fadein {
  animation: fadein 1s ease;
}
*/