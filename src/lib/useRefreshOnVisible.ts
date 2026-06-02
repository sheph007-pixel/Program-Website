"use client";

import { useEffect, useRef } from "react";

/**
 * Re-runs `callback` whenever the page becomes visible again — i.e. when the
 * user switches back to the tab, reopens the browser, or restores the page
 * from the mobile back/forward (bfcache) cache.
 *
 * This means a phone that's left open or backgrounded will pull the latest
 * data (plans, metrics, notes, etc.) the moment it's brought to the front,
 * so the user never has to manually hit refresh to see updates made elsewhere.
 */
export function useRefreshOnVisible(callback: () => void) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    const run = () => cbRef.current();

    const onVisibility = () => {
      if (document.visibilityState === "visible") run();
    };

    // pageshow fires on initial load and on bfcache restore (persisted=true).
    // Only refresh on the restore case — the initial fetch is handled on mount.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) run();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", run);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", run);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);
}
