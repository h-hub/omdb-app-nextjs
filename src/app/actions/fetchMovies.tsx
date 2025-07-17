"use server";

const API = "http://www.omdbapi.com/";
const APIKEY = process.env.OMDB_API_KEY;
import { cache } from "react";
import { MovieSearchResponse } from "../../../models/Movie";

enum Type {
  movie,
  series,
  episode,
}

type MovieSearchParams = {
  searchString: string;
  type?: Type;
  year?: string;
  page?: number;
};

export const getMovies = cache(
  async (options: MovieSearchParams): Promise<MovieSearchResponse> => {
    const paramsMap = new Map<string, string>([
      ["searchString", "s"],
      ["movie", "type"],
      ["year", "y"],
      ["page", "page"],
    ]);

    const baseUrl = API; // Replace with your actual API base URL
    const queryParams = new URLSearchParams();

    // Iterate over the options object and add non-undefined values to query parameters
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        const value = options[key as keyof MovieSearchParams];
        if (value !== undefined && value !== null) {
          // Handle array parameters if any (e.g., if 'actors' could be an array)
          if (Array.isArray(value)) {
            value.forEach((item) => queryParams.append(key, String(item)));
          } else {
            const paramName = paramsMap.get(key);
            if (paramName !== undefined) {
              queryParams.append(paramName, String(value));
            }
          }
        }
      }
    }

    queryParams.append("apiKey", APIKEY);
    // Construct the full URL with query parameters
    const url = `${baseUrl}?${queryParams.toString()}`;
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "GET", // Or 'POST' if your API requires it for filtering
      });

      if (!response.ok) {
        // Handle HTTP errors (e.g., 404, 500)
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        throw new Error(
          `API error: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      // Re-throw or return a structured error response
      throw error; // Or return { data: [], totalResults: 0, page: 1, totalPages: 0, message: `Failed to fetch movies: ${error.message}` };
    }
  }
);
