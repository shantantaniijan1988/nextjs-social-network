"use client";

import { type FC } from "react";
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

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log(response);
    } catch (error) {
      console.error("signin error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
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
