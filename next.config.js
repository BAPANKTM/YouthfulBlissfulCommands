
module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    return config;
  },
  // This ensures the dev server is accessible from outside
  webpackDevMiddleware: config => {
    return {
      ...config,
      watchOptions: {
        ...config.watchOptions,
        poll: 800,
        aggregateTimeout: 300,
      }
    };
  }
};
