/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "https://localhost:3001/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
