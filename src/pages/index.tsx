import { useContext, useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import { AuthContext, RefreshData } from "@/context/AuthContext";
import { SpotifyContext } from "@/context/SpotifyContext";
import { FlatPlaylistList } from "@/home/components/FlatPlaylistList";
import { AlbumCardList } from "@/ui/AlbumCardList";

import { refreshToken } from "./api/auth/refresh";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let code = context.query.code;
  const { spotify_refresh_token } = context.req.cookies;

  if (!code && !refreshToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (code) {
    return {
      props: {
        code,
      },
    };
  }

  console.log("not should be here");
  try {
    const { accessToken, expiresIn } = await refreshToken(
      spotify_refresh_token!
    );

    return {
      props: {
        refreshData: {
          accessToken,
          expiresIn,
          refreshToken: spotify_refresh_token,
        },
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

interface HomePageProps {
  code: string;
  refreshData?: RefreshData;
}

export default function HomePage({ code, refreshData }: HomePageProps) {
  const { newReleases, featuredPlaylists } = useContext(SpotifyContext);
  const { login, loginWithRefreshData } = useContext(AuthContext);

  useEffect(() => {
    if (refreshData) {
      loginWithRefreshData(refreshData);
      return;
    }

    if (code) {
      login(code);
      return;
    }
  }, [code, refreshData, loginWithRefreshData, login]);

  return (
    <div>
      <Head>
        <title>Spotifu - Home</title>
      </Head>

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
