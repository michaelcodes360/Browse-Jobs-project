import { useEffect, useState } from "react";

const ImageSlideshow = ({
  images,
  intervalDuration = 10000,
  objectFit = "cover",
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % images.length);
    }, intervalDuration);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images.length, intervalDuration]);

  if (!images.length) {
    return null;
  }

  return (
    <div className={`image-slideshow ${className}`} aria-hidden="true">
      {images.map((image, index) => (
        <img
          key={`${image.src}-${index}`}
          src={image.src}
          alt=""
          className={`image-slideshow__image ${
            index === currentIndex ? "image-slideshow__image--active" : ""
          }`}
          style={{ objectFit }}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default ImageSlideshow;
