import { useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

import { AuthContext } from "@/context/AuthContext";

import styles from "./Bottombar.module.css";
import { PlayerContext } from "@/context/PlayerContext";

export const BottomBar = () => {
  const { currentMusic } = useContext(PlayerContext);
  const { accessToken } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      {currentMusic.length !== 0 && (
        <SpotifyPlayer
          styles={{
            activeColor: "#fff",
            bgColor: "#181818",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
          }}
          play
          showSaveIcon
          token={accessToken!}
          uris={currentMusic}
        />
      )}
    </div>
  );
};
