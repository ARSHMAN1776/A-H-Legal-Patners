/**
 * Tiny external store that carries the "area of law" a visitor picked in the
 * practice index over to the enquiry form, without prop drilling.
 */
let current = "";
const listeners = new Set<() => void>();

export function setMatter(slug: string) {
  if (slug === current) return;
  current = slug;
  listeners.forEach((l) => l());
}

export function subscribeMatter(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getMatter() {
  return current;
}

export function getServerMatter() {
  return "";
}
