import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      credentials: { email: "", password: "" },
      login: (user) => set({ user }),
      user: (user) => set({ user }),
      logout: () => set({ user: null, credentials: { email: "", password: "" } }),
      setCredentials: (credentials) => set({ credentials }),
    }),
    {
      name: "auth-storage", // unique name
      partialize: (state) => ({ user: state.user, credentials: state.credentials }),
    }
  )
);