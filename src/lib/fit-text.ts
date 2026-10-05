/** Approximate advance widths (in em) of the expanded uppercase display face. */
const WIDE = /[MW]/;
const NARROW = /[I1.,'’!:;|]/;
const MID = /[JLTFEPS\s-]/;

function emWidth(text: string): number {
  let w = 0;
  for (const ch of text.toUpperCase()) {
    if (WIDE.test(ch)) w += 1.08;
    else if (NARROW.test(ch)) w += 0.34;
    else if (MID.test(ch)) w += 0.74;
    else w += 0.84;
  }
  return Math.max(w, 1);
}

/**
 * Font-size that lets a single-line display word fill — but never overflow —
 * its container. Requires an `@container` ancestor (uses cqi units).
 * `safety` scales the estimate (1 = tight fit).
 */
export function fitText(text: string, max: string, safety = 1.04): string {
  const perEm = 100 / (emWidth(text) * safety);
  return `min(${max}, ${perEm.toFixed(2)}cqi)`;
}
