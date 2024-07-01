import { NavigationDrawer } from "@/app/components/NavigationDrawer";
import { auth } from "@/auth";
import { type FC } from "react";
import Link from "next/link";

export const Navigation: FC = async () => {
  const session = await auth();
  const user = session?.user;

  const email = user?.email;

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
            <NavigationDrawer email={email!} />
          </div>
        )}
      </div>
    </header>
  );
};
