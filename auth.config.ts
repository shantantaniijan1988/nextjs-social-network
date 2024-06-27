import { type NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/dashboard"];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/", nextUrl.origin);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
