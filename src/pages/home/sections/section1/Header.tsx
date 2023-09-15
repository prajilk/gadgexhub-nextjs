"use client";

import { ChevronsLeft, ChevronsRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
    {
        url: "/testHero.webp",
        urlSm: "/testHeroSM.webp",
    },
    {
        url: "/testHero2.webp",
        urlSm: "/testHero2SM.webp",
    },
];

const Header = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const prevSlide = () => {
        setProgress(0);
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        setProgress(0);
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

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
    }, [isPaused, progress]);

    return (
        <section className="w-full bg-gradient-to-tr from-gray-600 to-black pt-32 pb-7 md:pb-10 md:pt-40">
            <div className="container h-[26rem] md:h-[23rem] w-full m-auto px-5 relative group">
                <div
                    style={{
                        backgroundImage: `url(${slides[currentIndex].url})`,
                    }}
                    className="relative hidden md:block w-full h-full rounded-2xl bg-center bg-cover duration-500"
                ></div>
                <div
                    style={{
                        backgroundImage: `url(${slides[currentIndex].urlSm})`,
                    }}
                    className="relative md:hidden w-full h-full rounded-2xl bg-center bg-cover duration-500"
                ></div>
                <div className="absolute flex items-center gap-2 left-0 bottom-0 ps-10 pb-4 md:right-0 md:pe-10">
                    {/* Slide Numbers */}
                    <div className="flex items-center me-2 gap-2.5">
                        {slides.map((_, index) => (
                            <span
                                className={`${
                                    currentIndex === index
                                        ? "text-white"
                                        : "text-[hsla(0,0%,100%,.60)]"
                                } hover:text-white cursor-pointer`}
                                onClick={() => goToSlide(index)}
                            >
                                0{index + 1}
                            </span>
                        ))}
                    </div>
                    {/* Progress Bar */}
                    <span className="bg-[hsla(0,0%,100%,.25)] h-1 w-16 rounded-full">
                        <span
                            className="h-full bg-white rounded-full block"
                            data-percent={progress}
                            style={{ width: `${progress}%` }}
                        ></span>
                    </span>
                    <ChevronsLeft
                        onClick={prevSlide}
                        className="hidden md:block cursor-pointer text-[hsla(0,0%,100%,.70)] hover:text-white"
                    />
                    {isPaused ? (
                        <Play
                            strokeWidth={0}
                            onClick={togglePause}
                            className="hidden md:block cursor-pointer fill-[hsla(0,0%,100%,.70)] hover:fill-white"
                        />
                    ) : (
                        <Pause
                            strokeWidth={0}
                            onClick={togglePause}
                            className="hidden md:block cursor-pointer fill-[hsla(0,0%,100%,.70)] hover:fill-white"
                        />
                    )}
                    <ChevronsRight
                        onClick={nextSlide}
                        className="hidden md:block cursor-pointer text-[hsla(0,0%,100%,.70)] hover:text-white"
                    />
                </div>
            </div>
        </section>
    );
};

export default Header;
