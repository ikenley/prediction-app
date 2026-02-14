import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from "react";
import axios from "axios";
import config from "../config";
import useInterval from "../hooks/useInterval";
import User from "./User";
import redirectToLogin from "./redirectToLogin";

const REFRESH_TOKEN_TIMEOUT = 1740000; // 29 minutes

export type AuthState = {
  hasLoaded: boolean;
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  isAuthorized: boolean;
  user: User | null;
  userId: string;
  login: () => void;
  logout: () => void;
};

const defaultAuthState: AuthState = {
  hasLoaded: false,
  isLoggedIn: false,
  isAuthenticated: false,
  isAuthorized: false,
  user: null,
  userId: "",
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(defaultAuthState);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  /** Refresh the auth token from auth-service */
  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post(
        `${config.authApiPrefix}/refresh`,
        {},
        {
          withCredentials: true,
          transformRequest: (data: any, headers: any) => {
            delete headers["Authorization"];
            return data;
          },
        }
      );
      const idToken = response.data as string;

      // Set authorization header for all future requests
      axios.defaults.headers.common["Authorization"] = `bearer ${idToken}`;

      const newUser = User.fromIdToken(idToken);
      setUser(newUser);
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // On mount, attempt to refresh token
  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  // Refresh token at regular interval
  useInterval(refreshToken, REFRESH_TOKEN_TIMEOUT);

  // Set up 401 interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          redirectToLogin();
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = useCallback(() => {
    redirectToLogin();
  }, []);

  const logout = useCallback(() => {
    global.location.href = `${config.authApiPrefix}/logout`;
  }, []);

  const authValue = useMemo(() => {
    return {
      hasLoaded: !isLoading,
      isLoggedIn: isAuthenticated,
      isAuthenticated,
      isAuthorized: isAuthenticated,
      user,
      userId: user?.id || "",
      login,
      logout,
    };
  }, [isLoading, isAuthenticated, user, login, logout]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
