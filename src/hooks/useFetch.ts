import { useEffect, useState } from "react";

export default function useFetch() {
  const [req, setReq] = useState<{
    input: RequestInfo | URL;
    init?: RequestInit | undefined;
  }>({ input: "", init: {} });
  const [data, setData] = useState<unknown>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | unknown>(false);

  async function fn() {
    setIsLoading(true);
    const { input, init } = req;
    try {
      console.log("fetching");
      const res = await fetch(input, init);
      const response = await res.json();
      setData(response);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setIsError(e);
    }
  }
  useEffect(() => {
    if (req) fn();
  }, [req]);

  return { setReq, isLoading, isError, setIsError, data };
}
