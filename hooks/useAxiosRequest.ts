import { useState, useEffect } from "react";

export function useAxiosRequest<F extends (...inputArgs: any) => Promise<any>>(
  func: F
) {
  const [result, setResult] = useState<Awaited<ReturnType<F>>>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  return [
    result,
    (...args: [...Parameters<F>]) => {
      setIsLoading(true);
      setError(undefined);
      func(...args)
        .then((res) => {
          setIsLoading(false);
          setResult(res);
        })
        .catch((err: any) => {
          setIsLoading(false);
          console.error({ err });
          setError(err);
        });
    },
    isLoading,
    error,
  ] as const;
}
