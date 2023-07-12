import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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

  useEffect(() => {
    const accessToken = Cookies.get("spotify_access_token");
    if (!accessToken) return;

    dispatch({
      type: "LOGIN",
      payload: {
        accessToken,
        refreshToken: Cookies.get("spotify_refresh_token"),
        expiresIn: Cookies.get("spotify_expires_in"),
      },
    });
  }, []);

  const login = async (code: string) => {
    try {
      const { data } = await axios.post(`/api/auth/login`, { code });

      const { accessToken, refreshToken, expiresIn } = data;

      dispatch({
        type: "LOGIN",
        payload: { accessToken, refreshToken, expiresIn },
      });

      sessionStorage.setToken(accessToken, refreshToken, expiresIn);
      // Save in Cookies
      Cookies.set("spotify_access_token", accessToken);
      Cookies.set("spotify_refresh_token", refreshToken);
      Cookies.set("spotify_expires_in", expiresIn);

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
      const { data } = await axios.post(`/auth/refresh`, {
        refreshToken: refreshTokenParam,
      });

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
