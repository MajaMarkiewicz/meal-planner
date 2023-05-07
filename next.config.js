/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
  typescript: {
    ignoreBuildErrors: true, // @TODO fix ts error and delete ignoreBuildErrors
  }
}

module.exports = nextConfig
