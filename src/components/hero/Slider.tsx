import { formatCurrency } from "@/lib/utils";
import { SlideProps } from "@/lib/types/ui";
import { motion as m } from "framer-motion";
import Image from "next/image";
import LinkButton from "../shared/LinkButton";

const Slider = ({
    slide,
    forLargeScreen,
}: {
    slide: SlideProps;
    forLargeScreen: boolean;
}) => {
    return (
        <>
            <m.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full h-full overflow-hidden after:content-[''] after:absolute after:w-full after:h-full after:bg-[rgba(0,0,0,0.1)] after:left-0 after:top-0"
            >
                <Image
                    loading="eager"
                    priority={true}
                    sizes="min(1600px, 100vw)"
                    src={forLargeScreen ? slide.url : slide.urlSm}
                    alt="slide images"
                    fill
                />
            </m.div>
            <div className="absolute text-white md:max-w-[50%] h-full flex flex-col md:justify-center items-start gap-3 p-5 md:ps-10 overflow-hidden">
                <m.h1
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-3xl md:text-5xl font-bold"
                >
                    {slide.title}
                </m.h1>
                <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.75 }}
                    className="text-sm font-medium md:font-normal md:text-base"
                >
                    {slide.description}
                </m.p>
                <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.75 }}
                >
                    From{" "}
                    <span className="line-through text-slate-200 decoration-white">
                        {formatCurrency(slide.basePrice)}
                    </span>{" "}
                    <b>{formatCurrency(slide.discountedPrice)}</b>
                </m.p>
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.75 }}
                >
                    <LinkButton href={slide.href} title="Buy Now" />
                </m.div>
            </div>
        </>
    );
};

export default Slider;
