import { createClient } from "@/app/lib/server";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(data, session);
  if (session) {
    if (request.nextUrl.pathname.startsWith("/sign-in")) {
      return NextResponse.rewrite(new URL("/profile", request.url));
    }
  }
  return res;
}
