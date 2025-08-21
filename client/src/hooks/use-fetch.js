import { useEffect, useState } from "react";

export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState(); // holds the fetched data
  const [loading, setLoading] = useState(false); // true while loading
  const [error, setError] = useState(); // holds error if any

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // start loading
      try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}, ${response.status}`);
        }

        setData(responseData); // save data
        setError(); // reset error
      } catch (error) {
        setError(error); // save error
      } finally {
        setLoading(false);   // stop loading
      }
    };
    fetchData();
  }, dependencies);  // run again if url or any dependency changes

  return { data, loading, error };
};
