"use client";
import Link from "next/link";
import { Sport } from "../../lib/api";
import { useState } from "react";
import Snackbar from "../components/Snackbar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";

function Nav() {
  const { data: sports, error } = useSWR(
    "/api/sports",
    async (url: string) => await fetch(url).then((res) => res.json())
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" bg-cyan-600 w-full border-b-2 p-4 relative">
      <Bars3Icon
        data-cy="bars-icon"
        width={56}
        className="text-black absolute top-0 left-3 hover:text-white cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <div className="flex justify-center items-center">
        <h1 className="text-2xl md:text-4xl">SportsBooks Odds 💯</h1>
      </div>
      {error && (
        <Snackbar
          className="absolute top-0 left-0"
          message={error.message} //"Oops! something went wrong while loading data for the navbar!"
          type="error"
        />
      )}
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
          {sports?.length ? (
            sports.map((sportItem: Sport) => (
              <Link
                className="text-white text-xl"
                key={sportItem.key}
                data-cy={`${sportItem.title.toLowerCase()}-link`}
                onClick={() => setIsOpen(false)}
                href={`/odds/${sportItem.key}/moneyline`}
              >
                {sportItem.title}
              </Link>
            ))
          ) : (
            <Snackbar
              message="Oops! it looks like no data is available!"
              type="error"
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
