import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "@/types/user";
import { ITransactionHistory } from "@/types/transaction";
import { MOCK_USER_LIST } from "../constants/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TransactionState = {
  userList: IUser[];
  historyList: Record<string, ITransactionHistory[]>;
  setUserList: (userList: IUser[]) => void;
  addHistory: (userId: string, history: ITransactionHistory) => void;
  getHistoryByUserId: (userId: string) => ITransactionHistory[];
  updateUserBalance: (userId: string, balance: number) => void;
  getHistoryById: (
    currentUserId: string,
    historyId: string
  ) => ITransactionHistory | undefined;
  // clearStore: () => void;
};

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      userList: MOCK_USER_LIST,
      historyList: {},
      setUserList: (userList) => set({ userList }),
      addHistory: (userId, history) =>
        set((state) => ({
          historyList: {
            ...state.historyList,
            [userId]: [...(state.historyList[userId] || []), history],
          },
        })),
      getHistoryByUserId: (userId) => {
        const history = get().historyList[userId];
        return history || [];
      },
      updateUserBalance: (userId, balance) =>
        set((state) => ({
          userList: state.userList.map((user) =>
            user.id === userId ? { ...user, balance } : user
          ),
        })),
      getHistoryById: (currentUserId, historyId) => {
        const historyList = get().historyList;
        const history = historyList[currentUserId]?.find(
          (h) => h.id === historyId
        );
        if (!history) {
          return undefined;
        }
        return history;
      },
    }),
    {
      name: "transaction",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
