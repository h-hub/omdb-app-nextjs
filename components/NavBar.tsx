"use client";
import { MovieContext } from "@/app/context/MovieSearchContext";
import { RouteKind } from "next/dist/server/route-kind";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { use, useState, useRef } from "react";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { updateSearchString } = use(MovieContext);
  const movieSearchStringInputRef = useRef<HTMLInputElement>(null);

  const submitSearch = () => {
    if (movieSearchStringInputRef.current) {
      const value = movieSearchStringInputRef.current.value;
      updateSearchString(value);
      router.push("/movies");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-semibold">Movie Journal</div>
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/"
              className={
                path == "/" ? "active underline" : "hover:text-gray-300"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/movies"
              className={
                path == "/movies" ? "active underline" : "hover:text-gray-300"
              }
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              href="/mylist"
              className={
                path == "/mylist" ? "active underline" : "hover:text-gray-300"
              }
            >
              My List
            </Link>
          </li>
        </ul>

        <div className="ml-6 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            ref={movieSearchStringInputRef}
            className="px-3 py-1 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitSearch();
              }
            }}
          />
          <button
            className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200 transition"
            onClick={submitSearch}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}
