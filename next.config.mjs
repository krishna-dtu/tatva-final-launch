/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Static export enable
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
