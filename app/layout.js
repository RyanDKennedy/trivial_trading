import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { hasSession, getFullName } from "@/app/lib/utils.js";
import { logout } from "@/app/(users)/users.js";

import Navbar from "@/app/components/navbar.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Trivial Trading",
  description: "A practice stock trading app.",
};


export default async function RootLayout({ children }) {

    const doesHaveSession = await hasSession();

  return (
	  <html lang="en">
	  <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
	  <Navbar hasSession={doesHaveSession}/>
          {children}
          </body>
	  </html>
  );
}
