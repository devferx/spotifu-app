/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import type { GetServerSideProps } from "next";

import { usePlaylist } from "@/playlist/hooks/usePlaylist";
import { PlayerContext } from "@/context/PlayerContext";

import { PlaylistTracks } from "@/ui/PlaylistTracks";
import { LoadingView } from "@/ui/LoadingView";
import { PlaylistHeader } from "@/playlist/components/PlaylistHeader";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playlistId = context.params?.id;

  if (!playlistId) {
    return {
      notFound: true,
    };
  }

  return {
    props: { playlistId },
  };
};

interface PlayslistPageProps {
  playlistId: string;
}

export default function PlayslistPage({ playlistId }: PlayslistPageProps) {
  const { playlistQuery } = usePlaylist(playlistId);

  if (playlistQuery.isLoading || !playlistQuery.data) {
    return <LoadingView />;
  }

  const playlist = playlistQuery.data;

  return (
    <div>
      <PlaylistHeader playlist={playlist} />
      <PlaylistTracks tracks={playlist.tracks.items} />
    </div>
  );
}
