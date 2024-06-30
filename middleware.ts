export { auth as middleware } from "@/auth";

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|lib|components).*)"],
// };

export const config = {
  matcher: ["/", "/register", "/dashboard"],
};
