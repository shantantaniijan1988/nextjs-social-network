import { LoginForm } from "@/app/components/login/LoginForm";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div className="mt-8 mx-auto max-w-sm text-sm">
        <h1 className="text-lg font-bold">ログイン</h1>
        <p className="mt-4 text-right">
          新規登録は
          <Link
            href="/register"
            className="text-sky-500 underline hover:text-sky-600"
          >
            こちらから
          </Link>
        </p>
        <div className="mt-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
