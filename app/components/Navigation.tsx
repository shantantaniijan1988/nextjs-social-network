"use client";

import { type FC } from "react";
import Link from "next/link";

export const Navigation: FC = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-4 text-sm font-medium">
        <nav className="flex items-center gap-x-8">
          <Link href="/" className="py-1 hover:underline">
            ホーム
          </Link>
          <Link href="/dashboard" className="py-1 hover:underline">
            ダッシュボード
          </Link>
        </nav>
      </div>
    </header>
  );
};
