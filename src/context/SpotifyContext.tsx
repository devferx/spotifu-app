import { createContext, useContext } from "react";

import { AuthContext } from "@/context/AuthContext";
import { useInitialData } from "@/shared/hooks/useInitialData";
import { Album, Playlist } from "@/interfaces/index";

interface SpotifyContextProps {
  newReleases: (Album | null)[];
  featuredPlaylists: (Playlist | null)[];
  userPlaylists: (Playlist | null)[];
}

export const SpotifyContext = createContext({} as SpotifyContextProps);

interface SpotifyProviderProps {
  children: React.ReactNode;
}

export function SpotifyProvider({ children }: SpotifyProviderProps) {
  const { accessToken } = useContext(AuthContext);
  const { newReleases, featuredPlaylists, userPlaylists } =
    useInitialData(accessToken);

  return (
    <SpotifyContext.Provider
      value={{
        newReleases,
        featuredPlaylists,
        userPlaylists,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
}
