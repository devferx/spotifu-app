import { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";

import { AuthContext } from "@/context/AuthContext";
import { SpotifyContext } from "@/context/SpotifyContext";
import { FlatPlaylistList } from "@/home/components/FlatPlaylistList";
import { AlbumCardList } from "@/ui/AlbumCardList";
import Cookies from "js-cookie";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let code = context.query.code;

  if (code) {
    return {
      props: {
        code,
      },
    };
  }

  const accessToken = context.req.cookies.spotify_access_token;
  if (accessToken) {
    return {
      props: {
        code: "",
      },
    };
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

interface HomePageProps {
  code: string;
}

export default function HomePage({ code }: HomePageProps) {
  const { newReleases, featuredPlaylists } = useContext(SpotifyContext);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (code) {
      login(code);
      return;
    }
  }, [code, login]);

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
