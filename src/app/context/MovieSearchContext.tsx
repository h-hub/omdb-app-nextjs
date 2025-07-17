import React, { useState } from "react";
import { createContext } from "react";

export const MovieContext = createContext({
  searchString: "",
  updateSearchString: (str: string) => {},
});

const MovieSearchContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [searchStr, updateSearchStr] = useState("");
  const updateSearchString = (str: string) => {
    updateSearchStr(str);
  };

  const movieCtxValue = {
    searchString: searchStr,
    updateSearchString: updateSearchString,
  };

  return (
    <MovieContext.Provider value={movieCtxValue}>
      {children}
    </MovieContext.Provider>
  );
};
export default MovieSearchContextProvider;
