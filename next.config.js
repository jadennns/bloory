const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles", "sass")],
  },
  images: {
    domains: ["localhost", "bloory.netlify.app"],
  },
};

module.exports = nextConfig;
