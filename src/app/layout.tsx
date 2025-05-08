import Nav from "./nav";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import MiniNav from "@/components/MiniNav";

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
      <body className="bg-slate-200">
        <Nav />
        <MiniNav />

        {children}
      </body>
      <Analytics />
    </html>
  );
}
