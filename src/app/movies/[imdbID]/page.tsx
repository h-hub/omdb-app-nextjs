"use client";
import { getMovie } from "@/app/actions/fetchMovie";
import useSWR from "swr";
import ImageWithFallback from "../../../../components/ImageWithFallback";
import { useParams } from "next/navigation";
import Link from "next/link";
import TextInputEditor from "../../../../components/TextInputEditor";

const initContent = `
  <h1>🎬 Welcome to Your Movie Journal! 📖</h1>
  <p>Hi there!</p>
  <p>This is your cozy little corner to capture all your thoughts, feelings, and favorite moments from the movies you watch. 
  Whether it made you laugh, cry, think deeply, or just gave you a good time — jot it all down here!</p>
  <ul>
    <li><strong>💖 What You Loved:</strong> Was it the story, the acting, the music, or maybe a quote that stuck with you?</li>
    <li><strong>📍 Where to Watch:</strong> Netflix, Disney+, Prime Video, or maybe a cinema experience?</li>
    <li><strong>🌟 Favorite Scene or Character:</strong> Who stole the show for you?</li>
    <li><strong>📝 Final Thoughts:</strong> Would you recommend it? Would you watch it again?</li>
  </ul>
  <p><em>Feel free to add your own flair — doodles, ratings, or even a mini review!</em></p>
  <p><strong>Happy journaling,<br>— Harsha 😊</strong></p>
  <h1>This is content can be updated, but will not be saved yet. I am still working on that feature</h1>
  `;

export default function Movie() {
  const params = useParams();
  const imdbID = typeof params?.imdbID === "string" ? params.imdbID : "";

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
        <>
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

            <div className="col-span-4 space-y-2 border border-gray-300 p-4 bg-gray-100 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 text-indigo-950">
              <TextInputEditor initContent={initContent} identifier={data.imdbID}/>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
