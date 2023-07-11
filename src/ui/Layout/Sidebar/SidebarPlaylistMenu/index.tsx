import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { Playlist } from "@/interfaces";

import styles from "./SidebarPlaylistMenu.module.css";
import NavLink from "@/ui/NavLink";

interface SidebarPlaylistMenuProps {
  title: string;
  playlists: (Playlist | null)[];
}

export const SidebarPlaylistMenu = ({
  title,
  playlists,
}: SidebarPlaylistMenuProps) => {
  const [playlistToRender, setPlaylistToRender] = useState(playlists);

  useEffect(() => {
    setPlaylistToRender(playlists.slice(0, 5));
  }, [playlists]);

  const showAllPlaylists = () => {
    setPlaylistToRender(playlists);
  };

  const showLessPlaylists = () => {
    setPlaylistToRender(playlists.slice(0, 5));
  };

  return (
    <ul className={styles.container}>
      <li className={styles.listTitle}>{title}</li>
      {playlistToRender.map((playlist, i) => (
        <li key={playlist?.id || i} className={styles.listItem}>
          {playlist === null ? (
            <Link href="/">
              <Skeleton baseColor="#e3d3d3" />
            </Link>
          ) : (
            <NavLink
              activeClassName={styles.activePlaylist}
              href={`/playlist/${playlist.id}`}
            >
              {playlist.name}
            </NavLink>
          )}
        </li>
      ))}
      {playlistToRender.length < playlists.length && (
        <li className={styles.listItem}>
          <button className={styles.showAll} onClick={showAllPlaylists}>
            Show all
          </button>
        </li>
      )}

      {/* Show Less button */}
      {playlistToRender.length > 5 && (
        <li className={styles.listItem}>
          <button className={styles.showLess} onClick={showLessPlaylists}>
            Show less
          </button>
        </li>
      )}
    </ul>
  );
};
