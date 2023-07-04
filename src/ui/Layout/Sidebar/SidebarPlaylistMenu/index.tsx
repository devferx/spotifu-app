import { memo } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { Playlist } from "@/interfaces";

import styles from "./SidebarPlaylistMenu.module.css";

interface SidebarPlaylistMenuProps {
  title: string;
  playlists: (Playlist | null)[];
}

// TODO: Add active playlist
const SidebarPlaylistMenuComponent = ({
  title,
  playlists,
}: SidebarPlaylistMenuProps) => {
  return (
    <ul className={styles.container}>
      <li className={styles.listTitle}>{title}</li>
      {playlists.map((playlist, i) => (
        <li key={playlist?.id || i} className={styles.listItem}>
          {playlist === null ? (
            <Link href="/">
              <Skeleton baseColor="#e3d3d3" />
            </Link>
          ) : (
            <Link
              // activeClassName="active-playlist"
              href={`/playlist/${playlist.id}`}
            >
              {playlist.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export const SidebarPlaylistMenu = memo(SidebarPlaylistMenuComponent);
