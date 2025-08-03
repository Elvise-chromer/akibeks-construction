/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_COMPANY_NAME: string
  readonly VITE_COMPANY_EMAIL: string
  readonly VITE_COMPANY_PHONE: string
  readonly VITE_COMPANY_ADDRESS: string
  readonly VITE_ENABLE_DEVTOOLS: string
  readonly VITE_DISABLE_RIGHT_CLICK: string
  readonly VITE_GOOGLE_ANALYTICS_ID: string
  readonly VITE_FACEBOOK_PIXEL_ID: string
  readonly VITE_ENABLE_PWA: string
  readonly VITE_ENABLE_OFFLINE_MODE: string
  readonly VITE_ENABLE_PUSH_NOTIFICATIONS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}