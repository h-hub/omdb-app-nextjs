import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../../components/ClientLayout";
import NavBar from "../../components/NavBar";
import { Poppins } from "next/font/google";
import { SidebarProvider } from "./context/SidebarContext";
import Sidebar from "../../components/Sidebar";
import { Session } from "next-auth";
import SessionWrapper from "../../components/SessionWrapper";

// You can customize the weight and subset as needed
const poppins = Poppins({
  weight: ["400", "600"], // Regular and semi-bold
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "OMDB Movie Journal",
  description: "Movie Journal App Build with Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
}>) {
  return (
    <html
      lang="en"
      className={`h-screen w-full bg-gradient-to-r from-black to-gray-900 ${poppins.className}`}
    >
      <body className="min-h-screen flex flex-col">
        <ClientLayout>
          <SessionWrapper>
            <SidebarProvider>
              <NavBar />
              <main className="flex-grow mt-15 w-full max-w-screen-xl mx-auto">
                {children}
              </main>

              <Sidebar />
            </SidebarProvider>
          </SessionWrapper>
        </ClientLayout>

        <footer className="w-full bg-blue-950 text-center py-4 border border-red-500">
          <p className="text-gray-200 text-sm flex items-center justify-center gap-1">
            Made by{" "}
            <a
              href="https://www.harshajayamanna.com/"
              className="text-blue-500 hover:text-blue-700 underline hover:underline-offset-2 transition duration-200"
              target="_blank"
            >
              Harsha
            </a>
            . A React learner <span className="text-red-500">❤️</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
