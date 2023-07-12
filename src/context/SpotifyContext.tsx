import { createContext, useContext } from "react";

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
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SpotifyContext = createContext({} as SpotifyContextProps);

interface SpotifyProviderProps {
  children: React.ReactNode;
}

export function SpotifyProvider({ children }: SpotifyProviderProps) {
  const { accessToken } = useContext(AuthContext);
  const { newReleases, featuredPlaylists, userPlaylists } =
    useInitialData(accessToken);
  const { search, searchResults, albumsResults, setSearch } =
    useSearch(accessToken);

  return (
    <SpotifyContext.Provider
      value={{
        newReleases,
        featuredPlaylists,
        userPlaylists,
        search,
        searchResults,
        albumsResults,

        setSearch,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
}
