import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Required for static export to GitHub Pages
  basePath: "/toronto-rental-buildings-explorer",
  assetPrefix: "/toronto-rental-buildings-explorer",
};

export default nextConfig;
