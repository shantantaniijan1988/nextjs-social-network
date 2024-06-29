import { Drawer } from "@/app/components/Drawer";
import { auth, signOut } from "@/auth";
import { type FC } from "react";
import Link from "next/link";

export const Navigation: FC = async () => {
  const session = await auth();
  const user = session?.user;

  const email = user?.email;

  const logoutAction = async () => {
    "use server";
    await signOut();
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-4 text-sm font-medium flex items-center">
        <nav className="flex items-center gap-x-8">
          <Link href="/" className="py-1 hover:underline">
            ホーム
          </Link>
        </nav>
        {user && (
          <div className="ml-auto flex items-center gap-x-8">
            <Drawer email={email!}>
              <form action={logoutAction}>
                <div>
                  <button type="submit" className="py-1 hover:underline">
                    ログアウト
                  </button>
                </div>
              </form>
            </Drawer>
          </div>
        )}
      </div>
    </header>
  );
};
