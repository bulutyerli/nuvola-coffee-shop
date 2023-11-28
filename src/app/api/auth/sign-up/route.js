import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const runtime = "edge";

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const { email, password, name, surname, country, address, city, state, zip } =
    await request.json();
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      data: {
        name,
        surname,
        country,
        address,
        city,
        state,
        zip,
      },
    },
  });

  if (error) {
    console.log(error);
    return NextResponse.json({ error: true });
  }

  // Check if the 'user' object is defined before accessing 'id'

  return NextResponse.json({ success: true });
}
