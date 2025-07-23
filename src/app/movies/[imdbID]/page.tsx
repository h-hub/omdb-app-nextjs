"use client";
import { getMovie } from "@/app/actions/fetchMovie";
import { fetchJournalEntry } from "@/app/actions/fetchJournalEntry";
import useSWR from "swr";
import ImageWithFallback from "../../../../components/ImageWithFallback";
import { useParams } from "next/navigation";
import Link from "next/link";
import TextInputEditor from "../../../../components/TextInputEditor";
import { Editor } from "@tiptap/react";
import { useSession } from "next-auth/react";
import { storeJournal } from "@/app/actions/storeJournalEntry";
import { useState, useEffect } from "react";

export default function Movie() {
  const params = useParams();
  const imdbID = typeof params?.imdbID === "string" ? params.imdbID : "";
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<
    "True" | "False" | "Error" | null
  >(null);
  const [journalContent, setJournalContent] = useState<string>("");

  const { data, isLoading } = useSWR(
    imdbID.trim() !== "" ? imdbID : null,
    () => getMovie(imdbID),
    {
      dedupingInterval: 50000,
    }
  );

  const { data: existingJournal } = useSWR(
    status === "authenticated" && userEmail && imdbID
      ? [userEmail, imdbID]
      : null,
    ([userId, movieId]) => fetchJournalEntry(userId, movieId),
    {
      dedupingInterval: 30000,
    }
  );

  useEffect(() => {
    if (existingJournal?.htmlDescription) {
      setJournalContent(existingJournal.htmlDescription);
    } else {
      const localContent = localStorage.getItem(imdbID) || "";
      setJournalContent(localContent);
    }
  }, [existingJournal, imdbID]);

  const onUpdate = (props: { editor: Editor }) => {
    const html = props.editor.getHTML();
    localStorage.setItem(imdbID, html);
  };

  const saveJournalEntry = async (editor: Editor) => {
    if (status == "authenticated" && editor && userEmail) {
      try {
        setIsSaving(true);
        setSaveSuccess(null);

        const html = editor.getHTML();
        await storeJournal({
          userId: userEmail,
          imdbID: imdbID,
          htmlDescription: html,
        });

        setIsSaving(false);
        setSaveSuccess("True");

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(null);
        }, 3000);

        console.log("done");
      } catch (error) {
        setIsSaving(false);
        setSaveSuccess("Error");

        // Hide error message after 5 seconds
        setTimeout(() => {
          setSaveSuccess(null);
        }, 5000);

        console.error("Failed to save journal:", error);
      }
    }
  };

  return (
    <main className="w-full flex flex-col">
      {isLoading && (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex items-center justify-center animate-pulse">
          <p className="text-xl font-semibold tracking-wide">Loading...</p>
        </div>
      )}

      {data && data.Response == "False" && (
        <div className="bg-gray-900 text-red p-6 rounded-lg shadow-lg flex items-center justify-center">
          <p className="text-lg font-semibold text-center text-red-500">
            Invalid Movie was Selected
          </p>
          <Link
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2"
            href="/movies"
          >
            Go back
          </Link>
        </div>
      )}

      {data && data.Response == "True" && (
        <>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-900 text-white shadow-lg flex flex-col md:flex-row gap-4">
              <div className="p-5 w-full md:w-1/3 min-w-0">
                <ImageWithFallback
                  src={data.Poster}
                  alt={data.Title}
                ></ImageWithFallback>
              </div>
              <div className="p-5 w-full md:w-2/3 overflow-auto max-h-[80vh]">
                <div className="flex justify-end mb-3">
                  <span className="text-sm bg-blue-700 px-3 py-1 rounded-full self-start mt-2 md:mt-0">
                    {data?.Rated} • {data?.Runtime}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between">
                  <h2 className="text-2xl font-bold">
                    {data?.Title} ({data?.Year})
                  </h2>
                </div>

                <p className="text-gray-300 whitespace-pre-wrap break-words my-4">
                  {data?.Plot}
                </p>

                <div className="text-sm text-gray-400 my-2">
                  <p>
                    <strong>Genre:</strong> {data?.Genre}
                  </p>
                  <p>
                    <strong>Director:</strong> {data?.Director}
                  </p>
                  <p>
                    <strong>Writer:</strong> {data?.Writer}
                  </p>
                  <p>
                    <strong>Actors:</strong> {data?.Actors}
                  </p>
                  <p>
                    <strong>Language:</strong> {data?.Language}
                  </p>
                  <p>
                    <strong>Country:</strong> {data?.Country}
                  </p>
                  <p>
                    <strong>Awards:</strong> {data?.Awards}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="bg-gray-800 px-4 py-2 rounded">
                    <span className="text-yellow-400 font-semibold">IMDb:</span>{" "}
                    {data?.imdbRating}
                  </div>
                  <div className="bg-gray-800 px-4 py-2 rounded">
                    <span className="text-purple-400 font-semibold">
                      Metascore:
                    </span>{" "}
                    {data?.Metascore}
                  </div>
                  {data?.Ratings?.map((rating, idx) => (
                    <div key={idx} className="bg-gray-800 px-4 py-2 rounded">
                      <span className="text-green-400 font-semibold">
                        {rating.Source}:
                      </span>{" "}
                      {rating.Value}
                    </div>
                  ))}
                </div>
                {data?.Website !== "N/A" && (
                  <a
                    href={data?.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline text-sm"
                  >
                    Visit Official Website
                  </a>
                )}
              </div>
            </div>

            {/* Full-width third column */}
            <div className="p-4 w-full space-y-2 border border-gray-300 bg-gray-200 shadow-sm focus-within:ring-2 text-indigo-950 relative">
              <TextInputEditor
                initContent={journalContent}
                onUpdate={onUpdate}
                saveJournal={saveJournalEntry}
                isSaveBtn={status === "authenticated"}
              />

              {(isSaving || saveSuccess) && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
                  {isSaving && (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      <span className="text-sm text-blue-600 font-medium">
                        Saving...
                      </span>
                    </>
                  )}
                  {saveSuccess === "True" && (
                    <>
                      <div className="h-4 w-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-green-600 font-medium">
                        Saved!
                      </span>
                    </>
                  )}
                  {saveSuccess === "Error" && (
                    <>
                      <div className="h-4 w-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-red-600 font-medium">
                        Save Failed!
                      </span>
                    </>
                  )}
                  {saveSuccess === "False" && (
                    <>
                      <div className="h-4 w-4 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-yellow-600 font-medium">
                        Not Authenticated!
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
