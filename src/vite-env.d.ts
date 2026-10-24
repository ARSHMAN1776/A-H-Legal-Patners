/// <reference types="vite/client" />

interface Window {
  /** Set once the animation layer has mounted; read by the fail-safe in index.html. */
  __slfReady?: boolean;
}
