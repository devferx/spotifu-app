import { AuthContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

import { useContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";

export const getAlbumData = async (
  albumId: string,
  accessToken: string
): Promise<SpotifyApi.SingleAlbumResponse> => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_KEY,
    accessToken,
  });

  const resp = await spotifyApi.getAlbum(albumId);

  return resp.body;
};

export const useAlbum = (albumId: string) => {
  const { accessToken } = useContext(AuthContext);
  const albumQuery = useQuery(["album", albumId], () => {
    return getAlbumData(albumId, accessToken!);
  });

  return { albumQuery };
};
