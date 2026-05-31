import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexel.com",
      },
    ],
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  org: "agilworld",
  project: "we-love-photos",

  // An auth token is required for uploading source maps.
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  telemetry: false,
  silent: false, // Can be used to suppress logs
});
