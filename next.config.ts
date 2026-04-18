import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma generated client imports `@prisma/client/runtime/*`; bundlers must not try to inline it.
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
