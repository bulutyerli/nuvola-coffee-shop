import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/sign-in/:path*",
    "/sign-out/:path*",
    "/sign-up/:path*",
    "/orders/:path*",
    "/profile/:path*",
  ],
};

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session !== null) {
    if (
      req.nextUrl.pathname.startsWith("/sign-in") ||
      req.nextUrl.pathname.startsWith("/sign-up")
    ) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  } else {
    if (
      req.nextUrl.pathname.startsWith("/profile") ||
      req.nextUrl.pathname.startsWith("/orders")
    ) {
      return NextResponse.rewrite(new URL("/sign-in", req.url));
    }
  }
  return res;
}
