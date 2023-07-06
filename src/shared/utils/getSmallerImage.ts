export function getSmallerImage(images: SpotifyApi.ImageObject[]) {
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
