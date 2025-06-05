"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useAuthStore } from "../app/store/useAuthStore"; // <-- import your store

export default function LayoutClientWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");
  const user = useAuthStore((state) => state.user); // <-- get user

  if (isAuthPage) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-background dark:bg-darkBackground">
      <Sidebar user={user}/>
      <div className="flex-1 flex flex-col h-screen">
        <Navbar user={user} /> {/* pass user as prop */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}