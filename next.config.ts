import { current } from "@reduxjs/toolkit";

const API_URL = process.env.LOCAL_KEY;

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
        destination: "/api/emails/send"
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
  },
};

module.exports = nextConfig;

