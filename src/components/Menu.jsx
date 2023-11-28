import Link from "next/link";
import { useSelector } from "react-redux";

export default function Menu({ linkClick, signOutClick }) {
  const { signedIn, error } = useSelector((state) => state.user);

  return (
    <nav className="min-h-screen bg-primary_light text-neutral-300 list-none flex flex-col gap-8 text-center pt-10 z-50">
      {signedIn ? (
        <>
          <li>
            <Link onClick={linkClick} href="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link onClick={linkClick} href="/orders">
              Orders
            </Link>
          </li>
          <li onClick={linkClick} className="text-red-400">
            <button onClick={signOutClick}>Sign Out</button>
          </li>
          {error ? (
            <li onClick={linkClick} className="text-red-400">
              Something went wrong, try again
            </li>
          ) : (
            ""
          )}
        </>
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
          <li className="border-t border-neutral-600 text-center self-center hover:text-primary">
            <Link onClick={linkClick} href="/sign-up">
              Sign Up
            </Link>
          </li>
        </>
      )}
    </nav>
  );
}
