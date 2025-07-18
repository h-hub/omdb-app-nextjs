"use client";
import { getMovie } from "@/app/actions/fetchMovie";
import useSWR from "swr";
import ImageWithFallback from "../../../../components/ImageWithFallback";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Movie() {
  const params = useParams();
  const imdbID = params?.imdbID;

  if (typeof imdbID !== "string") {
    return <div>Invalid</div>;
  }
  const { data, isLoading } = useSWR(
    imdbID.trim() !== "" ? imdbID : null,
    () => getMovie(imdbID),
    {
      dedupingInterval: 50000,
    }
  );

  return (
    <main className="w-full flex flex-col">
      {isLoading && (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex items-center justify-center animate-pulse">
          <p className="text-xl font-semibold tracking-wide">Loading...</p>
        </div>
      )}

      {data && data.Response == "False" && (
        <div className="bg-gray-900 text-red p-6 rounded-lg shadow-lg flex items-center justify-center">
          <p className="text-lg font-semibold text-center text-red-500">
            Invalid Movie was Selected
          </p>
          <Link
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2"
            href="/movies"
          >
            Go back
          </Link>
        </div>
      )}

      {data && data.Response == "True" && (
        <div className="bg-gray-900 text-white shadow-lg overflow-hidden max-w-4xl mx-auto my-8 grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-1 p-4 space-y-2">
            <ImageWithFallback
              src={data.Poster}
              alt={data.Title}
            ></ImageWithFallback>
          </div>

          <div className="col-span-2 p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:justify-between">
              <h2 className="text-2xl font-bold">
                {data?.Title} ({data?.Year})
              </h2>
              <span className="text-sm bg-blue-700 px-3 py-1 rounded-full self-start mt-2 md:mt-0">
                {data?.Rated} • {data?.Runtime}
              </span>
            </div>

            <p className="text-gray-300">{data?.Plot}</p>

            <div className="text-sm text-gray-400">
              <p>
                <strong>Genre:</strong> {data?.Genre}
              </p>
              <p>
                <strong>Director:</strong> {data?.Director}
              </p>
              <p>
                <strong>Writer:</strong> {data?.Writer}
              </p>
              <p>
                <strong>Actors:</strong> {data?.Actors}
              </p>
              <p>
                <strong>Language:</strong> {data?.Language}
              </p>
              <p>
                <strong>Country:</strong> {data?.Country}
              </p>
              <p>
                <strong>Awards:</strong> {data?.Awards}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="bg-gray-800 px-4 py-2 rounded">
                <span className="text-yellow-400 font-semibold">IMDb:</span>{" "}
                {data?.imdbRating}
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded">
                <span className="text-purple-400 font-semibold">
                  Metascore:
                </span>{" "}
                {data?.Metascore}
              </div>
              {data?.Ratings?.map((rating, idx) => (
                <div key={idx} className="bg-gray-800 px-4 py-2 rounded">
                  <span className="text-green-400 font-semibold">
                    {rating.Source}:
                  </span>{" "}
                  {rating.Value}
                </div>
              ))}
            </div>

            {data?.Website !== "N/A" && (
              <a
                href={data?.Website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline text-sm"
              >
                Visit Official Website
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
