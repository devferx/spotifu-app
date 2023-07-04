import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

import { AuthState, reducer } from "./reducer";
import sessionStorage from "@/shared/utils/sessionStorage";

interface authContextProps {
  accessToken: string | undefined;
  login: (code: string) => void;
}

export const AuthContext = createContext({} as authContextProps);

interface AuthProviderProps {
  children: React.ReactNode;
}

const initalAuthState: AuthState = {
  isLogin: false,
  accessToken: undefined,
  refreshToken: undefined,
  expiresIn: undefined,
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [{ isLogin, accessToken, refreshToken, expiresIn }, dispatch] =
    useReducer(reducer, initalAuthState);

  const onLogin = ({
    accessToken,
    refreshToken,
    expiresIn,
  }: Pick<AuthState, "accessToken" | "refreshToken" | "expiresIn">) => {
    dispatch({
      type: "LOGIN",
      payload: { accessToken, refreshToken, expiresIn },
    });
  };

  const onRefreshToken = ({
    accessToken,
    expiresIn,
  }: Pick<AuthState, "accessToken" | "expiresIn">) => {
    dispatch({
      type: "REFRESH_TOKEN",
      payload: { accessToken, expiresIn },
    });
  };

  const login = async (code: string) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        { code }
      );

      const { accessToken, refreshToken, expiresIn } = data;

      dispatch({
        type: "LOGIN",
        payload: { accessToken, refreshToken, expiresIn },
      });

      sessionStorage.setToken(accessToken, refreshToken, expiresIn);
      window.history.pushState({}, "", "/");
    } catch (error) {
      console.log(error);
      window.location.assign("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
