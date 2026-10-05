"use client";

/**
 * Coordinates page intros with the route transition overlay: while the overlay
 * covers the screen, intro timelines wait for the reveal instead of playing unseen.
 */
const EVENT = "blackline:page-ready";

export function setCovering(covering: boolean) {
  if (covering) document.documentElement.dataset.covering = "";
  else {
    delete document.documentElement.dataset.covering;
    window.dispatchEvent(new Event(EVENT));
  }
}

export function onPageReady(cb: () => void): () => void {
  if (!("covering" in document.documentElement.dataset)) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(EVENT, handler, { once: true });
  return () => window.removeEventListener(EVENT, handler);
}
