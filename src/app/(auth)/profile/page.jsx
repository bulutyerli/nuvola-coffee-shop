import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { fullAddress } from "@/app/helpers/fullAddress";
import { fullName } from "@/app/helpers/fullName";
import { PiPencil } from "react-icons/pi";
import Link from "next/link";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage({ searchParams }) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = user?.user_metadata;

  const address = fullAddress(userData);
  const name = fullName(userData);
  const addressForm = searchParams.form;
  const emailForm = searchParams.email;
  const passwordForm = searchParams.password;

  return (
    <section className="mt-10  flex flex-col items-start px-10  gap-20 self-center max-w-screen-lg sm:w-screen ">
      <h1 className="text-2xl text-neutral-900">Profile</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-neutral-800"> Hello {name},</h2>
        <span className="text-neutral-500">
          On this page you can check and change your account info
        </span>
      </div>
      <div className="flex flex-col w-full gap-2 border-t-2 border-neutral-500 pt-5">
        <h2 className="text-neutral-800">Your Order Address:</h2>
        <span className="text-neutral-500 break-all">{address}</span>
        <span className="text-red-700 cursor-pointer hover:underline flex items-center gap-1">
          <PiPencil size={17} />
          <Link
            href={`${addressForm ? "/profile" : "?form=true"}`}
            className="text-xs underline"
          >
            Change
          </Link>
        </span>
        {addressForm && <ProfileForm form={"address"} userData={userData} />}
      </div>
      <div className="flex flex-col gap-2 w-full border-t-2 border-neutral-500 pt-5">
        <h2 className="text-neutral-800">Your Account Information:</h2>
        <div className="flex flex-wrap justify-between">
          <div className="flex gap-2 flex-col">
            <h3 className="text-neutral-700">Email address:</h3>
            <span className="text-neutral-500">{user.email}</span>
            <span className="text-red-700 cursor-pointer hover:underline flex items-center gap-1 mb-5">
              <PiPencil size={17} />
              <Link
                href={`${emailForm ? "/profile" : "?email=true"}`}
                className="text-xs underline"
              >
                Change
              </Link>
            </span>
            {emailForm && <ProfileForm form={"email"} userData={userData} />}
          </div>
          <div className="flex gap-2 flex-col">
            <h3 className="text-neutral-700">Password:</h3>
            <span className="text-neutral-500">
              For security reasons <br /> your password can&apos;t be shown.
            </span>
            <span className="text-red-700 cursor-pointer hover:underline flex items-center gap-1 mb-5">
              <PiPencil size={17} />
              <Link
                href={`${passwordForm ? "/profile" : "?password=true"}`}
                className="text-xs underline"
              >
                Change
              </Link>
            </span>
            {passwordForm && (
              <ProfileForm form={"password"} userData={userData} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
