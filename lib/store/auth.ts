import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { IUser } from "@/types/user";

type AuthState = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
};

export const MOCK_USER: IUser = {
  username: "user001",
  password: "12345678",
  balance: 1000,
  lastLoginAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => ({
        getItem: SecureStore.getItemAsync,
        setItem: SecureStore.setItemAsync,
        removeItem: SecureStore.deleteItemAsync,
      })),
    }
  )
);
