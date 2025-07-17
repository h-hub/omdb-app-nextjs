export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type MovieSearchResponse = {
  Search: Movie[];
  totalResults: string;
  Response: string;
};
