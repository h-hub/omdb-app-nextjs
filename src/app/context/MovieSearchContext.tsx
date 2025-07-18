import React, { useState } from "react";
import { createContext } from "react";

interface MovieContextType {
  searchString: string;
  updateSearchString: (str: string) => void;
}

export const MovieContext = createContext<MovieContextType>({
  searchString: "",
  updateSearchString: () => {}, // no-op function
});

const MovieSearchContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchStr, updateSearchStr] = useState("");
  const updateSearchStrx = (str: string) => {
    updateSearchStr(str);
  };

  const movieCtxValue = {
    searchString: searchStr,
    updateSearchString: updateSearchStrx,
  };

  return (
    <MovieContext.Provider value={movieCtxValue}>
      {children}
    </MovieContext.Provider>
  );
};
export default MovieSearchContextProvider;
