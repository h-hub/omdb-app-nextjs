"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "@/app/context/SidebarContext";
import { FaGithub, FaGoogle, FaSignOutAlt } from "react-icons/fa";
import { handleSignIn, handleSignOut } from "../lib/auth";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const path = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleSidebar } = useSidebar();
  const { data: session, status } = useSession();

  const toggleSidebarFromNav = () => {
    toggleSidebar();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-stone-800 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {status === "authenticated" && session.user && (
          <div className="font-semibold text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl">
            {session.user.name}&apos;s Movie Journal
          </div>
        )}

        {status !== "authenticated" && (
          <div className="text-lg font-semibold">Movie Journal</div>
        )}

        <div className="flex items-center space-x-4">
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <Link
                href="/"
                className={path === "/" ? "underline" : "hover:text-gray-300"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/movies"
                className={
                  path === "/movies" ? "underline" : "hover:text-gray-300"
                }
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/mylist"
                className={
                  path === "/mylist" ? "underline" : "hover:text-gray-300"
                }
              >
                My List
              </Link>
            </li>
          </ul>

          <button
            onClick={toggleSidebarFromNav}
            className=" text-white-800 px-1 py-1 rounded hover:bg-gray-200 transition cursor-pointer"
          >
            <FaGithub className="text-xl" />
          </button>
          {status !== "authenticated" && (
            <button
              onClick={handleSignIn}
              className=" text-white-800 px-1 py-1 rounded hover:bg-gray-200 transition cursor-pointer"
              title="Sign in with Google"
            >
              <FaGoogle className="text-xl" />
            </button>
          )}
          {status == "authenticated" && (
            <button
              onClick={handleSignOut}
              className=" text-white-800 px-1 py-1 rounded hover:bg-gray-200 transition cursor-pointer"
              title="Sign out"
            >
              <FaSignOutAlt className="text-xl" />
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link
            href="/"
            className={`block ${
              path === "/" ? "underline" : "hover:text-gray-300"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/movies"
            className={`block ${
              path === "/movies" ? "underline" : "hover:text-gray-300"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Movies
          </Link>
          <Link
            href="/mylist"
            className={`block ${
              path === "/mylist" ? "underline" : "hover:text-gray-300"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            My List
          </Link>
        </div>
      )}
    </nav>
  );
}
