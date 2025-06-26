/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['storage.googleapis.com'],
  },
  env: {
    PROJECT_ID: 'coproto-gcp',
    GCS_BUCKET: 'coproto-gcp-pixelforge-shares',
  },
}

module.exports = nextConfig