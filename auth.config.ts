import { type NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/db";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/dashboard", "/dev"];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isLoggedIn && nextUrl.pathname.startsWith("/register")) {
        const redirectUrl = new URL("/dashboard", nextUrl.origin);
        return Response.redirect(redirectUrl);
      }

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/", nextUrl.origin);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
    session(params) {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.token.id as string,
          randomKey: params.token.randomKey,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(
          String(credentials.password),
          user.password
        );

        if (!isPasswordMatch) {
          return null;
        }

        return {
          ...user,
          randomKey:
            "b4340ca1b988d151755f9a9b7feaf9a9e481799cb5a0e4f702bd82d2511b45d2",
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
