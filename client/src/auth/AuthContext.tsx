import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { GoogleLoginResponse } from "react-google-login";

export type AuthState = {
  hasLoaded: boolean;
  isLoggedIn: boolean;
  userId: string;
  isAuthorized: boolean;
  handleLogin: (responseGoogle: any) => void;
  handleLogout: () => void;
};

const defaultAuthState: AuthState = {
  hasLoaded: false,
  isLoggedIn: false,
  userId: "",
  isAuthorized: false,
  handleLogin: () => {},
  handleLogout: () => {},
};

export const AuthContext = createContext(defaultAuthState);

export const AuthContextProvider = ({ children }: any) => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [
    loginResponse,
    setLoginResponse,
  ] = useState<GoogleLoginResponse | null>(null);

  // TODO fetch from identity provider
  // Temporarily use arbitrary cookie for userId
  // useEffect(() => {
  //   const USER_COOKIE_NAME = "tmp_user_id";
  //   let userId = Cookies.get(USER_COOKIE_NAME);

  //   if (!userId) {
  //     userId = uuidv4();
  //     Cookies.set(USER_COOKIE_NAME, userId);
  //   }

  //   // Append userId to all requests
  //   // TODO make this an Authorization token
  //   axios.defaults.headers.common["X-APP-USERID"] = userId;

  //   const state = { hasLoaded: false, userId };
  //   setState(state);
  // }, [setState]);

  const handleLogin = useCallback(
    (response: GoogleLoginResponse) => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `bearer ${response.tokenId}`;

      setHasLoaded(true);
      setLoginResponse(response);
    },
    [setHasLoaded, setLoginResponse]
  );

  const handleLogout = useCallback(() => {
    setLoginResponse(null);
  }, [setLoginResponse]);

  // Upon login check api authorization
  useEffect(() => {
    if (!loginResponse) {
      return;
    }

    axios
      .get("/api/main/authorization")
      .then((res) => {
        console.log("authorization", res);
        setIsAuthorized(true);
      })
      .catch((res) => {
        console.log("auth error", res);
        setIsAuthorized(false);
      });
  }, [loginResponse, setIsAuthorized]);

  const AuthState = useMemo(() => {
    return {
      hasLoaded,
      isLoggedIn: loginResponse !== null,
      userId: loginResponse?.googleId || "",
      isAuthorized,
      handleLogin,
      handleLogout,
    };
  }, [hasLoaded, loginResponse, handleLogin, handleLogout]);

  return (
    <AuthContext.Provider value={AuthState}>{children}</AuthContext.Provider>
  );
};
