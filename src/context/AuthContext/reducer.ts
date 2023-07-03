export interface AuthState {
  isLogin: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expiresIn: string | undefined;
}

type LoginAction = {
  type: "LOGIN";
  payload: Pick<AuthState, "accessToken" | "refreshToken" | "expiresIn">;
};

type RefreshTokenAction = {
  type: "REFRESH_TOKEN";
  payload: Pick<AuthState, "accessToken" | "expiresIn">;
};

type AuthAction = LoginAction | RefreshTokenAction;

export function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        expiresIn: action.payload.expiresIn,
      };

    case "REFRESH_TOKEN":
      return {
        ...state,
        isLogin: true,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
      };

    default:
      return {
        ...state,
      };
  }
}
