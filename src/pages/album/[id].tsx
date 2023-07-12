import { GetServerSideProps } from "next";

import { AlbumTracks } from "@/ui/AlbumTracks";
import { useAlbum } from "@/album/hooks/useAlbum";

import styles from "@/styles/Album.module.css";
import { LoadingView } from "@/ui/LoadingView";

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
  const { albumQuery } = useAlbum(albumId);

  if (albumQuery.isLoading || !albumQuery.data) {
    return <LoadingView />;
  }

  const album = albumQuery.data;

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
