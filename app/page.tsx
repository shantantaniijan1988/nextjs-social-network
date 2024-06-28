import { auth } from "@/auth";
import { LoginForm } from "@/app/components/login/LoginForm";
import Link from "next/link";

const Home = async () => {
  const session = await auth();
  const user = session?.user;

  console.log(user);

  return (
    <div>
      {user ? (
        <code>
          {Object.values(user).map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </code>
      ) : (
        <div className="mt-8 mx-auto max-w-sm text-sm">
          <h1 className="text-lg font-bold">ログイン</h1>
          <p className="mt-4 text-right">
            新規登録は
            <Link
              href="/register"
              className="text-sky-500 underline font-medium hover:text-sky-600"
            >
              こちらから
            </Link>
          </p>

          <div className="mt-4">
            <LoginForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
