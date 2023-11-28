"use client";

import CustomButton from "@/components/CustomButton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signInAction } from "@/store/userSlice";
import { fetchCart } from "@/store/cartThunk";
import { getBrowserSession } from "@/lib/browserClient";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const forgotPassword = searchParams.get("forgot-password");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    let formData = new FormData();
    if (!forgotPassword) {
      formData.append("email", data.email);
      formData.append("password", data.password);
      const res = await axios.post("/api/auth/sign-in", formData);
      if (res.data.success) {
        dispatch(signInAction());
        dispatch(fetchCart());
        router.push("/");
      } else {
        setError(true);
        reset();
      }
    } else {
      const supabase = await getBrowserSession();
      try {
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(
          data.email,
          {
            redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/callback?next=/update-password`,
          }
        );
        if (error) {
          setError(true);
          setEmailSuccess(false);
        } else {
          setEmailSuccess(true);
          setError(false);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        reset();
      }
    }
  };

  return (
    <section className="items-center flex flex-col pt-11 gap-5 flex-grow px-5">
      <div className="flex items-center gap-5">
        <Image
          src="/logo.svg"
          width={50}
          height={50}
          alt="nuvola coffee shop logo"
        ></Image>
        <h1 className="text-lg font-medium text-neutral-600">
          {forgotPassword ? "Password Reset" : "Login"}
        </h1>
      </div>

      <form
        className="flex flex-col gap-6 justify-center max-w-xs w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 md:min-w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-700" htmlFor="name">
              Email:
            </label>
            <input
              className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
              type="email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>
          {forgotPassword ? (
            ""
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-700" htmlFor="password">
                Password:
              </label>
              <input
                className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
                type="password"
                {...register("password", { required: true, minLength: 6 })}
              />
            </div>
          )}
        </div>
        {forgotPassword ? (
          <Link
            href="?forgot-password=true"
            className="self-end text-green-700 text-xs"
          >
            Sign In.
          </Link>
        ) : (
          <Link
            href="?forgot-password=true"
            className="self-end text-red-800 text-xs"
          >
            Forgot Password.
          </Link>
        )}
        <CustomButton
          isLoading={loading}
          text={forgotPassword ? "Request" : "Sign In"}
        />
      </form>
      {emailSuccess && forgotPassword && (
        <span className="text-sm text-green-700">
          Recovery email has been sent!
        </span>
      )}
      {error && (
        <span className="text-sm text-red-700">
          {forgotPassword
            ? "Something went wrong, try again"
            : "Email or password is wrong"}
        </span>
      )}
      {forgotPassword ? (
        ""
      ) : (
        <p className="text-gray-600 text-sm">
          Don&apos;t you have an account yet?{" "}
          <Link href="/sign-up">
            <span className="text-blue-800 hover:underline">Sign Up</span>
          </Link>
        </p>
      )}
    </section>
  );
}
