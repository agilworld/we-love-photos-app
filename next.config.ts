import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  org: "qaki5-team",
  project: "we-love-photos",

  // An auth token is required for uploading source maps.
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,

  silent: false, // Can be used to suppress logs
});
