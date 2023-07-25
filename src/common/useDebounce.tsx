import { useEffect, useState } from "react";

function useDebounce(value: unknown, when = 500) {
  const [debouncedValue, setDebouncedValue] = useState<unknown>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, when);

    return () => clearTimeout(timeout);
  }, [when, value]);

  return debouncedValue || "";
}

export { useDebounce };
