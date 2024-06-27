import { z } from "zod";

export const baseUserSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "メールアドレスを入力してください" })
    .email("正しいメールアドレスの形式で入力してください"),
  password: z
    .string()
    .trim()
    .min(4, { message: "パスワードは4文字以上で入力してください" })
    .max(8, { message: "パスワードは8文字以上で入力してください" }),
  confirmPassword: z
    .string()
    .trim()
    .min(1, { message: "確認用パスワードを入力してください" }),
});
