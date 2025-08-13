import Nav from "./nav";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import MiniNav from "@/components/MiniNav";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "SportsBook Odds Comparer",
  description: "compare odds across all sportsbooks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Nav />
        <MiniNav />

        {children}
        <Analytics />
      </body>
    </html>
  );
}
