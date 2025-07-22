"use client";
import { useSession } from "next-auth/react";
import HomeSearchBar from "../../components/HomeSearchBar";

export default function Home() {
  const { status } = useSession();

  return (
    <>
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {status !== "authenticated" && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
              Welcome to Movie Journal
            </h1>
          )}

          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl p-4">
            Track your favorite films and relive your cinematic journey.
          </p>

          <HomeSearchBar></HomeSearchBar>
        </div>
      </section>
    </>
  );
}
