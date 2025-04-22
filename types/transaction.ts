import { z } from "zod";

export const TransactionSendSchema = z.object({
  to: z.string().min(1),
  amount: z.string().min(1),
  note: z.string().optional(),
});
export type ITransactionSendReq = z.infer<typeof TransactionSendSchema>;

export type ITransactionKind = "SEND" | "RECEIVE" | "TRANSFER";
export type ITransactionHistory = {
  id: string;
  from: string;
  to: string;
  amount: number;
  note?: string;
  createdAt: string;
  kind: ITransactionKind;
};
