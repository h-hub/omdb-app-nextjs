"use client";
import { useEffect, useState, use, useMemo } from "react";
import useSWR, { Key } from "swr";
import { getMovies } from "../actions/fetchMovies";
import { MovieContext } from "../context/MovieSearchContext";
import ImageWithFallback from "../../../components/ImageWithFallback";

const fetchCallTracker = new Map<string, boolean>();

// Helper to stringify the key
const stringifyKey = (key: Key): string => {
  if (typeof key === "string") return key;
  if (Array.isArray(key)) return JSON.stringify(key);
  return "";
};

export default function MoviesHome() {
  const [hasDoneASearch, setHasDoneASearch] = useState(false);

  const [pageIndex, setPageIndex] = useState(1);
  const { searchString } = use(MovieContext);

  const keyStr = useMemo(
    () => stringifyKey([searchString, pageIndex]),
    [searchString, pageIndex]
  );

  const { data, isLoading } = useSWR(
    searchString.trim() !== "" ? [searchString, pageIndex] : null,

    () =>
      getMovies({
        searchString: searchString,
        page: pageIndex,
      }),
    {
      dedupingInterval: 50000,
      onSuccess: () => {
        fetchCallTracker.set(keyStr, true);
      },
    }
  );

  const reducePageIndex = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  const increasePageIndex = () => {
    setPageIndex(pageIndex + 1);
  };

  useEffect(() => {
    setPageIndex(1);
  }, [searchString]);

  useEffect(() => {
    if (data) {
      setHasDoneASearch(true);
      fetchCallTracker.set(keyStr, true);
    }
  }, [keyStr, data]);

  return (
    <main className="w-full flex flex-col">
      {isLoading && (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex items-center justify-center animate-pulse">
          <p className="text-xl font-semibold tracking-wide">Loading...</p>
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.Search?.map((movie) => (
            <div
              className="max-w-xs bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg m-2"
              key={movie.imdbID}
            >
              <ImageWithFallback
                src={movie.Poster}
                alt={movie.Title}
              ></ImageWithFallback>
              <p className="text-xl font-semibold mb-2 p-2">{movie.Title}</p>
              <p className="text-gray-400 p-2">{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
      {hasDoneASearch && !isLoading && !data?.Search && pageIndex == 1 && (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex items-center justify-center">
          <p className="text-lg font-semibold text-center">
            The movie{" "}
            <span className="text-yellow-400 font-bold italic">
              {searchString}
            </span>{" "}
            you are looking for is not found,{" "}
            <span className="text-red-400">try another search...</span>
          </p>
        </div>
      )}

      {hasDoneASearch &&
        !isLoading &&
        data?.Response == "False" &&
        pageIndex > 1 && (
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex items-center justify-center">
            <p className="text-lg font-semibold text-center">
              End of the list.
            </p>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2"
              onClick={reducePageIndex}
            >
              Go back
            </button>
          </div>
        )}

      {!hasDoneASearch && (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex items-center justify-center">
          <p className="text-lg font-semibold text-center">Type and Search</p>
        </div>
      )}

      {!isLoading && data?.Search && (
        <div className="flex mt-auto items-center justify-center">
          <button
            disabled={pageIndex == 1}
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2
    ${
      pageIndex === 1
        ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-blue-700 hover:border-blue-500"
        : ""
    }
  `}
            onClick={reducePageIndex}
          >
            Previous
          </button>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2"
            onClick={increasePageIndex}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
