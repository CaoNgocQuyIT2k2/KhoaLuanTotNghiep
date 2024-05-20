// next.config.js

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  images: {
    domains: ['i1-vnexpress.vnecdn.net'],
  },
  async rewrites() {
    return [
      // Rewrite the route for /post/:article_id to /post/[article_id]
      {
        source: '/post/:article_id',
        destination: '/post/[article_id]'
      }
    ]
  }
}
