import { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";

import { AuthContext } from "@/context/AuthContext";
import { SpotifyContext } from "@/context/SpotifyContext";
import { FlatPlaylistList } from "@/home/components/FlatPlaylistList";
import { AlbumCardList } from "@/ui/AlbumCardList";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code;

  if (!code) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      code,
    },
  };
};

interface HomePageProps {
  code: string;
}

export default function HomePage({ code }: HomePageProps) {
  const { newReleases, featuredPlaylists, userPlaylists } =
    useContext(SpotifyContext);
  const { accessToken, login } = useContext(AuthContext);

  useEffect(() => {
    if (!accessToken) {
      login(code);
      return;
    }
  }, [accessToken, code, login]);

  return (
    <div>
      <FlatPlaylistList />
      <AlbumCardList title="Nuevos Lanzamientos" albumList={newReleases} />
      <AlbumCardList
        title="Listas de Reproducción Destacadas"
        albumList={featuredPlaylists}
        isPlaylist={true}
      />
    </div>
  );
}
