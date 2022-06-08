/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOUTIQUES_API_URL: string;
  readonly VITE_BOUTIQUES_ENDPOINT: string;
  readonly VITE_GMAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
