import { Inter } from "next/font/google";
import Odds from "./odds/page";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      {/* @ts-ignore */}
      <Odds />
    </>
  );
}
