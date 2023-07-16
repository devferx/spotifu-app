/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "i.scdn.co",
      "mosaic.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "i.scdn.co/image",
    ],
  },
};

module.exports = nextConfig;
