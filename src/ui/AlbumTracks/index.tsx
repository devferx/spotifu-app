import Image from "next/image";

import { AlbumTrackListItem } from "./AlbumTrackListItem";

import calendarIcon from "@/assets/icons/calendar.svg";
import clockIcon from "@/assets/icons/clock.svg";

import { getSmallerImage } from "@/shared/utils/getSmallerImage";

import styles from "./TrackList.module.css";

interface AlbumTracksProps {
  albumData: SpotifyApi.SingleAlbumResponse;
}

export const AlbumTracks = ({ albumData }: AlbumTracksProps) => {
  const smallerImage = getSmallerImage(albumData.images).url;

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

      {albumData.tracks.items.map((track) => (
        <AlbumTrackListItem
          key={track.id}
          track={track}
          albumArtists={albumData.artists}
          smallerImage={smallerImage}
          albumName={albumData.name}
          albumReleaseDate={albumData.release_date}
        />
      ))}
    </div>
  );
};
