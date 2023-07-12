import { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";

import { AuthContext } from "@/context/AuthContext";
import { SpotifyContext } from "@/context/SpotifyContext";
import { FlatPlaylistList } from "@/home/components/FlatPlaylistList";
import { AlbumCardList } from "@/ui/AlbumCardList";
import Cookies from "js-cookie";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context.req.cookies.spotify_access_token;
  if (accessToken) {
    return {
      props: {
        code: "",
      },
    };
  }

  let code = context.query.code;

  // read from cookies spotify_access_token
  // if not exists, redirect to /login

  if (!code) {
    return {
      props: {
        code: "",
      },
    };
  }

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
  const { newReleases, featuredPlaylists } = useContext(SpotifyContext);
  const { accessToken, login } = useContext(AuthContext);

  useEffect(() => {
    const accessToken = Cookies.get("spotify_access_token");
    if (!accessToken && !accessToken) {
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
