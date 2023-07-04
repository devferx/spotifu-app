import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { getSmallerImage } from "@/shared/utils/getSmallerImage";
import playIcon from "@/assets/icons/play.svg";

import { Playlist } from "@/interfaces";

import styles from "./FlatPlaylistItem.module.css";
import Image from "next/image";

interface FlatPlaylistItemProps {
  playlist: Playlist | null;
}

export const FlatPlaylistItem = ({ playlist }: FlatPlaylistItemProps) => {
  if (!playlist) {
    return (
      <div className={styles.link}>
        <div className={styles.flatPlaylistItem}>
          <Skeleton height={75} />

          <div className={styles.container}>
            <p>
              <Skeleton count={2} />
            </p>
            <Skeleton circle={true} height={40} width={40} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link className={styles.link} href={`/playlist/${playlist.id}`}>
      <div className={styles.flatPlaylistItem}>
        <img
          className={styles.cover}
          src={getSmallerImage(playlist.images).url}
          alt={`${playlist.name} cover`}
        />
        <div className={styles.container}>
          <p>{playlist.name}</p>
          <button className="button button--circle">
            <Image src={playIcon} alt="Play" />
          </button>
        </div>
      </div>
    </Link>
  );
};
