import { useState, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";

import arrowLeft from "@/assets/icons/arrow-left.svg";
import arrowRight from "@/assets/icons/arrow-right.svg";

import { Album, Playlist } from "@/interfaces";

import styles from "./AlbumCardList.module.css";
import { AlbumCard } from "./AlbumCard";

interface AlbumCardListProps {
  title: string;
  albumList: (Album | Playlist | SpotifyApi.AlbumObjectSimplified | null)[];
  isPlaylist?: boolean;
}

export const AlbumCardList = ({
  title,
  albumList,
  isPlaylist = false,
}: AlbumCardListProps) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    beforeChange: (current: any, next: any) => setSlideIndex(next),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleClick = (index: number) =>
    sliderRef.current!.slickGoTo(slideIndex + index);

  return (
    <div className={styles.albumCardList}>
      <div className={styles.header}>
        <p className={styles.headerTitle}>{title}</p>

        <div className={styles.headerActions}>
          <button
            className={styles.headerActionsButton}
            onClick={() => handleClick(-1)}
          >
            <Image src={arrowLeft} alt="Arroww Left" />
          </button>
          <button
            className={styles.headerActionsButton}
            onClick={() => handleClick(1)}
          >
            <Image src={arrowRight} alt="Arroww Right" />
          </button>
        </div>
      </div>

      <Slider ref={sliderRef} {...sliderSettings}>
        {albumList.map((album, i) => (
          <AlbumCard key={album?.id || `album-${i}`} album={album} />
        ))}
      </Slider>
    </div>
  );
};
