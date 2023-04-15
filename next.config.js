/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// Below code cited from https://nsikakimoh.com/blog/resolve-the-module-not-found-error-nextjs-webpack
// had error: error - ./node_modules/next/dist/compiled/@vercel/og/index.node.js:17950:0
                    // Module not found: Can't resolve 'fs'
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      }
    }

    return config;
  }
}

