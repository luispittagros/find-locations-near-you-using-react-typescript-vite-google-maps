/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOUTIQUES_API_URL: string;
  readonly VITE_BOUTIQUES_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
