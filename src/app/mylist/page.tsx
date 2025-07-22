"use client";
import { useSession } from "next-auth/react";

export default function MyList() {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="w-full bg-fuchsia-300 text-dark text-center py-2 mt-20">
          <p className="font-medium text-sm">Under construction</p>
        </div>
      </section>
    );
  }
  return <p>Not Signed in</p>;
}
