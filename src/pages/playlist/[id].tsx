/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import type { GetServerSideProps } from "next";

import { SpotifyContext } from "@/context/SpotifyContext";

import { TrackList } from "@/ui/TrackList";

import styles from "@/styles/Playlist.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playlistId = context.params?.id;

  if (!playlistId) {
    return {
      notFound: true,
    };
  }

  return {
    props: { playlistId },
  };
};

interface PlayslistPageProps {
  playlistId: string;
}

// TODO: Add playPlaylist function
export default function PlayslistPage({ playlistId }: PlayslistPageProps) {
  const { getPlaylist } = useContext(SpotifyContext);
  const [playlist, setPlaylist] = useState<
    SpotifyApi.SinglePlaylistResponse | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const playlist = await getPlaylist(playlistId);
      setPlaylist(playlist);
    };

    fetchData();
  }, [playlistId, getPlaylist]);

  if (!playlist) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div className={styles.header}>
        <img
          width="300"
          src={playlist.images[0].url}
          alt={`${playlist.name} cover`}
        />
        <div className={styles.headerContent}>
          <p className={styles.headerContentTitle}>{playlist.name}</p>
          <p>{playlist.description}</p>
          <p>{playlist.followers.total.toLocaleString()} SEGUIDORES</p>
          <button
            className={`${styles.headerContentBtn} button button-text`}
            // onClick={() => playPlaylist(playlist.tracks.items)}
          >
            Repoducir
          </button>
        </div>
      </div>

      <TrackList tracks={playlist.tracks.items} isPlaylist={true} />
    </div>
  );
}
