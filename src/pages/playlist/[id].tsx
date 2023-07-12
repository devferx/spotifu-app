/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import type { GetServerSideProps } from "next";

import { usePlaylist } from "@/playlist/hooks/usePlaylist";
import { PlayerContext } from "@/context/PlayerContext";

import { PlaylistTracks } from "@/ui/PlaylistTracks";
import { LoadingView } from "@/ui/LoadingView";

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

export default function PlayslistPage({ playlistId }: PlayslistPageProps) {
  const { playlistQuery } = usePlaylist(playlistId);
  const { playPlaylist } = useContext(PlayerContext);

  if (playlistQuery.isLoading || !playlistQuery.data) {
    return <LoadingView />;
  }

  const playlist = playlistQuery.data;

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
            onClick={() => playPlaylist(playlist.tracks.items)}
          >
            Repoducir
          </button>
        </div>
      </div>

      <PlaylistTracks tracks={playlist.tracks.items} />
    </div>
  );
}
