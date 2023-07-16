import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { Playlist } from "@/interfaces";
import library from "@/assets/icons/library.svg";

import styles from "./SidebarPlaylistMenu.module.css";
import NavLink from "@/ui/NavLink";
import Image from "next/image";

interface SidebarPlaylistMenuProps {
  title: string;
  playlists: (Playlist | null)[];
}

export const SidebarPlaylistMenu = ({
  title,
  playlists,
}: SidebarPlaylistMenuProps) => {
  return (
    <section className={styles.container}>
      <header className={styles.listHeader}>
        <Image width={24} src={library} alt="Library" />
        {title}
      </header>
      <ul className={styles.list}>
        {playlists.map((playlist, i) => (
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
                <Image
                  className={styles.itemImg}
                  width={48}
                  height={48}
                  src={playlist?.images[0].url}
                  alt="Playlist"
                />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>
                    {playlist.name.length > 18
                      ? playlist.name.slice(0, 18) + "..."
                      : playlist.name}
                  </p>
                  <p className={styles.itemOwner}>
                    {playlist.owner.display_name}{" "}
                  </p>
                </div>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
