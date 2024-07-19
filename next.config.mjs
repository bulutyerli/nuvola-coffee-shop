/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nuvola-coffee-shop-products.s3.eu-central-1.amazonaws.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
