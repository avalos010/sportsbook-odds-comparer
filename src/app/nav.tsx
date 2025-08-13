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
    <nav className=" bg-cyan-600 w-full border-b-2" aria-label="Primary">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          type="button"
          data-cy="bars-icon"
          aria-label="Open menu"
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          className="text-black absolute top-0 left-3 hover:text-white"
          onClick={() => setIsOpen(true)}
        >
          <Bars3Icon width={56} aria-hidden="true" className="pointer-events-none" />
        </button>
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
      </div>
      <div
        className={`p-3 fixed -top-3 bottom-0 duration-75 transition-opacity ease-in  overflow-y-scroll z-10 bg-black/50 w-full ${
          isOpen ? "left-0 opacity-100" : "-left-full opacity-0"
        }`}
        aria-hidden={!isOpen}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen || undefined}
      >
        <div
          id="primary-navigation"
          role="navigation"
          aria-label="Main menu"
          className="flex flex-col gap-4 justify-start bg-cyan-600 p-4 w-full max-w-xs h-full relative"
        >
          <button
            type="button"
            aria-label="Close menu"
            className="text-black w-14 absolute top-3 right-3 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon aria-hidden="true" className="w-14 h-14 pointer-events-none" />
          </button>
          {sports?.length ? (
            sports.map((sportItem: Sport) => (
              <Link
                className="text-white text-lg"
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
