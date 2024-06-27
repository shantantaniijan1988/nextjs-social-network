import { RegisterForm } from "@/app/components/register/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <div className="mt-8 mx-auto max-w-sm text-sm">
        <h1 className="text-lg font-bold">ユーザー登録</h1>
        <p className="mt-4 text-right">
          必須項目<span className="text-red-500 font-bold">*</span>
          を入力してください
        </p>
        <div className="mt-4">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
