import useSWR, { Key, SWRConfiguration } from "swr";
import { useRef, useEffect, useMemo } from "react";

interface UseTrackedSWROptions extends SWRConfiguration {
  dedupingInterval?: number;
}

// Track fetches globally by key
const fetchCallTracker = new Map<string, boolean>();

// Helper to stringify the key
const stringifyKey = (key: Key): string => {
  if (typeof key === "string") return key;
  if (Array.isArray(key)) return JSON.stringify(key);
  return "";
};

const useTrackedSWR = (
  key: Key,
  fetcher: () => Promise<any>,
  options?: UseTrackedSWROptions
) => {
  const keyStr = useMemo(() => stringifyKey(key), [key]);
  const fetchCalledRef = useRef(false);

  const trackedFetcher = async () => {
    fetchCallTracker.set(keyStr, true);
    fetchCalledRef.current = true;
    return fetcher();
  };

  const swr = useSWR(key, trackedFetcher, {
    dedupingInterval: 2000,
    ...options,
  });

  // Restore the state from global tracker (in case of deduped fetch)
  useEffect(() => {
    fetchCalledRef.current = fetchCallTracker.get(keyStr) ?? false;
  }, [keyStr]);

  return { ...swr, fetchCalledRef };
};

export default useTrackedSWR;
