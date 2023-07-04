import Skeleton from "react-loading-skeleton";

import { useRouter } from "next/router";
import { Album, Playlist } from "@/interfaces";

import styles from "./AlbumCard.module.css";

interface AlbumCardProps {
  album: Album | Playlist | null;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const router = useRouter();

  if (!album) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.albumCard}>
          <div className={styles.imageContainer}>
            <Skeleton height={150} />
          </div>

          <p className={styles.title}>
            <Skeleton />
          </p>

          <p className={styles.artist}>
            <Skeleton />
          </p>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    isPlaylist
      ? router.push(`/playlist/${album.id}`)
      : router.push(`/album/${album.id}`);
  };

  const isAlbum = album.type === "album";
  const isPlaylist = album.type === "playlist";

  return (
    <div className={styles.wrapper}>
      <div onClick={handleClick} className={styles.albumCard}>
        <div className={styles.imageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={album.images[1]?.url || album.images[0].url}
            alt="Album cover"
          />
        </div>
        <p className={styles.title}>{album.name}</p>
        <p className={styles.artist}>
          {isAlbum ? album.artists[0].name : album.name}
        </p>
      </div>
    </div>
  );
};
