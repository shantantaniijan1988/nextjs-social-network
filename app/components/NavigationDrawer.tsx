"use client";

import { type FC, useState, useEffect } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { logoutAction } from "@/app/lib/actions";

interface Props {
  email: string;
}

export const NavigationDrawer: FC<Props> = ({ email }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const drawerClose = () => setDrawerOpen(false);

    window.addEventListener("click", drawerClose);

    return () => window.removeEventListener("click", drawerClose);
  }, []);

  return (
    <div className="text-sm relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDrawerOpen((prev) => !prev);
        }}
        type="submit"
        aria-label="drawer toggle"
        className="font-medium hover:underline"
      >
        {email}
      </button>

      <ul
        onClick={(e) => e.stopPropagation()}
        className={twMerge(
          clsx(
            "w-max px-6 py-4 rounded bg-indigo-950 text-white font-bold space-y-2 origin-top transition-transform absolute top-[calc(100%+.25rem)] -right-6",
            {
              visible: drawerOpen,
              "scale-1": drawerOpen,
              "scale-0": !drawerOpen,
              invisible: !drawerOpen,
            }
          )
        )}
      >
        <li>
          <Link
            onClick={() => setDrawerOpen(false)}
            href="/dashboard"
            className="hover:underline"
          >
            ダッシュボード
          </Link>
        </li>
        <li>
          <form action={logoutAction}>
            <button type="submit" className="hover:underline">
              ログアウト
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};
