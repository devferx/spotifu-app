import { useContext } from "react";

import { SpotifyContext } from "@/context/SpotifyContext";

import styles from "./FlatPlaylistList.module.css";
import { FlatPlaylistItem } from "./FlatPlaylistItem";

export const FlatPlaylistList = () => {
  const { featuredPlaylists } = useContext(SpotifyContext);

  return (
    <div className={styles.flatPlaylist}>
      <h2>Buenos Dias!</h2>

      <div className={styles.container}>
        {featuredPlaylists.map((playlist, i) => (
          <FlatPlaylistItem
            key={
              playlist?.id
                ? `playlist-flat-${playlist.id}`
                : `playlist-flat-${i}`
            }
            playlist={playlist}
          />
        ))}
      </div>
    </div>
  );
};
