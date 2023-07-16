/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "i.scdn.co",
      "mosaic.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "i.scdn.co/image",
      "images-ak.spotifycdn.com",
    ],
  },
};

module.exports = nextConfig;
