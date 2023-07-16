import { useContext } from "react";

import { SpotifyContext } from "@/context/SpotifyContext";

import { AlbumCardList } from "@/ui/AlbumCardList";
import { ResultTracks } from "@/search/components/ResultTracks";

export default function SearchPage() {
  const { search, searchResults, albumsResults } = useContext(SpotifyContext);

  return (
    <>
      <AlbumCardList
        title={`Resultados de ${search}`}
        albumList={albumsResults}
      />

      <ResultTracks tracks={searchResults} />
    </>
  );
}
