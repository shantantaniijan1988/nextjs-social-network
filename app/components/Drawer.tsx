"use client";

import { type FC, useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  email: string;
  children: React.ReactNode;
}

export const Drawer: FC<Props> = ({ email, children }) => {
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

      {drawerOpen && (
        <ul
          onClick={(e) => e.stopPropagation()}
          className="w-max px-6 py-4 bg-indigo-950 text-white font-bold space-y-2 absolute top-6 left-1/2 -translate-x-1/2 z-10"
        >
          <li>
            <Link href="/dashboard">ダッシュボード</Link>
          </li>
          {Array.from({ length: 2 }, (_, i) => i).map((_, index) => (
            <li key={index} onClick={() => setDrawerOpen((prev) => !prev)}>
              DrawerItem
            </li>
          ))}
          <li>{children}</li>
        </ul>
      )}
    </div>
  );
};
