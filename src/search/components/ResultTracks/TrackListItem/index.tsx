import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import { PlayerContext } from "@/context/PlayerContext";

import { millisToMinutesAndSeconds } from "@/shared/utils/millisToMinutesAndSeconds";
import { getSmallerImage } from "@/shared/utils/getSmallerImage";

import playIcon from "@/assets/icons/play.svg";
import styles from "./TrackListItem.module.css";

interface TrackListItemProps {
  track: SpotifyApi.TrackObjectFull;
}

export const TrackListItem = ({ track }: TrackListItemProps) => {
  const { playSong } = useContext(PlayerContext);

  const handleClick = (
    ev: React.MouseEvent,
    track: SpotifyApi.TrackObjectFull
  ) => {
    if (ev.target instanceof HTMLAnchorElement) return;

    playSong(track.uri);
  };

  return (
    <div className={styles.container} onClick={(ev) => handleClick(ev, track)}>
      <div className={styles.buttonContainer}>
        <button>
          <Image src={playIcon} alt="Play Icon" />
        </button>
      </div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.albumCover}
          width="100%"
          src={getSmallerImage(track.album.images).url}
          alt={`${track.album.name} album cover`}
        />
      </div>
      <div>
        <p className={styles.title}>{track.name}</p>
        <p className={styles.artist}>{track.artists[0].name}</p>
      </div>
      <div>
        <p className={styles.album}>
          <Link href={`/album/${track.album.id}`}>
            {track.album.name.length > 56
              ? `${track.album.name.substring(0, 56)}...`
              : track.album.name}
          </Link>
        </p>
      </div>
      <div>
        <p>{track.album.release_date}</p>
      </div>
      <div>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};
