import { MovieContext } from "@/app/context/MovieSearchContext";
import { useRouter } from "next/navigation";
import { use, useRef } from "react";

const HomeSearchBar = () => {
  const { updateSearchString } = use(MovieContext);
  const movieSearchStringInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const submitSearch = () => {
    if (movieSearchStringInputRef.current) {
      const value = movieSearchStringInputRef.current.value;
      updateSearchString(value);
      router.push("/movies");
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl xl:max-w-xl mx-auto px-4">
      <div className="flex items-center bg-white rounded-full shadow-md px-5 py-2">
        <input
          type="text"
          placeholder="Start typing and start seaching.."
          className="w-full bg-transparent focus:outline-none text-gray-700"
          ref={movieSearchStringInputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitSearch();
            }
          }}
        />
      </div>
    </div>
  );
};

export default HomeSearchBar;
