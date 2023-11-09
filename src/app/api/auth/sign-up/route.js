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
  const { name, surname, country, address, city, state, zip } =
    Object.fromEntries(formData);

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
    return new NextResponse("Could not sign up, please try again.", {
      status: 400,
    });
  }

  // Check if the 'user' object is defined before accessing 'id'

  return NextResponse.redirect(`${requestUrl.origin}/email-sent`, {
    status: 301,
  });
}
