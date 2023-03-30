"use client";
import Link from "next/link";
import Logo from "../../public/next.svg";
import Image from "next/image";
// import useSWR from "swr";
import { Sport, getInSeasonSports } from "../../lib/api";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function Nav() {
  //TODO!: restore this when netlify fixes issue with appDir and edge functions.
  // Netlify is currently having issues with this waiting on a fix.
  // const { data: sports, error } = useSWR(
  //   "/sports/api",
  //   async (url: string) => aw dait fetch(url).then((res) => res.json())
  // );
  // if (error) return <div>Error...</div>;

  const [isOpen, setIsOpen] = useState(false);
  const [sports, setSports] = useState<Sport[]>([]);

  const fetchSports = async () => {
    //temporary workaround. will change back when netlify fixed issue with appDir and edge functions.
    const data = await getInSeasonSports();
    setSports(data);
  };

  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <nav className=" bg-cyan-600 w-full border-b-2 p-4 relative">
      <Bars3Icon
        data-cy="bars-icon"
        width={56}
        className="text-black absolute top-0 left-3 hover:text-white cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <div className="flex justify-center items-center">
        <Image
          className="image w-32"
          src={Logo}
          alt="Logo for sportsbook odds comparer tool"
          priority={true}
        />
      </div>
      <div
        className={`p-3 fixed -top-3 bottom-0 duration-75 transition-opacity ease-in  overflow-y-scroll z-10 bg-black/50 w-full ${
          isOpen ? "left-0 opacity-100" : "-left-full opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 justify-center  bg-cyan-600 p-3 -ml-3 md:w-4/12 w-3/4">
          <XMarkIcon
            className="text-black w-14 absolute top-3 right-3 hover:text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          {sports.map((sport: Sport) => {
            return (
              <Link
                className="text-white text-1xl"
                key={sport.key}
                data-cy={`${sport.title.toLowerCase()}-link`}
                onClick={() => {
                  setIsOpen(false);
                }}
                href={`/odds/${sport.key}/moneyline`}
              >
                {sport.title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
