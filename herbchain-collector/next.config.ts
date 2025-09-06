// next.config.ts
import { type NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",         // sw.js will be generated here
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // only enable in prod
})(nextConfig);
