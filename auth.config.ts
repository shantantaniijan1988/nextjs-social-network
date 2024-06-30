import { type NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/db";
import { baseUserSchema } from "@/app/lib/baseUserSchema";

const signInSchema = baseUserSchema.omit({ confirmPassword: true });

const generateRandomKey = (length = 32) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

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
      const postAuthPaths = ["/register"];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      console.log("middleware");

      if (
        isLoggedIn &&
        postAuthPaths.some((path) => nextUrl.pathname.startsWith(path))
      ) {
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

        const validatedFields = signInSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        if (!validatedFields.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: validatedFields.data.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(
          validatedFields.data.password,
          user.password
        );

        if (!isPasswordMatch) {
          return null;
        }

        return {
          ...user,
          randomKey: generateRandomKey(),
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
