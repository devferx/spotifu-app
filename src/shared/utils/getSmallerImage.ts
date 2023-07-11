import { Image } from "@/interfaces";

type Images = (SpotifyApi.ImageObject | Image)[];

export function getSmallerImage(images: Images) {
  const smallerImage = images.reduce((prevImage, currentImage) => {
    if (!prevImage.width) {
      return currentImage;
    }
    if (!currentImage.width) {
      return prevImage;
    }

    return prevImage.width > currentImage.width ? currentImage : prevImage;
  });

  return smallerImage;
}
