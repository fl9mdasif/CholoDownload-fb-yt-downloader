// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Link from "next/link";
// import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
// import { useDownloadYouTubeMutation } from "@/redux/api/downloadAPi";

// export function YouTubeInput() {

//   const placeholder2 = [
//     "🔴 Paste Your YouTube video link"
//   ];

//   const handleChange = (e: any) => {
//     console.log(e.target.value);
//   };
//   const onSubmit = (e: any) => {
//     e.preventDefault();
//     console.log("submitted", e);
//   };


//   const placeholder1 = ["🔵 Paste Your Facebook video link"];

//   const [facebookUrl, setFacebookUrl] = useState(""); // State to hold the input value
//   const [ytResponse, setYtResponse] = useState(); // State to hold the input value

//   const [facebookLinks, setFacebookLinks] = useState<FacebookDownloadLinks | null>(null); // State to hold the URLs
//   const [loading, setLoading] = useState(false); // State to handle loading status
//   const [downloadYoutube] = useDownloadYouTubeMutation()

//   // Handle input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFacebookUrl(e.target.value); // Update state with input value
//   };

//   // Handle form submit
//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Check if the URL is valid before sending the request
//     if (!facebookUrl) {
//       console.error("No Facebook video URL provided");
//       return;
//     }

//     // Prepare the payload
//     const facebookData = { url: facebookUrl };
//     const data = modifyPayload(downloadYoutube);

//     console.log("Modified Payload:", data);


//     setLoading(true); // Set loading to true when request starts

//     try {
//       // Send the request to download the Facebook video
//       const res: any = await downloadFacebook(data).unwrap();


//       // Set the response data
//       setFbResponse(res.fbResponse);
//       // setFacebookLinks(res.downloadUrl);
//       console.log('client response', fbResponse)
//       console.log('client response', fbResponse)
//     } catch (err: any) {
//       console.error("Error downloading Facebook video:", err.message);
//     } finally {
//       setLoading(false); // Set loading to false when request completes
//     }
//   };
//   return (
//     <div className=" flex flex-col gap-8 items-center px-4">

//       <PlaceholdersAndVanishInput
//         placeholders={placeholder2}
//         onChange={handleChange}
//         onSubmit={onSubmit}
//       />
//       <p className="max-w-4xl mt-12 mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
//         Your one-stop solution for quick video downloads from Facebook, YouTube, and more. Save your favorite content in just a few clicks simple, fast, and hassle-free. Start downloading today, totally free.
//       </p>

//       <span className="flex items-center justify-center text-white h-12 rounded-lg bg-blue-600 w-3/4 text-center font-bold cursor-pointer">
//         <Link href="/facebook">
//           Download Facebook video
//         </Link>
//       </span>
//     </div>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input';
import { useDownloadYouTubeMutation } from '@/redux/api/downloadAPi';
import { modifyPayload } from '@/utils/modifyPayload';

export function YouTubeInput() {
  // Placeholder for the input field
  const placeholder2 = ["🔴 Paste Your YouTube video link"];

  // State to hold the YouTube video URL
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  // State to handle loading status
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadYoutube] = useDownloadYouTubeMutation()

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
          hello
        </div>
      )
      }
      <p className="max-w-4xl mt-12 mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Your one-stop solution for quick video downloads from Facebook, YouTube, and more. Save your favorite content in just a few clicks: simple, fast, and hassle-free. Start downloading today, totally free.
      </p>

      {/* Link to download Facebook video page */}
      <span className="flex items-center justify-center text-white h-12 rounded-lg bg-blue-600 w-3/4 text-center font-bold cursor-pointer">
        <Link href="/facebook">
          Download Facebook video
        </Link>
      </span>
    </div>
  );
}
