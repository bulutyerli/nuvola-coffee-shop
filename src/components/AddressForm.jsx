"use client";

import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { PiXBold } from "react-icons/pi";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AddressForm({ userData, form }) {
  const supabase = createClientComponentClient();

  const [newData, setNewData] = useState({
    address: userData.address,
    city: userData.city,
    state: userData.state,
    zip: userData.zip,
    country: userData.country,
  });
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPass, setReEnterPass] = useState("");
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [emailConfirm, setEmailConfrim] = useState(false);

  const updateUser = async () => {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        address: newData.address,
        city: newData.city,
        state: newData.state,
        zip: newData.zip,
        country: newData.country,
      },
    });
  };

  const updateEmail = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
      });
      if (!error) {
        setEmailConfrim(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      password.length > 0 &&
      reEnterPass.length > 0 &&
      password === reEnterPass
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [password, reEnterPass]);

  useEffect(() => {
    if (newEmail.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [newEmail]);

  const updatePassword = async () => {
    try {
      setIsLoading(true);
      if (password === reEnterPass) {
        const { data, error } = await supabase.auth.updateUser({
          password: password,
        });
        if (error) {
          throw new Error(error);
        }
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return form === "address" ? (
    <form
      className="flex flex-col gap-5 p-5 bg-secondary mt-5 border-2 border-secondary"
      action=""
    >
      <Link className="self-end cursor-pointer" href={"/profile"}>
        <PiXBold size={22} className="text-neutral-300" />
      </Link>
      <label className="text-sm text-neutral-300" htmlFor="address">
        Address:
      </label>
      <textarea
        className="resize-none h-16 shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
        type="text"
        value={newData.address}
        onChange={(e) => {
          setNewData({ ...newData, address: e.target.value });
        }}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label className="text-sm text-neutral-300" htmlFor="city">
              City:
            </label>
            <input
              className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
              type="text"
              value={newData.city}
              onChange={(e) => {
                setNewData({ ...newData, city: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm text-neutral-300" htmlFor="state">
              State:
            </label>
            <input
              className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
              type="text"
              value={newData.state}
              onChange={(e) => {
                setNewData({ ...newData, state: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label className="text-sm text-neutral-300" htmlFor="zip">
              Zip Code:
            </label>
            <input
              className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
              type="text"
              value={newData.zip}
              onChange={(e) => {
                setNewData({ ...newData, zip: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm text-neutral-300" htmlFor="country">
              Country:
            </label>
            <input
              className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
              type="text"
              value={newData.country}
              onChange={(e) => {
                setNewData({ ...newData, country: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
      <CustomButton
        isLoading={isLoading}
        onClick={updateUser}
        style={"green"}
        text={"Save"}
      />
      <span className="text-red-400">
        {error ? "Something went wrong" : ""}
      </span>
    </form>
  ) : form === "email" ? (
    <form
      className="flex flex-col gap-5 p-5 max-w-xs bg-secondary mt-5 border-2 border-secondary"
      action=""
    >
      <label className="text-sm text-neutral-300" htmlFor="email">
        New Email:
      </label>
      <input
        className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
        type="email"
        onChange={(e) => {
          setNewEmail(e.target.value);
        }}
      />
      <CustomButton
        isLoading={isLoading}
        isDisabled={isDisabled}
        onClick={updateEmail}
        style={"green"}
        text={"Save"}
      />
      <span className="text-red-400">
        {error ? "Something went wrong" : ""}
      </span>
      <span className="text-neutral-300 text-xs">
        {emailConfirm
          ? "A Confirmation email has been sent, please check your inbox"
          : ""}
      </span>
    </form>
  ) : (
    <form
      className="flex flex-col gap-5 p-5 bg-secondary mt-5 border-2 border-secondary"
      action=""
    >
      <label className="text-sm text-neutral-300" htmlFor="password">
        New Password:
      </label>
      <input
        className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <label className="text-sm text-neutral-300" htmlFor="password">
        Re-Enter:
      </label>
      <input
        className="shadow-inner shadow-neutral-200 rounded-lg p-1 text-sm focus:outline-none focus:border-secondary focus:border-2"
        type="password"
        onChange={(e) => {
          setReEnterPass(e.target.value);
        }}
      />
      <CustomButton
        isLoading={isLoading}
        isDisabled={isDisabled}
        onClick={updatePassword}
        style={"green"}
        text={"Save"}
      />
      <span className="text-red-400">
        {error ? "Something went wrong" : ""}
      </span>
    </form>
  );
}
