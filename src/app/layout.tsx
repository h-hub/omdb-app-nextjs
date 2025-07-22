import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../../components/ClientLayout";
import NavBar from "../../components/NavBar";
import { Poppins } from "next/font/google";
import { SidebarProvider } from "./context/SidebarContext";
import Sidebar from "../../components/Sidebar";
import { Session } from "next-auth";
import SessionWrapper from "../../components/SessionWrapper";
import Image from "next/image";
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
        <Image
          src={"/images/banner_4.jpg"}
          alt={"Movie Journal"}
          className="absolute inset-0 w-full h-full object-cover blur-sm rounded-xl z-0 opacity-60"
          fill
        ></Image>
        <ClientLayout className="relative z-10 flex flex-col flex-grow">
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

        <footer className="w-full bg-slate-950 text-center py-4 border z-10">
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
          <p className="text-gray-200 text-sm flex items-center justify-center gap-1">
            Cover photo by{" "}
            <a href="https://unsplash.com/@brdnkvision?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Dmitry Berdnyk
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/photos/a-woman-in-a-black-dress-carrying-a-suitcase-RJG7MMrlxqY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Unsplash
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
