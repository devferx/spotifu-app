import Image from "next/image";

// import { TrackListItem } from "../TrackListItem";

import calendarIcon from "@/assets/icons/calendar.svg";
import clockIcon from "@/assets/icons/clock.svg";

import styles from "./TrackList.module.css";
import { TrackListItem } from "./TrackListItem";

interface TrackListProps {
  tracks: SpotifyApi.PlaylistTrackObject[];
  isPlaylist?: boolean;
}

export const TrackList = ({ tracks, isPlaylist = false }: TrackListProps) => {
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

      {tracks.map((trackParam) => {
        // TODO: Album type
        // const track = isPlaylist ? trackParam?.track : trackParam;
        const track = trackParam.track;

        if (!track) return null;

        return <TrackListItem key={track.id} track={track} />;
      })}
    </div>
  );
};
