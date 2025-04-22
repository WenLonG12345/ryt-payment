import { z } from "zod";

export type IUser = {
  username: string;
  email?: string;
  password: string;
  balance?: number;
  lastLoginAt?: string;
};

export const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});
export type ILoginReq = z.infer<typeof LoginSchema>;
