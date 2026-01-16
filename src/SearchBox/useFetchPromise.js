import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

const useFetchPromise = (
  query,
  transformData,
  dataPromise,
  debounceWait,
  autoComplete
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = useCallback(
    debounce(async (query, signal) => {
      try {
        const response = await dataPromise(query, signal);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setData(transformData(data));
      } catch (err) {
        if (!signal.aborted) setError(err);
      }
    }, debounceWait),
    [query]
  );

  useEffect(() => {
    if (!query || !autoComplete) {
      setData(null);
      setError(null);
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    fetchData(query, signal);
    return () => {
      controller.abort();
    };
  }, [query, autoComplete]);

  return [data, setData, error];
};

export default useFetchPromise;
