"use client";

import CustomButton from "@/components/CustomButton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignInPage() {
  const [error, setError] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const res = await axios.post("/api/auth/sign-in", formData);

      if (res.data.error) {
        setError(true);
        reset();
      }
    } catch (error) {
      console.error("Network error:", error);
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
        <h1 className="text-lg font-medium text-neutral-600">Login</h1>
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
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-700" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
        </div>
        <CustomButton text={"Sign In"} />
      </form>
      {error ? (
        <span className="text-sm text-red-700">Email or password is wrong</span>
      ) : (
        ""
      )}
      <p className="text-gray-600 text-sm">
        Don&apos;t you have an account yet?{" "}
        <Link href="/sign-in">
          <span className="text-blue-800 hover:underline">Sign Up</span>
        </Link>
      </p>
    </section>
  );
}
