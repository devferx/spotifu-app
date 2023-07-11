import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

type Data =
  | {
      userPlaylists: SpotifyApi.PlaylistObjectSimplified[];
      featuredPlaylists: SpotifyApi.ListOfFeaturedPlaylistsResponse;
      newReleases: SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified>;
    }
  | {
      error: unknown;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return;

  const { accessToken } = req.body;
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_KEY,
    clientSecret: process.env.SPOTIFY_SECRET_KEY,
    accessToken,
  });

  try {
    const initialPromises = [
      spotifyApi.getUserPlaylists(),
      spotifyApi.getFeaturedPlaylists({ country: "US" }),
      spotifyApi.getNewReleases({ country: "US" }),
    ];

    const [
      userPlaylistsResponse,
      featuredPlaylistsResponse,
      newReleasesResponse,
    ] = await Promise.all(initialPromises);

    const userPlaylists = (
      userPlaylistsResponse.body as SpotifyApi.ListOfUsersPlaylistsResponse
    ).items;

    const featuredPlaylists =
      featuredPlaylistsResponse.body as SpotifyApi.ListOfFeaturedPlaylistsResponse;

    const newReleases = (
      newReleasesResponse.body as SpotifyApi.ListOfNewReleasesResponse
    ).albums;

    res.json({
      userPlaylists,
      featuredPlaylists,
      newReleases,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}
