import { useState } from "react";
import Image from "next/image";
type ImageProperties = {
  src: string;
  alt: string;
};

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

const ImageWithFallback: React.FC<ImageProperties> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  if (imgSrc != "/images/fallback-thumb.jpeg" && !isValidUrl(imgSrc)) {
    setImgSrc("/images/fallback-thumb.jpeg");
  }

  const updateImageSrc = () => {
    setImgSrc("/images/fallback-thumb.jpeg");
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={500}
      height={500}
      onError={updateImageSrc}
    ></Image>
  );
};

export default ImageWithFallback;
