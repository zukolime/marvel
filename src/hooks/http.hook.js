import { useState, useCallback } from "react";

export const useHttp = () => {
  const [processing, setProcess] = useState("waiting");

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setProcess("loading");

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        setProcess("error");
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setProcess("loading");
  }, []);

  return { request, clearError, processing, setProcess };
};
