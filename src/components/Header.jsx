"use client";

import Image from "next/image";
import Link from "next/link";
import { PiShoppingCartSimpleBold, PiUserBold, PiXBold } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import { useRouter } from "next/navigation";
import axios from "axios";
import { fetchCart } from "@/store/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, signOutAction, signOutFailure } from "@/store/userSlice";
import { Spinner } from "./LoadingSpinner";
import logo from "../../public/logo.svg";

export default function Header({ session }) {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef();
  const router = useRouter();
  const { cartCount, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(signInAction());
      dispatch(fetchCart());
    } else {
      dispatch(signOutAction());
    }
  }, [session, dispatch]);

  const signOut = async () => {
    const res = await axios.post("/api/auth/sign-out");
    if (res.data.success) {
      dispatch(fetchCart());
      dispatch(signOutAction());
      router.refresh();
      router.push("/");
    } else {
      dispatch(signOutFailure());
    }
  };

  const handleMenu = () => {
    setMenu(!menu);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };
    if (menu) {
      document.body.classList.add("no-scroll");
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menu]);

  const clickHandler = () => {
    setMenu(false);
  };

  return (
    <header className=" bg-primary grid grid-cols-2 grid-rows-none items-center justify-between sm:flex relative px-1 sm:px-3 pb-5">
      <div className="col-start-1 col-span-1 w-24 h-auto md:w-32">
        <Link href="/">
          <Image src={logo} alt="nuvola coffee shop logo" priority></Image>
        </Link>
      </div>
      <nav className="flex gap-10 text-secondary col-start-1 col-span-3 row-start-2 justify-center">
        <Link className="hover:underline hover:text-neutral-600 " href="/">
          Home
        </Link>
        <Link className="hover:underline hover:text-neutral-600 " href="/shop">
          Shop
        </Link>
        <Link
          className="hover:underline hover:text-neutral-600 "
          href="/stores"
        >
          Stores
        </Link>
      </nav>
      <div className="flex items-center gap-6 text-xl sm:text-2xl text-secondary col-start-2 col-span-1 justify-end ">
        <div className="relative">
          <Link href="/cart">
            <PiShoppingCartSimpleBold className="hover:fill-neutral-600 cursor-pointer" />
          </Link>
          {cartCount > 0 ? (
            <div className="absolute text-xs bg-green-800 text-gray-100 rounded-full -top-2 left-3 w-5 h-5 flex items-center justify-center">
              {loading ? <Spinner /> : cartCount}
            </div>
          ) : (
            ""
          )}
        </div>

        {menu ? (
          <PiXBold
            onClick={() => {
              handleMenu();
            }}
            className="cursor-pointer"
          />
        ) : (
          <PiUserBold
            onClick={() => {
              handleMenu();
            }}
            className="hover:fill-neutral-600 cursor-pointer"
          />
        )}
      </div>
      <div
        ref={menuRef}
        className={`fixed z-10 right-0 top-24 h-full w-full sm:w-96 transform transition-transform duration-300 ease-in-out ${
          menu ? "translate-x-0 shadow-lg shadow-secondary" : "translate-x-full"
        }`}
      >
        <Menu signOutClick={signOut} linkClick={clickHandler} />
      </div>
    </header>
  );
}
