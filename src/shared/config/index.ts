/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const config = {
  GOOGLE_MAP_API_KEY: process.env.VITE_APP_GOOGLE_MAP_API_KEY ?? import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY,
  GOOGLE_MAP_ID: process.env.VITE_APP_GOOGLE_MAP_ID ?? import.meta.env.VITE_APP_GOOGLE_MAP_ID,
  BASE_URL_API: process.env.VITE_APP_BASE_URL_API ?? import.meta.env.VITE_APP_BASE_URL_API,
  BASE_IMAGE_URL: process.env.VITE_APP_BASE_IMAGE_URL ?? import.meta.env.VITE_APP_BASE_IMAGE_URL
} as const
