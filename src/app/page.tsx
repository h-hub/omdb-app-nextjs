import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <img
          src="/images/home_banner.jpeg"
          alt="Movie Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-blue bg-opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Welcome to Movie Journal
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
            Track your favorite films and relive your cinematic journey.
          </p>
          <Link
            href="/movies"
            className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded shadow-lg transition"
          >
            Start Searching
          </Link>
        </div>
      </section>
      <div className="w-full bg-fuchsia-300 text-dark text-center py-2 mt-20">
        <p className="font-medium text-sm">
          More features will be added daily..
        </p>
      </div>
    </>
  );
}
