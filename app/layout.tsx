import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ['latin'],
  style: "normal",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: false,   
});

export const metadata: Metadata = {
  title: "Bookit",
  description: "BookIt, a gently place to buy your next book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
