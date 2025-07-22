// app/ClientLayout.tsx
"use client";

import MovieSearchContextProvider from "@/app/context/MovieSearchContext";

interface ClientLayoutProps extends React.PropsWithChildren {
  className?: string;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children, className }) => {
  return (
    <MovieSearchContextProvider>
      <div className={className}>{children}</div>
    </MovieSearchContextProvider>
  );
};

export default ClientLayout;
