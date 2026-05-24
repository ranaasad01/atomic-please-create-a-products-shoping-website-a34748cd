"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const mockUser: User = {
  id: "user-001",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://static.wikia.nocookie.net/jamescameronsavatar/images/4/44/So%27lek_meets_alex.png/revision/latest?cb=20240718054757",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States",
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 800));
        if (email && password.length >= 6) {
          set({ user: { ...mockUser, email }, isAuthenticated: true });
          return true;
        }
        return false;
      },

      signup: async (name, email, password) => {
        await new Promise((r) => setTimeout(r, 800));
        if (name && email && password.length >= 6) {
          set({
            user: { ...mockUser, name, email },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: (updates) => {
        const current = get().user;
        if (current) {
          set({ user: { ...current, ...updates } });
        }
      },
    }),
    { name: "auth-storage" }
  )
);
