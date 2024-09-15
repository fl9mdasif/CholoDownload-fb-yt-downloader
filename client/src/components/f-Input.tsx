/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Link from "next/link";
// import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
// import { useDownloadFacebookMutation } from "@/redux/api/downloadAPi";
// import { modifyPayload } from "@/utils/modifyPayload";
// import { useState } from "react";

// // Define a type for the response
// interface FacebookDownloadLinks {
//   "Download Low Quality": string;
//   "Download High Quality": string;
// }

// export function FacebookInput() {
//   const placeholder1 = ["🔵 Paste Your Facebook video link"];

//   const [facebookUrl, setFacebookUrl] = useState(""); // State to hold the input value
//   const [facebookLinks, setFacebookLinks] = useState<FacebookDownloadLinks | null>(null); // State to hold the URLs
//   const [downloadFacebook] = useDownloadFacebookMutation();

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
//     const data = modifyPayload(facebookData);

//     console.log("Modified Payload:", data);

//     try {
//       // Send the request to download the Facebook video
//       const res = await downloadFacebook(data).unwrap();
//       console.log("Response from server:", res.downloadUrl);

//       // Set the response data
//       setFacebookLinks(res.downloadUrl);

//     } catch (err: any) {
//       console.error("Error downloading Facebook video:", err.message);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-8 items-center px-4">
//       {/* Input field with animated placeholders */}
//       <PlaceholdersAndVanishInput
//         placeholders={placeholder1}
//         onChange={handleChange}
//         onSubmit={onSubmit}
//       />

//       {/* Display the download URLs as buttons */}
//       <div className="mt-4">
//         {facebookLinks ? (
//           <>
//             {facebookLinks["Download High Quality"] && (
//               <a
//                 href={facebookLinks["Download High Quality"]}
//                 download
//                 className="bg-blue-500 text-white py-2 px-4 rounded m-2"
//               >
//                 Download High Quality
//               </a>
//             )}
//             {facebookLinks["Download Low Quality"] && (
//               <a
//                 href={facebookLinks["Download Low Quality"]}
//                 download
//                 className="bg-blue-500 text-white py-2 px-4 rounded m-2"
//               >
//                 Download Low Quality
//               </a>
//             )}
//           </>
//         ) : (
//           <p>No URLs available.</p>
//         )}
//       </div>

//       <p className="max-w-4xl mt-12 mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
//         Your one-stop solution for quick video downloads from Facebook, YouTube, and more. Save your favorite content in just a few clicks, simple, fast, and hassle-free. Start downloading today, totally free.
//       </p>

//       {/* Button to navigate to YouTube video downloader */}
//       <span className="flex items-center justify-center text-white h-12 rounded-lg bg-red-600 w-3/4 text-center font-bold cursor-pointer">
//         <Link href="/youtube">Download YouTube video</Link>
//       </span>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { useDownloadFacebookMutation } from "@/redux/api/downloadAPi";
import { modifyPayload } from "@/utils/modifyPayload";
import { useState } from "react";

// Define a type for the response
interface FacebookDownloadLinks {
  "Download Low Quality": string;
  "Download High Quality": string;
}

export function FacebookInput() {
  const placeholder1 = ["🔵 Paste Your Facebook video link"];

  const [facebookUrl, setFacebookUrl] = useState(""); // State to hold the input value
  const [facebookLinks, setFacebookLinks] = useState<FacebookDownloadLinks | null>(null); // State to hold the URLs
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [downloadFacebook] = useDownloadFacebookMutation();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFacebookUrl(e.target.value); // Update state with input value
  };

  // Handle form submit
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the URL is valid before sending the request
    if (!facebookUrl) {
      console.error("No Facebook video URL provided");
      return;
    }

    // Prepare the payload
    const facebookData = { url: facebookUrl };
    const data = modifyPayload(facebookData);

    console.log("Modified Payload:", data);

    setLoading(true); // Set loading to true when request starts

    try {
      // Send the request to download the Facebook video
      const res = await downloadFacebook(data).unwrap();
      console.log("Response from server:", res);

      // Set the response data
      setFacebookLinks(res.downloadUrl);
    } catch (err: any) {
      console.error("Error downloading Facebook video:", err.message);
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center px-4">
      {/* Input field with animated placeholders */}
      <PlaceholdersAndVanishInput
        placeholders={placeholder1}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      {/* Loading indicator */}
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V4a10 10 0 0 0 0 16v-4a8 8 0 0 1-8-8z"></path>
          </svg>
        </div>
      ) : (
        // Display the download URLs as buttons
        <div>
          {facebookLinks ? (
            <>
              {facebookLinks["Download High Quality"] && (
                <a
                  href={facebookLinks["Download High Quality"]}
                  download
                  className="bg-blue-500 text-white py-2 px-4 rounded m-2"
                >
                  Download High Quality
                </a>
              )}
              {facebookLinks["Download Low Quality"] && (
                <a
                  href={facebookLinks["Download Low Quality"]}
                  download
                  className="bg-blue-500 text-white py-2 px-4 rounded m-2"
                >
                  Download Low Quality
                </a>
              )}
            </>
          ) : (
            <p>No URLs available.</p>
          )}
        </div>
      )}

      <p className="max-w-4xl mt-12 mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Your one-stop solution for quick video downloads from Facebook, YouTube, and more. Save your favorite content in just a few clicks, simple, fast, and hassle-free. Start downloading today, totally free.
      </p>

      {/* Button to navigate to YouTube video downloader */}
      <span className="flex items-center justify-center text-white h-12 rounded-lg bg-red-600 w-3/4 text-center font-bold cursor-pointer">
        <Link href="/youtube">Download YouTube video</Link>
      </span>
    </div>
  );
}
