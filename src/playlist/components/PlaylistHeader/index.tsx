import { useContext } from "react";
import Image from "next/image";

import { PlayerContext } from "@/context/PlayerContext";

import styles from "./PlaylistHeader.module.css";

interface PlaylistHeaderProps {
  playlist: SpotifyApi.SinglePlaylistResponse;
}

export const PlaylistHeader = ({ playlist }: PlaylistHeaderProps) => {
  const { playPlaylist } = useContext(PlayerContext);

  return (
    <header className={styles.header}>
      <Image
        width={300}
        height={300}
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
    </header>
  );
};
