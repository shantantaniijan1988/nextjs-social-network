"use client";

import { type FC, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { InputField } from "@/app/components/form/InputField";
import { ButtonSubmit } from "@/app/components/form/ButtonSubmit";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const methods = useForm<LoginFormData>();
  const [errorResponse, setErrorResponse] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setErrorResponse("");

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!response?.error) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setErrorResponse("メールアドレスとパスワードを確認してください");
      }
    } catch (error) {
      console.error("signin error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      {errorResponse && (
        <div className="my-4 px-3 py-1.5 bg-red-100">
          <p className="text-red-500 font-medium">{errorResponse}</p>
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
        <ButtonSubmit styles="mt-10" title="ログイン" />
      </form>
    </FormProvider>
  );
};
