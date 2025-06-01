
const API_URL = process.env.API_KEY;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}api/:path*`,
      },
      { 
        source: "/sendemail",
        destination: `/api/emails/send`,
      },
      {
        source: "/users/:username /orders",
        destination: "/users/orders"
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // 301 redirect for SEO
      },
    ];
  },

  images: {
    domains: [process.env.IMAGE_BUCKET],
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
};

module.exports = nextConfig;
