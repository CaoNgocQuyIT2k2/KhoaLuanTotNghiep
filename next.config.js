const path = require('path');

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    // Thêm quy tắc xử lý các tệp asset
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    });

    return config;
  },
  images: {
    domains: [
      'i1-vnexpress.vnecdn.net',
      'res.cloudinary.com',
      'cdnphoto.dantri.com.vn',
      'nhandaoonline.vn'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/post/:article_id',
        destination: '/post/[article_id]'
      }
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/register': { page: '/register' },
      '/yourfeed': { page: '/yourfeed' },
      '/profile': { page: '/profile' },
      '/login': { page: '/login' },
      '/EditProfile': { page: '/EditProfile' },
      '/EditPassword': { page: '/EditPassword' },
      '/[article_id]': { page: '/[article_id]' },
      '/search/[slug]': { page: '/search/[slug]' },
      '/post/[slug]': { page: '/post/[slug]' },
      '/category/[categoryId]': { page: '/category/[categoryId]' },
      '/article/ArticleSaved': { page: '/article/ArticleSaved' },
      '/admin/AdminDashboard': { page: '/admin/AdminDashboard' },
    };
  },
};
