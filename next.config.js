/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2wx6rahy8yxgr.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
