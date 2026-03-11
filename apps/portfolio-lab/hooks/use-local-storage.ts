"use client";

import { useMemo, useSyncExternalStore } from "react";

type SetValueAction<T> = T | ((currentValue: T) => T);

const LOCAL_STORAGE_EVENT = "idea-lab-storage";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => onStoreChange();

  window.addEventListener("storage", handleChange);
  window.addEventListener(LOCAL_STORAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(LOCAL_STORAGE_EVENT, handleChange);
  };
}

export function useLocalStorage<T>(
  storageKey: string,
  parseValue: (rawValue: string | null) => T,
  serializeValue: (value: T) => string,
  initialValue: T,
) {
  const rawSnapshot = useSyncExternalStore(
    subscribe,
    () => {
      if (typeof window === "undefined") {
        return null;
      }

      return window.localStorage.getItem(storageKey);
    },
    () => null,
  );

  const value = useMemo(() => parseValue(rawSnapshot), [parseValue, rawSnapshot]);
  const isLoaded = typeof window !== "undefined";

  function setValue(nextValue: SetValueAction<T>) {
    const currentValue = parseValue(
      typeof window === "undefined" ? null : window.localStorage.getItem(storageKey),
    );
    const resolvedValue =
      typeof nextValue === "function"
        ? (nextValue as (currentValue: T) => T)(currentValue)
        : nextValue;

    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, serializeValue(resolvedValue));
      window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
    }
  }

  function clearValue() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
      window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
    }
  }

  return {
    value: rawSnapshot === null ? initialValue : value,
    setValue,
    clearValue,
    isLoaded,
  };
}
