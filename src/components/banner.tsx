import React from "react";
import Container from "./container";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import LinkButton from "./shared/link-button";

const Banner = () => {
  return (
    <div className="bg-black py-5">
      <Container className="py-10 md:py-20">
        <div className="flex justify-between gap-10">
          <div className="flex flex-col justify-between text-white md:max-w-[40%]">
            <div>
              <span className="text-sm font-light text-gray-400 md:text-lg">
                <span className="border-b-2 border-red-500">Best</span> deal
              </span>
              <h1 className="my-3 flex-1 text-3xl md:my-0 md:mt-5 md:text-5xl">
                Oneplus Keyboard 81 Pro
              </h1>
              <div className="relative h-60 w-full md:hidden">
                <Image src="/banner.webp" alt="Banner image" fill />
              </div>
              <p className="my-3 text-sm font-extralight text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                earum quasi quibusdam nostrum
              </p>
            </div>
            <div>
              <span className="font-Roboto mb-3 block">
                At {formatCurrency(5999)}
              </span>
              <LinkButton
                href="/"
                className="bg-white font-medium text-black hover:bg-gray-300"
              >
                Buy Now
              </LinkButton>
            </div>
          </div>
          <div className="relative hidden h-96 w-[60%] md:block">
            <Image src="/banner.webp" alt="Banner image" fill />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
