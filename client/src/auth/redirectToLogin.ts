import config from "../config";

/** Redirect to login page */
export const redirectToLogin = () => {
  const returnUrl = encodeURI(global.location.toString());
  const loginUrl = `${config.authApiPrefix}/login?r=${returnUrl}`;
  global.location.href = loginUrl;
};

export default redirectToLogin;
