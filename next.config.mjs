/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/game',
        destination: '/',
        permanent: true
      }
    ]
  }
}

export default nextConfig
