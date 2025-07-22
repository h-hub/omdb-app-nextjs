"use client";

import { SessionProvider } from "next-auth/react";

const SessionWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
