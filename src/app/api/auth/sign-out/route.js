import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/server";

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  }

  return NextResponse.redirect(`${requestUrl.origin}`, {
    status: 301,
  });
}
