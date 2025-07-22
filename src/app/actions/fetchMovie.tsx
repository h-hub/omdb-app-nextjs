"use server";

import redis from "../../../lib/redis"; // Adjust path as needed
import { cache } from "react";
import { MovieDetails } from "../../../models/Movie";

const API = "http://www.omdbapi.com/";
const APIKEY = process.env.OMDB_API_KEY;

export const getMovie = cache(async (imdbID: string): Promise<MovieDetails> => {
  const cacheKey = `movie:${imdbID}`;

  // Try to get cached data
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("Serving from cache");
    return JSON.parse(cached);
  }

  // If not cached, fetch from API
  const queryParams = new URLSearchParams();
  queryParams.append("i", imdbID);
  if (APIKEY) {
    queryParams.append("apiKey", APIKEY);
  }

  const url = `${API}?${queryParams.toString()}`;
  console.log("Fetching from OMDb:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
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

    await redis.set(cacheKey, JSON.stringify(data), "EX", 60 * 60 * 24 * 365);

    return data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
});
