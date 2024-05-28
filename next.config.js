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
    domains: ['i1-vnexpress.vnecdn.net'],
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
};
