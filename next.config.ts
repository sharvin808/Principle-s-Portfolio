import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so Azure Static Web Apps can serve the site from the `out` folder
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  allowedDevOrigins: ["192.168.20.202"],
};

export default nextConfig;
