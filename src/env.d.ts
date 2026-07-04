/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />

interface Window {
  trackEvent?: (eventName: string, eventParams?: any) => void;
  dataLayer?: any[];
}
