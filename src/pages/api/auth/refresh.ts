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

export const refreshToken = async (refreshToken: string) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.NEXT_PUBLIC_URL,
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_KEY,
    clientSecret: process.env.SPOTIFY_SECRET_KEY,
    refreshToken,
  });

  const { body } = await spotifyApi.refreshAccessToken();
  const { access_token, expires_in } = body;

  return {
    accessToken: access_token,
    expiresIn: expires_in,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return;

  const refreshToken = req.body.refreshToken;

  try {
    const { accessToken, expiresIn } = await refreshToken(refreshToken);

    res.status(200).json({ accessToken, expiresIn });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid code" });
  }
}
