"use client";

import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const { register } = useForm();

  return (
    <section className="items-center flex flex-col pt-11 gap-5 flex-grow px-5">
      <h1 className="text-lg font-medium text-neutral-900">
        Welcome to Nuvola Coffee Shop!
      </h1>
      <p className="text-neutral-700 text-center leading-7 pb-5">
        Discover a world of exquisite coffee.
        <br />
        Sign up now and elevate your coffee experience with us. Join our
        community of coffee lovers today!
      </p>
      <form
        action="/api/auth/sign-up"
        method="post"
        className="flex flex-col gap-12 justify-center max-w-xs w-full"
      >
        <div className="sm:flex gap-20 justify-center">
          <div className="flex flex-col gap-6 md:min-w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-700" htmlFor="name">
                Name:
              </label>
              <input
                className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
                type="text"
                {...register("name", { required: true, minLength: 1 })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-700" htmlFor="name">
                Surname:
              </label>
              <input
                className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
                type="text"
                {...register("surname", { required: true, minLength: 1 })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-700" htmlFor="email">
                Email:
              </label>
              <input
                className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
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
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-700" htmlFor="password">
                Repeat Password:
              </label>
              <input
                className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
                type="password"
                {...register("reenter-password", {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>{" "}
          </div>

          <div className="flex flex-col gap-6 md:min-w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-700" htmlFor="text">
                Country:
              </label>
              <select
                className="cursor-pointer shadow shadow-neutral-200 rounded-lg p-1 text-sm"
                type="text"
                {...register("country", { required: true, minLength: 1 })}
              >
                <option>Türkiye</option>
                <option>United States</option>
                <option>Greece</option>
                <option>England</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-700" htmlFor="text">
                Street Address:
              </label>
              <textarea
                className="resize-none h-28 shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
                type="text"
                {...register("address", { required: true, minLength: 1 })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-neutral-700" htmlFor="text">
                  City:
                </label>
                <input
                  className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
                  type="text"
                  {...register("city", { required: true, minLength: 1 })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-neutral-700" htmlFor="text">
                  State / Province:
                </label>
                <input
                  className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
                  type="text"
                  {...register("state", { required: true, minLength: 1 })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-neutral-700" htmlFor="text">
                  Zip / Postal Code:
                </label>
                <input
                  className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
                  type="text"
                  {...register("zip", { required: true, minLength: 1 })}
                />
              </div>
            </div>
          </div>
        </div>
        <CustomButton text={"Sign Up"} />
      </form>
      <p className="text-gray-600 text-sm">
        Already have an account?{" "}
        <Link href="/sign-in">
          <span className="text-blue-800 hover:underline">Sign In</span>
        </Link>
      </p>
    </section>
  );
}
