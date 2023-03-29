"use client";
import Link from "next/link";
import Logo from "../../public/next.svg";
import Image from "next/image";
import useSWR from "swr";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Sport } from "../../lib/api";

function Nav() {
  const {
    data: sports,
    isLoading,
    error,
  } = useSWR(
    "/sports/api",
    async (url: string) => await fetch(url).then((res) => res.json())
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error...</div>;

  return (
    <nav className=" bg-cyan-600 w-full border-b-2 p-4">
      <div className="flex justify-center items-center">
        <Image
          className="image w-32"
          src={Logo}
          alt="Logo for sportsbook odds comparer tool"
          priority={true}
        />
      </div>
      <div className="flex flex-col gap-4 justify-center p-3 absolute bg-cyan-600 left-0 top-10">
        {sports.map((sport: Sport) => {
          return (
            <Link
              key={sport.key}
              data-cy={`${sport.group.toLowerCase()}-link`}
              href={`/odds/${sport.key}`}
            >
              {sport.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Nav;
