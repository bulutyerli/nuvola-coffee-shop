"use client";
import { Spinner } from "./LoadingSpinner";

export default function CustomButton({
  text,
  onClick,
  style,
  isDisabled,
  isLoading,
}) {
  let color =
    style === "red"
      ? "text-red-700"
      : style === "green"
      ? "text-green-700"
      : "";

  return (
    <button
      onClick={onClick}
      className={`bg-primary border-2 border-secondary px-5 py-1 rounded-md text-xs sm:text-sm hover:bg-secondary hover:text-primary flex justify-center items-center h-8 cursor-pointer shadow-md shadow-secondary hover:shadow-none self-center ${color} ${
        isDisabled ? "opacity-30 pointer-events-none" : ""
      }`}
    >
      {isLoading ? <Spinner /> : text}
    </button>
  );
}
