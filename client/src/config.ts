export const config = {
  apiPrefix: process.env.REACT_APP_API_URL_PREFIX,
  authApiPrefix: process.env.REACT_APP_AUTH_API_URL_PREFIX,
  homepage: process.env.REACT_APP_HOMEPAGE || "/ai",
  version: process.env.REACT_APP_VERSION,
};

export default config;
