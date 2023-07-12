import { useEffect, useState } from "react";
import axios from "axios";

import { InitialResponse, Album, Playlist } from "@/interfaces";

export const useInitialData = (accessToken: string | undefined) => {
  const [newReleases, setNewReleases] = useState<Array<null | Album>>(
    new Array(10).fill(null)
  );
  const [featuredPlaylists, setFeaturedPlaylists] = useState<
    Array<null | Playlist>
  >(new Array(10).fill(null));
  const [userPlaylists, setUserPlaylists] = useState<Array<null | Playlist>>(
    new Array(5).fill(null)
  );

  useEffect(() => {
    if (!accessToken) return;

    const fetchInitialData = async (accessToken: string) => {
      try {
        const { data } = await axios.post<InitialResponse>(
          "/api/initial-data",
          {
            accessToken,
          }
        );

        const { newReleases, featuredPlaylists, userPlaylists } = data;

        setFeaturedPlaylists(featuredPlaylists.playlists.items);
        setNewReleases(newReleases.items);
        setUserPlaylists(userPlaylists);
      } catch (error: any) {
        if (error.response.status === 401) {
          window.location.href = "/login";
        }
      }
    };

    fetchInitialData(accessToken);
  }, [accessToken]);

  return { newReleases, featuredPlaylists, userPlaylists };
};
