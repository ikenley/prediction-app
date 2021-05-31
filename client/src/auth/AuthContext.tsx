import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export type AuthState = {
  isLoading: boolean;
  userId: string;
};

const defaultAuthState: AuthState = {
  isLoading: true,
  userId: "",
};

export const AuthContext = createContext(defaultAuthState);

export const AuthContextProvider = ({ children }: any) => {
  const [authState, setState] = useState<AuthState>(defaultAuthState);

  // TODO fetch from identity provider
  // Temporarily use arbitrary cookie for userId
  useEffect(() => {
    const USER_COOKIE_NAME = "tmp_user_id";
    let userId = Cookies.get(USER_COOKIE_NAME);

    if (!userId) {
      userId = uuidv4();
      Cookies.set(USER_COOKIE_NAME, userId);
    }

    // Append userId to all requests
    // TODO make this an Authorization token
    axios.defaults.headers.common["X-APP-USERID"] = userId;

    const state = { isLoading: false, userId };
    setState(state);
  }, [setState]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
