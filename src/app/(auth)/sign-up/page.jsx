"use client";

import CustomButton from "@/components/CustomButton";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/sign-up", data);
      console.log("res", res);
      if (res.data.error) {
        setError(true);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const password = watch("password");
  const reEnterPass = watch("rePassword");

  useEffect(() => {
    if (password && reEnterPass) {
      if (password === reEnterPass) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else {
      setIsDisabled(true);
    }
  }, [watch, password, reEnterPass]);

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
      {success ? (
        <div className="flex flex-col text-center self-center flex-wrap min-w-fit gap-10 border-2 border-secondary p-5 bg-secondary drop-shadow-md shadow-secondary">
          <h1 className="text-2xl text-neutral-200">Email Confirmation Sent</h1>
          <p className="text-neutral-300 flex flex-col gap-5">
            Thank you for signing up to Nuvola Coffee Shop! <br /> We&apos;ve
            sent a confirmation email to complete your registration. <br />
            Please check your inbox{" "}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-12 justify-center max-w-xs w-full"
        >
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-20 justify-center">
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
                  placeholder="example@example.com"
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
                  placeholder="Minumum 6 characters"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {errors?.password?.type === "required" && (
                  <p className="text-red-700 text-xs">This field is required</p>
                )}
                {errors?.password?.type === "minLength" && (
                  <p className="text-red-700 text-xs">
                    Password can not be less than 6 characters
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-neutral-700" htmlFor="password">
                  Repeat Password:
                </label>
                <input
                  className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
                  type="password"
                  {...register("rePassword", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {errors?.rePassword?.type === "required" && (
                  <p className="text-red-700 text-xs">This field is required</p>
                )}
              </div>
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
          {error && (
            <p className="text-red-700 text-xs">
              Something went wrong, try again.
            </p>
          )}
          <CustomButton
            isLoading={loading}
            isDisabled={isDisabled}
            text={"Sign Up"}
          />
        </form>
      )}

      <p className="text-gray-600 text-sm">
        Already have an account?{" "}
        <Link href="/sign-in">
          <span className="text-blue-800 hover:underline">Sign In</span>
        </Link>
      </p>
    </section>
  );
}
