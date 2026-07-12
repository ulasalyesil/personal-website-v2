/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: "/getirfinans-dark-mode",
        destination: "/getirfinans-design-system",
        permanent: true,
      },
    ];
  },
};
