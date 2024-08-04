/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2c56d7dxy8e9u.cloudfront.net',
        port: '',
      },
    ],
  },
};

export default nextConfig;
