import { createContext, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";

import { AuthContext } from "@/context/AuthContext";
import { useInitialData } from "@/shared/hooks/useInitialData";
import { Album, Playlist } from "@/interfaces/index";
import { useRouter } from "next/router";

interface SpotifyContextProps {
  newReleases: (Album | null)[];
  featuredPlaylists: (Playlist | null)[];
  userPlaylists: (Playlist | null)[];
  getPlaylist: (
    playlistId: string
  ) => Promise<SpotifyApi.SinglePlaylistResponse | undefined>;
}

export const SpotifyContext = createContext({} as SpotifyContextProps);

interface SpotifyProviderProps {
  children: React.ReactNode;
}

export function SpotifyProvider({ children }: SpotifyProviderProps) {
  const router = useRouter();

  const { accessToken } = useContext(AuthContext);
  const { newReleases, featuredPlaylists, userPlaylists } =
    useInitialData(accessToken);

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_KEY,
    accessToken,
  });

  const getPlaylist = async (playlistId: string) => {
    try {
      const resp = await spotifyApi.getPlaylist(playlistId);
      return resp.body;
    } catch (error) {
      router.push("/");
    }
  };

  return (
    <SpotifyContext.Provider
      value={{
        newReleases,
        featuredPlaylists,
        userPlaylists,
        getPlaylist,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
}
