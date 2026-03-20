/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SAM_GOV_API_KEY: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
