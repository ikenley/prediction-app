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
  onAutoLoadFinished: () => void;
};

const defaultAuthState: AuthState = {
  hasLoaded: false,
  isLoggedIn: false,
  userId: "",
  isAuthorized: false,
  handleLogin: () => {},
  handleLogout: () => {},
  onAutoLoadFinished: () => {},
};

export const AuthContext = createContext(defaultAuthState);

export const AuthContextProvider = ({ children }: any) => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [
    loginResponse,
    setLoginResponse,
  ] = useState<GoogleLoginResponse | null>(null);

  const handleLogin = useCallback(
    (response: GoogleLoginResponse) => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `bearer ${response.tokenId}`;

      setLoginResponse(response);
    },
    [setLoginResponse]
  );

  const handleLogout = useCallback(() => {
    setLoginResponse(null);
  }, [setLoginResponse]);

  const onAutoLoadFinished = useCallback(() => {
    setHasLoaded(true);
  }, [setHasLoaded]);

  // Upon login check api authorization
  useEffect(() => {
    if (!loginResponse) {
      setIsAuthorized(false);
      return;
    }

    axios
      .get("/api/main/authorization")
      .then((res) => {
        setIsAuthorized(true);
      })
      .catch((res) => {
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
      onAutoLoadFinished,
    };
  }, [
    hasLoaded,
    loginResponse,
    isAuthorized,
    handleLogin,
    handleLogout,
    onAutoLoadFinished,
  ]);

  return (
    <AuthContext.Provider value={AuthState}>{children}</AuthContext.Provider>
  );
};
