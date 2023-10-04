"use client";

import Image from "next/image";
import { useState } from "react";

type Image = {
  id: string;
  url: string;
};

type ImageGalleryProps = {
  images: Image[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="relative flex flex-col-reverse items-start gap-5 md:flex-row">
      <div className="sticky top-32 flex gap-x-4 gap-y-4 overflow-x-scroll hide-scrollbar md:flex-col md:overflow-x-visible">
        {images.map((image, index) => {
          return (
            <button
              key={image.id}
              className={`relative h-14 w-14 flex-shrink-0 rounded-md bg-white ${
                index === imageIndex && "border-2 border-gray-600"
              }`}
              onClick={() => setImageIndex(index)}
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
      <div className="mx-auto flex aspect-[29/30] w-full overflow-hidden md:sticky md:top-32 md:w-[80%]">
        {images.map((image, i) => (
          <div className="relative h-full w-full flex-shrink-0 flex-grow-0">
            <Image
              key={i}
              fill
              src={image.url}
              priority
              sizes="(max-width: 999px) calc(100vw - 48px), 640px"
              alt="Product image"
              style={{ translate: `${-100 * imageIndex}%` }}
              className="bg-gray-200 transition-[translate] duration-300 ease-in-out md:ms-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
