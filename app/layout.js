import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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

export default function RootLayout({ children }) {
    const navbarElementClasses = "hover:bg-gray-700 hover:text-yellow-400 p-2 rounded"

  return (
	  <html lang="en">
	  <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
	  <nav className="bg-gray-800 space-x-3 p-3">
	  <Link href="/" className={navbarElementClasses}>Home</Link>
	  </nav>
          {children}
          </body>
	  </html>
  );
}
