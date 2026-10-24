/**
 * The firm's name, in one place. The logo artwork itself lives in
 * src/assets/logo-paths.ts and is generated from brand/logo.py (run `npm run brand`).
 */
export const brand = {
  /** Wordmark text. The ampersand is set in gilt italic wherever it appears. */
  mark: "A&H",
  suffix: "Legal Partners",
  /** The same name in Urdu script (a transliteration: have a native reader confirm it). */
  urdu: "اے اینڈ ایچ لیگل پارٹنرز",
} as const;

/** "A&H Legal Partners" */
export const brandFull = `${brand.mark} ${brand.suffix}`;
