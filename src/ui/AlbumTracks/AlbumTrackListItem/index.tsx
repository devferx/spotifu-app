import { useContext } from "react";

import { PlayerContext } from "@/context/PlayerContext";
import { millisToMinutesAndSeconds } from "@/shared/utils/millisToMinutesAndSeconds";

import playIcon from "@/assets/icons/play.svg";

import styles from "./AlbumTrackListItem.module.css";
import Image from "next/image";

interface AlbumTrackListItemProps {
  track: SpotifyApi.TrackObjectSimplified;
  albumName: string;
  smallerImage: string;
  albumArtists: SpotifyApi.ArtistObjectSimplified[];
  albumReleaseDate: string;
}

export const AlbumTrackListItem = ({
  track,
  albumName,
  smallerImage,
  albumArtists,
  albumReleaseDate,
}: AlbumTrackListItemProps) => {
  const { playSong } = useContext(PlayerContext);

  return (
    <div className={styles.container} onClick={() => playSong(track.uri)}>
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
          src={smallerImage}
          alt={`${albumName} album cover`}
        />
      </div>
      <div>
        <p className={styles.title}>{track.name}</p>
        <p className={styles.artist}>{albumArtists[0].name}</p>
      </div>
      <div>
        <p className={styles.album}>{albumName}</p>
      </div>
      <div>
        <p>{albumReleaseDate}</p>
      </div>
      <div>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};
