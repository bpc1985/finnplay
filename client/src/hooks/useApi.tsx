import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL ?? "http://localhost:3001";

interface GetApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useGetApi<T>(url: string): GetApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/${url}`, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        fetchData();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [url]);

  return { data, loading, error };
}

interface PostApiResponse<T> {
  loading: boolean;
  error: Error | null;
  postData: (body: unknown) => Promise<T>;
}

export function usePostApi<T>(url: string): PostApiResponse<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postData = async (body: unknown) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An unknown error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, postData };
}
