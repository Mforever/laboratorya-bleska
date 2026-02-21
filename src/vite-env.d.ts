// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_BOT_TOKEN: string
  readonly VITE_TELEGRAM_CHAT_ID: string
  readonly VITE_RECAPTCHA_SITE_KEY: string
  readonly VITE_TELEGRAM_LOG_CHAT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}