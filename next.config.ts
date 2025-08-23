import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Required for static export to GitHub Pages
  basePath: isProd ? "/toronto-rental-buildings-explorer" : "",
  assetPrefix: isProd ? "/toronto-rental-buildings-explorer" : "",
};

export default nextConfig;
