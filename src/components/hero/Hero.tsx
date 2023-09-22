"use client";

import { ChevronsLeft, ChevronsRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Slider from "./Slider";

const slides = [
  {
    title: "Earphone 700 ANC",
    description: "Get your Earbud now with 20% off!",
    basePrice: 1999,
    discountedPrice: 1499,
    href: "/store/product/earphone-700-anc?pid=twvdhjay",
    url: "/testHero.webp",
    urlSm: "/testHeroSM.webp",
  },
  {
    title: "Home Theater 3400C",
    description: "Latest Zebronics Home Theater 3400C, Buy now with 15% off!",
    basePrice: 14999,
    discountedPrice: 12999,
    href: "/store/product/home-theater-3400c?pid=ejalknkud",
    url: "/testHero2.webp",
    urlSm: "/testHero2SM.webp",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => {
    setProgress(0);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    setProgress(0);
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  //   const nextSlide = () => {
  //     setProgress(0);
  //     const isLastSlide = currentIndex === slides.length - 1;
  //     const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //     setCurrentIndex(newIndex);
  //   };

  const goToSlide = (slideIndex: number) => {
    setProgress(0);
    setCurrentIndex(slideIndex);
  };

  const togglePause = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!isPaused) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            nextSlide(); // Call nextSlide function when progress reaches 100
            return 100;
          } else {
            return prevProgress + 1;
          }
        });
      }, 70);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPaused, progress, nextSlide]);

  return (
    <section className="w-full bg-gradient-to-tr from-gray-600 to-black pb-7 pt-32 md:pb-10 md:pt-40">
      <div className="group relative mx-auto h-[26rem] max-w-6xl px-4 md:h-[23rem]">
        {/* Slider for Large Screen */}
        {slides.map(
          (slide, i) =>
            currentIndex === i && (
              <div
                className="relative hidden h-full w-full overflow-hidden rounded-2xl md:block"
                key={i}
              >
                <Slider slide={slide} forLargeScreen={true} />
              </div>
            ),
        )}
        {/* Slider for Small Screen */}
        {slides.map(
          (slide, i) =>
            currentIndex === i && (
              <div
                className="relative h-full w-full overflow-hidden rounded-2xl md:hidden"
                key={i}
              >
                <Slider slide={slide} forLargeScreen={false} />
              </div>
            ),
        )}

        <div className="absolute bottom-0 left-0 z-30 flex items-center gap-2 pb-8 ps-10 md:left-auto md:right-0 md:pe-20">
          {/* Slide Numbers */}
          <div className="me-2 flex items-center gap-2.5">
            {slides.map((_, index) => (
              <span
                className={`${
                  currentIndex === index
                    ? "text-white"
                    : "text-[hsla(0,0%,100%,.60)]"
                } cursor-pointer hover:text-white`}
                onClick={() => goToSlide(index)}
                key={index}
              >
                0{index + 1}
              </span>
            ))}
          </div>
          {/* Progress Bar */}
          <span className="h-1 w-16 rounded-full bg-[hsla(0,0%,100%,.25)]">
            <span
              className="block h-full rounded-full bg-white"
              data-percent={progress}
              style={{ width: `${progress}%` }}
            ></span>
          </span>
          {/* Controls */}
          <ChevronsLeft
            onClick={prevSlide}
            className="hidden cursor-pointer text-[hsla(0,0%,100%,.70)] hover:text-white md:block"
          />
          {isPaused ? (
            <Play
              strokeWidth={0}
              onClick={togglePause}
              className="hidden cursor-pointer fill-[hsla(0,0%,100%,.70)] hover:fill-white md:block"
            />
          ) : (
            <Pause
              strokeWidth={0}
              onClick={togglePause}
              className="hidden cursor-pointer fill-[hsla(0,0%,100%,.70)] hover:fill-white md:block"
            />
          )}
          <ChevronsRight
            onClick={nextSlide}
            className="hidden cursor-pointer text-[hsla(0,0%,100%,.70)] hover:text-white md:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
