/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '127.0.0.1'],
    unoptimized: true,
  },
  trailingSlash: false,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    PGDATABASE: process.env.PGDATABASE,
    PGHOST: process.env.PGHOST,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT,
    PGUSER: process.env.PGUSER,
  },
}

export default nextConfig