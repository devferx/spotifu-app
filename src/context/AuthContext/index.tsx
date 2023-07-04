import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

import { AuthState, reducer } from "./reducer";
import sessionStorage from "@/shared/utils/sessionStorage";

interface authContextProps {
  isLogin: boolean;
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

  const loginSessionStorage = () => {
    const tokenInfo = sessionStorage.getToken();
    if (!tokenInfo) return;

    const now = new Date();
    const difference =
      (now.getTime() - new Date(tokenInfo.date).getTime()) / 1000;

    if (difference < tokenInfo.expiresIn) {
      const { accessToken, refreshToken, expiresIn } = tokenInfo;
      dispatch({
        type: "LOGIN",
        payload: {
          accessToken,
          refreshToken,
          expiresIn: (expiresIn - difference).toString(),
        },
      });
    }

    if (difference > tokenInfo.expiresIn) {
      refreshAcessToken(tokenInfo.refreshToken);
    }
  };

  const refreshAcessToken = async (refreshTokenParam: string) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
        {
          refreshToken: refreshTokenParam,
        }
      );

      const { accessToken, expiresIn } = data;
      dispatch({
        type: "REFRESH_TOKEN",
        payload: { accessToken, expiresIn },
      });
    } catch (error) {
      window.location.assign("/login");
    }
  };

  useEffect(() => {
    loginSessionStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      refreshAcessToken(refreshToken);
    }, (Number(expiresIn) - 60) * 1000);

    return () => clearTimeout(interval);
  }, [refreshToken, expiresIn]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        accessToken,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
