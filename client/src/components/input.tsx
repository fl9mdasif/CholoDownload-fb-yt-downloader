"use client";

import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";

export function InputDemo() {
  const placeholder1 = [
   "Paste Your Facebook video link"
  ];
  const placeholder2 = [
   "Paste Your YouTube video link"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className=" flex flex-col gap-9 items-center px-4">
      
      <PlaceholdersAndVanishInput
        placeholders={placeholder1}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

    <PlaceholdersAndVanishInput
        placeholders={placeholder2}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
       <p className="max-w-6xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      Your one-stop solution for quick video downloads from Facebook, YouTube, and more. Save your favorite content in just a few clicks simple, fast, and hassle-free. Start downloading today, totally free.
      </p>
    </div>
  );
}
