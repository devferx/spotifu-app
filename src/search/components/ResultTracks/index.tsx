import Image from "next/image";

import calendarIcon from "@/assets/icons/calendar.svg";
import clockIcon from "@/assets/icons/clock.svg";

import styles from "./TrackList.module.css";
import { TrackListItem } from "./TrackListItem";

interface ResultTracksProps {
  tracks: SpotifyApi.TrackObjectFull[];
}

export const ResultTracks = ({ tracks }: ResultTracksProps) => {
  return (
    <div className={styles.trackList}>
      <div className={styles.header}>
        <span></span>
        <span></span>
        <span>TÍTULO</span>
        <span>ÁLBUM</span>
        <span>
          <Image src={calendarIcon} alt="Calendar Icon" />
        </span>
        <span>
          <Image src={clockIcon} alt="Clock Icon" />
        </span>
      </div>

      {tracks.map((track) => (
        <TrackListItem key={track.id} track={track} />
      ))}
    </div>
  );
};
