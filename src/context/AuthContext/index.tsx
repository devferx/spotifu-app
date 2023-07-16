import { createContext, useReducer, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { AuthState, reducer } from "./reducer";
import sessionStorage from "@/shared/utils/sessionStorage";

export type RefreshData = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

interface authContextProps {
  isLogin: boolean;
  accessToken: string | undefined;
  login: (code: string) => void;
  loginWithRefreshData: (refreshData: RefreshData) => void;
}

export const AuthContext = createContext({} as authContextProps);

interface AuthProviderProps {
  children: React.ReactNode;
}

const initalAuthState: AuthState = {
  isLogin: false,
  accessToken: Cookies.get("spotify_access_token"),
  refreshToken: Cookies.get("spotify_refresh_token"),
  expiresIn: Cookies.get("spotify_expires_in"),
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

  const login = useCallback(async (code: string) => {
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
  }, []);

  const loginWithRefreshData = useCallback((refreshData: RefreshData) => {
    const { accessToken, expiresIn, refreshToken } = refreshData;

    dispatch({
      type: "LOGIN",
      payload: { accessToken, refreshToken, expiresIn: String(expiresIn) },
    });

    sessionStorage.setToken(accessToken, refreshToken, String(expiresIn));
    // Save in Cookies
    Cookies.set("spotify_access_token", accessToken);
    Cookies.set("spotify_refresh_token", refreshToken);
    Cookies.set("spotify_expires_in", String(expiresIn));
  }, []);

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
        loginWithRefreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
