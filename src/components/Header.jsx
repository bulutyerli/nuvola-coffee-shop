import Image from "next/image";
import Link from "next/link";
import { PiShoppingCartSimpleBold, PiUserBold } from "react-icons/pi";

export default function Header() {
  return (
    <header className="p-1 bg-primary grid grid-cols-2 grid-rows-none items-center justify-between sm:flex">
      <div className="col-start-1 col-span-1">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={75} height={75}></Image>
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
      <div className="flex items-center gap-5 text-2xl text-secondary col-start-2 col-span-1 justify-end">
        <Link href="cart">
          <PiShoppingCartSimpleBold className="hover:fill-neutral-600" />
        </Link>
        <Link href="profile">
          <PiUserBold className="hover:fill-neutral-600" />
        </Link>
      </div>
    </header>
  );
}
