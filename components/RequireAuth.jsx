"use client";
import { useAuthStore } from "../app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [user, router]);

  if (!user) return null; // Or a loading spinner

  return children;
}