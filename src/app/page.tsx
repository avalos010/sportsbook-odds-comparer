import { Inter } from "next/font/google";
import Odds from "./odds/page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main id="main">
      {/* @ts-ignore */}
      <Odds />
    </main>
  );
}
