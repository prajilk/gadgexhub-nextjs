"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Image = {
  id: string;
  url: string;
};

type ImageGalleryProps = {
  images: Image[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [imageUrl, setImageUrl] = useState(images[0].url);

  const changeImage = (id: string) => {
    const currImage = images.find((image) => image.id === id);
    setImageUrl(currImage?.url || images[0].url);
  };

  useEffect(() => {
    changeImage(images[0].url);
  }, [images]);

  return (
    <div className="relative flex flex-col-reverse items-start gap-5 md:flex-row">
      <div className="sticky top-32 flex gap-x-4 gap-y-4 overflow-x-scroll hide-scrollbar md:flex-col md:overflow-x-visible">
        {images.map((image, index) => {
          return (
            <button
              key={image.id}
              className={`relative h-14 w-14 flex-shrink-0 rounded-md bg-white ${
                image.url === imageUrl && "border-2 border-gray-600"
              }`}
              onClick={() => {
                changeImage(image.id);
              }}
            >
              <span className="sr-only">Go to image {index + 1}</span>
              <Image
                src={image.url}
                className="absolute inset-0"
                alt="Thumbnail"
                fill
                priority
                sizes="(max-width: 999px) 72px, 60px"
                style={{
                  objectFit: "cover",
                }}
              />
            </button>
          );
        })}
      </div>
      <div className="relative mx-auto inline-block aspect-[29/30] w-full">
        <Image
          fill
          src={imageUrl}
          priority
          sizes="(max-width: 999px) calc(100vw - 48px), 640px"
          alt="Product image"
          className="bg-gray-200 md:ms-0"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
