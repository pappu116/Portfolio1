import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pappu Hasan | React Frontend Developer",
  description:
    "React frontend developer from Bogura, Bangladesh — building modern, animated web experiences with React, Next.js and TypeScript. Live data from GitHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} relative min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
