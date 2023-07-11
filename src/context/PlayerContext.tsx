import { createContext, useState } from "react";

interface PlayerContextProps {
  currentMusic: string[];
  playSong: (track: string) => void;
  playPlaylist: (track: SpotifyApi.PlaylistTrackObject[]) => void;
}

export const PlayerContext = createContext({} as PlayerContextProps);

interface PlayerProviderProps {
  children: React.ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [currentMusic, setCurrentMusic] = useState<string[]>([]);

  const playSong = (uri: string) => {
    const newCurrentMusic = [uri];
    setCurrentMusic(newCurrentMusic);
  };

  const playPlaylist = (trackList: SpotifyApi.PlaylistTrackObject[]) => {
    const newTrackList = [];

    for (let i = 0; i < trackList.length; i++) {
      const uri = trackList[i]?.track?.uri;
      uri && newTrackList.push(uri);
    }

    setCurrentMusic(newTrackList);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentMusic,
        playSong,
        playPlaylist,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
