"use client";
import { useEffect, useRef, useState } from "react";

// useState that remembers its value in localStorage (per key).
// Renders the default on the server and first paint, then restores the saved value,
// so static HTML and hydration always match. Storage failures are ignored.
export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      /* private mode or blocked storage: keep the default */
    }
    loaded.current = true;
  }, [key]);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
