"use server";

const API = "http://www.omdbapi.com/";
const APIKEY = process.env.OMDB_API_KEY;
import { cache } from "react";
import { MovieDetails } from "../../../models/Movie";

export const getMovie = cache(async (imdbID: string): Promise<MovieDetails> => {
  const baseUrl = API; // Replace with your actual API base URL
  const queryParams = new URLSearchParams();
  queryParams.append("i", imdbID);
  if (APIKEY) {
    queryParams.append("apiKey", APIKEY);
  }
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
});
