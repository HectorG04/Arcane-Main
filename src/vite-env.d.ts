// FIX: Removed the triple-slash directive which was causing a type resolution error.
// By defining the interfaces directly, we provide the necessary types for `import.meta.env`
// without relying on the `vite/client` types that could not be found in the environment.

interface ImportMetaEnv {
  readonly VITE_FIREBASE_CONFIG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
