"use client";

import Image from "next/image";
import Link from "next/link";
import { PiShoppingCartSimpleBold, PiUserBold, PiXBold } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import Cart from "./Cart";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Header({ session }) {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef();
  const router = useRouter();
  const [cart, setCart] = useState(false);
  const cartRef = useRef();
  const [cartCount, setCartCount] = useState(3);

  const signOut = async () => {
    await axios.post("/api/auth/sign-out");
    router.refresh();
    router.push("/");
  };

  const handleMenu = () => {
    setMenu(!menu);
    window.scrollTo(0, 0);
  };

  const handleCart = () => {
    setCart(!cart);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCart(false);
      }
    };
    if (cart) {
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
  }, [cart]);

  const clickHandler = () => {
    setMenu(false);
  };

  return (
    <header className=" bg-primary grid grid-cols-2 grid-rows-none items-center justify-between sm:flex relative px-1 sm:px-3 pb-5">
      <div className="col-start-1 col-span-1 w-16 h-auto sm:w-32">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="nuvola coffee shop logo"
            width={100}
            height={100}
            priority
          ></Image>
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
          <PiShoppingCartSimpleBold
            onClick={() => {
              handleCart();
            }}
            className="hover:fill-neutral-600 cursor-pointer"
          />
          <div className="absolute text-sm bg-green-800 text-gray-100 rounded-full -top-2 left-3 w-5 h-5 flex items-center justify-center">
            {cartCount > 0 ? cartCount : ""}
          </div>
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
        ref={cartRef}
        className={`fixed z-10 right-0 top-24 h-full w-full sm:w-96 transform transition-transform duration-300 ease-in-out ${
          cart ? "translate-x-0 shadow-lg shadow-secondary" : "translate-x-full"
        }`}
      >
        <Cart isUser={session} />
      </div>
      <div
        ref={menuRef}
        className={`fixed z-10 right-0 top-24 h-full w-full sm:w-96 transform transition-transform duration-300 ease-in-out ${
          menu ? "translate-x-0 shadow-lg shadow-secondary" : "translate-x-full"
        }`}
      >
        <Menu
          signOutClick={signOut}
          isUser={session}
          linkClick={clickHandler}
        />
      </div>
    </header>
  );
}
