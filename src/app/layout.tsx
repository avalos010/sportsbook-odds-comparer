import Nav from "./nav";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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
      <body>
        <Nav />
        {children}
      </body>
      <Analytics />
    </html>
  );
}
