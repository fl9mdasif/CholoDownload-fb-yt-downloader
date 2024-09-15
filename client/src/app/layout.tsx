
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { BackgroundLinesDemo } from "@/components/BackgroundLines";
import Providers from "@/lib/providers/Provider";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CholoDownload",
  description: "Download free Facebook & Youtube videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <BackgroundLinesDemo />
          <FollowerPointerCard>
            {children}
          </FollowerPointerCard>
        </body>
      </html>
    </Providers>
  );
}
