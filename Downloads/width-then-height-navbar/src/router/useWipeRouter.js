
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tiny History-API router (no external deps).
 */
export function useWipeRouter() {
  const [path, setPath] = useState(() => window.location.pathname || "/");
  const pathRef = useRef(path);
  useEffect(() => {
    pathRef.current = path;
  }, [path]);

  const navigate = useCallback(
    (nextPath) => {
      if (!nextPath) return;
      const current = window.location.pathname || "/";
      if (nextPath === current) return;
      window.history.pushState({}, "", nextPath);
      setPath(nextPath);
    },
    []
  );

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return { path, navigate };
}

