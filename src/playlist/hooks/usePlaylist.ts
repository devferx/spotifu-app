import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import SpotifyWebApi from "spotify-web-api-node";

import { AuthContext } from "@/context/AuthContext";

export const getPlaylist = async (playlistId: string, accessToken: string) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_KEY,
    accessToken,
  });

  const resp = await spotifyApi.getPlaylist(playlistId);
  return resp.body;
};

export const usePlaylist = (playlistId: string) => {
  const { accessToken } = useContext(AuthContext);

  const playlistQuery = useQuery(["album", playlistId], () => {
    return getPlaylist(playlistId, accessToken!);
  });

  return { playlistQuery };
};
