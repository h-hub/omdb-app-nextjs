"use client";
import { useSidebar } from "@/app/context/SidebarContext";
import { BsLinkedin } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-black text-green-500 font-mono border-gray-700 shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <span className="font-bold text-lg">OMDB Nextjs APP</span>
        <button
          onClick={closeSidebar}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      <section className="m-5">
        <p>
          This App is built using React 19/Next.js 15. <br />
          Movie Data is retrieved from the OMDB database via Rest APIs.
        </p>
      </section>
      <ul className="p-6 space-y-4">
        <li className="hover:text-yellow-300 cursor-pointer">
          Github Link to this project:{" "}
          <a
            className="text-blue-500 hover:text-blue-700 underline"
            href="https://github.com/h-hub/omdb-app-nextjs"
            target="_blank"
          >
            link
          </a>
        </li>
        <li className="hover:text-yellow-300 cursor-pointer">
          OMDB:{" "}
          <a
            className="text-blue-500 hover:text-blue-700 underline"
            href="https://www.omdbapi.com/"
            target="_blank"
          >
            www.omdbapi.com
          </a>
        </li>
        <li className="hover:text-yellow-300 cursor-pointer">
          My Linkedin
          <a
            className="text-blue-500 hover:text-blue-700 underline"
            href="https://au.linkedin.com/in/harsha-jayamanna-26996827"
            target="_blank"
          >
            <BsLinkedin />
          </a>
        </li>
        <li className="hover:text-yellow-300 cursor-pointer">
          My Website
          <a
            className="text-blue-500 hover:text-blue-700 underline"
            href="https://www.harshajayamanna.com/"
            target="_blank"
          >
            <TbWorldWww />
          </a>
        </li>
      </ul>
    </div>
  );
}
