// app/ClientLayout.tsx
"use client";

import MovieSearchContextProvider from "@/app/context/MovieSearchContext";

const ClientLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <MovieSearchContextProvider>{children}</MovieSearchContextProvider>;
};

export default ClientLayout;
