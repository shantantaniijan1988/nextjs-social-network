import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-jp";

import { Navigation } from "@/app/components/Navigation";

export const metadata: Metadata = {
  title: "Nextjs social network",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-custom text-gray-700 tracking-wider">
        <Navigation />
        <main className="mx-auto max-w-3xl px-6">{children}</main>
      </body>
    </html>
  );
}
