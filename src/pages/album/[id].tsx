import { SpotifyContext } from "@/context/SpotifyContext";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";

import styles from "@/styles/Album.module.css";
import { AlbumTracks } from "@/ui/AlbumTracks";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const albumId = context.params?.id;

  if (!albumId) {
    return {
      notFound: true,
    };
  }

  return {
    props: { albumId },
  };
};

interface AlbumPageProps {
  albumId: string;
}

export default function AlbumPage({ albumId }: AlbumPageProps) {
  const [album, setAlbum] = useState<SpotifyApi.SingleAlbumResponse | null>(
    null
  );
  const { getAlbumInfo } = useContext(SpotifyContext);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const album = await getAlbumInfo(albumId);
        setAlbum(album);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlbum();
  }, [albumId, getAlbumInfo]);

  if (!album) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.headerImage}
          src={album.images[0].url}
          alt={`${album.name} cover`}
        />
        <div className={styles.headerContent}>
          <h3>{album.name}</h3>
          <p>{album.artists[0].name}</p>
          <div className={styles.headerContentBtn}>
            <button className="button button-text">Reproducir</button>
          </div>
        </div>
      </header>
      <AlbumTracks albumData={album} />
    </div>
  );
}
