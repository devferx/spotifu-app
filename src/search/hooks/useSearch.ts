import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_KEY,
});

export const useSearch = (accessToken: string | undefined) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);
  const [albumsResults, setAlbumsResults] = useState<
    SpotifyApi.AlbumObjectSimplified[]
  >([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return;
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      const searchItems = res.body.tracks?.items ?? [];

      setSearchResults(searchItems);
    });

    spotifyApi.searchAlbums(search).then((res) => {
      const albumsItems = res.body.albums?.items ?? [];

      setAlbumsResults(albumsItems);
    });
  }, [search, accessToken]);

  return { search, searchResults, albumsResults, setSearch };
};
