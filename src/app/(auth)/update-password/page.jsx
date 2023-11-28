"use client";

import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getBrowserSession } from "@/lib/browserClient";

export default function UpdatePasswordPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    const supabase = await getBrowserSession();
    if (data.password === data.rePassword) {
      try {
        setLoading(true);
        const { error } = await supabase.auth.updateUser({
          password: data.password,
        });

        if (error) {
          setError(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        reset();
      }
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
      <div className="flex items-center gap-5">
        <Image
          src="/logo.svg"
          width={50}
          height={50}
          alt="nuvola coffee shop logo"
        ></Image>
        <h1 className="text-lg font-medium text-neutral-600">
          Update Password
        </h1>
      </div>

      <form
        className="flex flex-col gap-6 justify-center max-w-xs w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 md:min-w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-700" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Minumum 6 characters"
              id="password"
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
              Re-Enter Password:
            </label>
            <input
              className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
              type="password"
              id="rePassword"
              {...register("rePassword", {
                required: true,
                minLength: 6,
              })}
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <CustomButton
          isDisabled={isDisabled}
          isLoading={loading}
          text="Submit"
        />
      </form>
      {error && (
        <span className="text-sm text-red-700">
          Something went wrong, try again
        </span>
      )}
    </section>
  );
}
