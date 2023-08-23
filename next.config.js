const path = require("node:path")

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  basePath: "/d2c/admin",
  images: {
    domains: ["www.royalenfield.com", "replatformdev.blob.core.windows.net"],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~/styles": path.resolve(__dirname, "/styles"),
    }
    return config
  },
})
