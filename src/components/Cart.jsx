import Link from "next/link";

export default function Cart({ isUser, linkClick, signOutClick, cart }) {
  return (
    <nav className="min-h-screen bg-primary_light text-neutral-300 list-none flex flex-col gap-10 text-center pt-10 z-50">
      {isUser ? (
        <div>
          <h2>Your Cart</h2>
        </div>
      ) : (
        <>
          <h2 className="text-xl text-primary">
            Welcome to Nuvola Coffee Shop
          </h2>
          <li className="hover:text-primary">
            <Link onClick={linkClick} href="/sign-in">
              Sign In
            </Link>
          </li>
          <li className="border-t border-neutral-600 pt-10 text-center self-center hover:text-primary">
            <Link onClick={linkClick} href="/sign-up">
              Sign Up
            </Link>
          </li>
        </>
      )}
    </nav>
  );
}
