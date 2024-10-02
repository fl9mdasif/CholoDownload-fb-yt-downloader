
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input';
import { useDownloadYouTubeMutation } from '@/redux/api/downloadAPi';
import { modifyPayload } from '@/utils/modifyPayload';
import { YoutubeDownloadResponse } from '@/types';
import Image from 'next/image';

export function YouTubeInput() {
  // Placeholder for the input field
  const placeholder2 = ["🔴 Paste Your YouTube video link"];

  // State to hold the YouTube video URL
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  // State to handle loading status
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadYoutube] = useDownloadYouTubeMutation()
  const [ytResponse, setYtResponse] = useState<YoutubeDownloadResponse | null>(null);

  // Handle input change for YouTube URL
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value); // Update state with input value
  };

  // Handle form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!youtubeUrl) {
      console.error("No YouTube video URL provided");
      return;
    }

    setLoading(true); // Set loading to true when request starts
    const ytUrl = { url: youtubeUrl };
    const data = modifyPayload(ytUrl);
    try {
      // Call API or perform the action to download the YouTube video
      const res = await downloadYoutube(data).unwrap();

      console.log("YouTube response:", res);

      if (res) {
        setYtResponse(res)
      }
      // Handle the API response here

    } catch (error) {
      console.error("Error downloading YouTube video:", error);
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center px-4">
      {/* Input field with animated placeholders */}
      <PlaceholdersAndVanishInput
        placeholders={placeholder2}
        onChange={handleChange}
        onSubmit={onSubmit}
      />



      {loading ? (

        <div className="flex items-center justify-center py-4">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8V4a10 10 0 0 0 0 16v-4a8 8 0 0 1-8-8z"
            ></path>
          </svg>
        </div>

      ) : (
        <div>
          {
            ytResponse ? (
              <div className="flex flex-col justify-center items-center ">
                <p className="w-96 text-lg font-bold  font-4 mb-4 mt-4 ">{ytResponse?.title}</p>
                <Image
                  src={ytResponse?.thumbnail || '/../assets/images/thumbnail-default.png'}
                  height={200}
                  width={350}
                  alt="Video Thumbnail"
                  className=""
                />

                {ytResponse?.formats.map((quality) => (
                  <a
                    key={quality.itag} // Add a unique key for each item in the list
                    href={quality.url} // Use the URL from the quality object
                    download
                    className="bg-blue-500 text-lg font-bold text-white py-2 px-3 rounded m-2"
                  >
                    Download {quality.quality}
                  </a>
                ))}
              </div>
            ) : (
              <p>No Url found</p>
            )
          }
        </div>
      )
      }
      <p className="max-w-4xl mt-12 mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Your one-stop solution for quick video downloads from Facebook, YouTube, and more. Save your favorite content in just a few clicks: simple, fast, and hassle-free. Start downloading today, totally free.
      </p>

      {/* Link to download Facebook video page */}
      <span className="flex mb-24 items-center  justify-center text-white h-12 rounded-lg bg-blue-600 w-2/4 text-center font-bold cursor-pointer">
        <Link href="/facebook">
          Download Facebook video
        </Link>
      </span>
    </div>
  );
}
