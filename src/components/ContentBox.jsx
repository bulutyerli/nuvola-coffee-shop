import Image from "next/image";

export default function ContentBox({ image, title, content, reverse }) {
  return (
    <article
      className={`flex flex-col ${
        reverse ? "sm:flex-row-reverse" : "sm:flex-row"
      } items-center gap-5 px-5 max-w-2xl self-center`}
    >
      <Image
        className="w-52 h-auto sm:w-72"
        width={300}
        height={300}
        alt="nuvola coffee shop"
        src={image}
      ></Image>
      <span
        className={`flex flex-col text-start gap-2 self-start ${
          reverse ? "sm:self-end" : ""
        }`}
      >
        <h3 className="text-xl text-neutral-900 font-semibold">{title}</h3>
        <p className="text-neutral-700">{content}</p>
      </span>
    </article>
  );
}
