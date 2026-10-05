"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog behaviour: focus moves in on open, Tab is trapped,
 * Escape closes, page scroll is locked, and focus returns to the opener.
 */
/** `include` adds outside elements (e.g. a header close button) to the focus loop. */
export function useDialog<T extends HTMLElement>(open: boolean, onClose: () => void, include?: string) {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const node = ref.current;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prev = { overflow: document.body.style.overflow, pad: document.body.style.paddingRight };
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;

    const focusFirst = window.setTimeout(() => {
      const target =
        node?.querySelector<HTMLElement>("[data-autofocus]") ?? node?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    }, 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const extra = include ? Array.from(document.querySelectorAll<HTMLElement>(include)) : [];
      const items = [...extra, ...Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE))].filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev.overflow;
      document.body.style.paddingRight = prev.pad;
      opener?.focus?.({ preventScroll: true });
    };
  }, [open, include]);

  return ref;
}
