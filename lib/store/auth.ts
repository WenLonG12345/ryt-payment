import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { IUser } from "@/types/user";
import { useTransactionStore } from "./transaction";

type AuthState = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  setUserBalance: (balance: number) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        // always set latest user balance value
        const userList = useTransactionStore.getState().userList;
        const userBalance = userList.find((u) => u.id === user?.id)?.balance;
        set({
          user: user ? { ...user, balance: userBalance || 0 } : null,
        });
      },
      setUserBalance: (balance) =>
        set((state) => ({
          user: state.user ? { ...state.user, balance } : null,
        })),
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
