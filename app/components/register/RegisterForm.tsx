"use client";

import { type FC, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { InputField } from "@/app/components/form/InputField";
import { ButtonSubmit } from "@/app/components/form/ButtonSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUserSchema } from "@/app/lib/baseUserSchema";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const registerFormSchema = baseUserSchema.refine(
  (data) => Boolean(data.password === data.confirmPassword),
  { message: "確認用パスワードが一致しません", path: ["confirmPassword"] }
);

export const RegisterForm: FC = () => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMessages([]);

    try {
      const response = await axios.post("/api/register", {
        email: data.email,
        password: data.password,
      });

      if (response?.status === 201) {
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      const errors = Object.values(error.response.data).flat() as string[];
      setErrorMessages(errors);
    }
  };

  return (
    <FormProvider {...methods}>
      {errorMessages.length > 0 && (
        <div className="my-4">
          {errorMessages.map((message, index) => (
            <p key={index} className="text-red-500 text-sm font-bold">
              {message}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField type="email" id="email" label="メールアドレス" />

        <InputField
          styles="mt-6"
          type="password"
          id="password"
          label="パスワード"
        />

        <InputField
          styles="mt-6"
          type="password"
          id="confirmPassword"
          label="確認用パスワード"
        />

        {/* TODO: チェックボックスの実装 */}

        <ButtonSubmit styles="mt-10" title="登録する" />
      </form>
    </FormProvider>
  );
};
