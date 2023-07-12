import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

type Data =
  | {
      accessToken: string;
      expiresIn: number;
    }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return;

  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.NEXT_PUBLIC_URL,
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_KEY,
    clientSecret: process.env.SPOTIFY_SECRET_KEY,
    refreshToken,
  });

  try {
    const { body } = await spotifyApi.refreshAccessToken();
    const { access_token, expires_in } = body;

    res.status(200).json({
      accessToken: access_token,
      expiresIn: expires_in,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid code" });
  }
}
