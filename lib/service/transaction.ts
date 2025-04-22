import { ITransactionSendReq } from "@/types/transaction";
import { useAuthStore } from "../store/auth";
import { useTransactionStore } from "../store/transaction";

export const sendTransaction = async (transaction: ITransactionSendReq) => {
  const user = useAuthStore.getState().user;
  const setUserBalance = useAuthStore.getState().setUserBalance;

  const userList = useTransactionStore.getState().userList;
  const addHistory = useTransactionStore.getState().addHistory;
  const updateUserBalance = useTransactionStore.getState().updateUserBalance;

  const formattedAmount = parseFloat(transaction.amount);

  if (user?.balance && user?.balance < formattedAmount) {
    throw new Error("Insufficient balance");
  }

  const recipient = userList.find((user) => user.id === transaction.to);

  if (!recipient) {
    throw new Error("Recipient not found");
  }

  try {
    // Update self balance
    setUserBalance((user?.balance ?? 0) - formattedAmount);

    // Update send history
    addHistory(user?.id || "", {
      id: Math.random().toString(36).substring(2, 15),
      from: user?.id ?? "",
      to: transaction.to,
      amount: formattedAmount,
      note: transaction.note,
      createdAt: new Date().toISOString(),
      kind: "SEND",
    });

    // Update receive history
    addHistory(transaction.to, {
      id: Math.random().toString(36).substring(2, 15),
      from: user?.id ?? "",
      to: transaction.to,
      amount: formattedAmount,
      note: transaction.note,
      createdAt: new Date().toISOString(),
      kind: "RECEIVE",
    });

    // Update recipient balance
    // Note: should be cater by BE, but cater it here for demo purpose
    updateUserBalance(
      transaction.to,
      (recipient?.balance || 0) + formattedAmount
    );
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw error;
  }
};
