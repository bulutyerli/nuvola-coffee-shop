import { createClient } from "@/app/lib/server";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getSession();

  return (
    <section className="flex-grow mt-10 flex flex-col items-center">
      <h1>Profile</h1>
    </section>
  );
}
