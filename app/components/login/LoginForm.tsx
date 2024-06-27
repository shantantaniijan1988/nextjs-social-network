"use client";

import { type FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { InputField } from "@/app/components/form/InputField";
import { ButtonSubmit } from "@/app/components/form/ButtonSubmit";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const methods = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
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
