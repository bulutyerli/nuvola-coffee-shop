import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/server";

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);

    return NextResponse.json({ error: true });
  }

  return NextResponse.redirect(requestUrl.origin, {
    success: true,
    status: 301,
  });
}
