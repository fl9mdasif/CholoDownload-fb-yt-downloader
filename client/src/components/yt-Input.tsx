/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export function YouTubeInput() {

  const placeholder2 = [
    "🔴 Paste Your YouTube video link"
  ];

  const handleChange = (e: any) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className=" flex flex-col gap-8 items-center px-4">

      <PlaceholdersAndVanishInput
        placeholders={placeholder2}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <p className="max-w-4xl mt-12 mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Your one-stop solution for quick video downloads from Facebook, YouTube, and more. Save your favorite content in just a few clicks simple, fast, and hassle-free. Start downloading today, totally free.
      </p>

      <span className="flex items-center justify-center text-white h-12 rounded-lg bg-blue-600 w-3/4 text-center font-bold cursor-pointer">
        <Link href="/facebook">
          Download Facebook video
        </Link>
      </span>
    </div>
  );
}
