import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    ALCHEMY_RPC_URL: process.env.ALCHEMY_RPC_URL,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_AUTH_DOMAIN: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    FIREBASE_STORAGE_BUCKET: `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app`,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
  },
};

export default nextConfig;
