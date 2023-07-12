import { createContext, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useRouter } from "next/router";

import { AuthContext } from "@/context/AuthContext";

import { useSearch } from "@/search/hooks/useSearch";
import { useInitialData } from "@/shared/hooks/useInitialData";

import { Album, Playlist } from "@/interfaces/index";

interface SpotifyContextProps {
  newReleases: (Album | null)[];
  featuredPlaylists: (Playlist | null)[];
  userPlaylists: (Playlist | null)[];
  searchResults: SpotifyApi.TrackObjectFull[];
  albumsResults: SpotifyApi.AlbumObjectSimplified[];
  search: string;

  getPlaylist: (
    playlistId: string
  ) => Promise<SpotifyApi.SinglePlaylistResponse | undefined>;
  getAlbumInfo: (albumId: string) => Promise<SpotifyApi.SingleAlbumResponse>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
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
  const { search, searchResults, albumsResults, setSearch } =
    useSearch(accessToken);

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

  const getAlbumInfo = async (albumId: string) => {
    const resp = await spotifyApi.getAlbum(albumId);
    return resp.body;
  };

  return (
    <SpotifyContext.Provider
      value={{
        newReleases,
        featuredPlaylists,
        userPlaylists,
        search,
        searchResults,
        albumsResults,
        getPlaylist,
        getAlbumInfo,
        setSearch,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
}
