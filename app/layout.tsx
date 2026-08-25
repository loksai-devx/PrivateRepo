import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NANNA — 30 Days",
  description: "A 30-day birthday journey for Sai Priya",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`} data-scroll-behavior="smooth">
      <body className="relative min-h-full antialiased bg-black text-off-white">
        <Navigation />
        <main className="pt-14">{children}</main>
      </body>
    </html>
  );
}
