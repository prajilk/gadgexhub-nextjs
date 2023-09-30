import React from "react";
import Container from "./Container";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import LinkButton from "./shared/LinkButton";

const Banner = () => {
  return (
    <div className="hidden bg-black py-5 md:block">
      <Container className="py-10 md:py-20">
        <div className="flex justify-between gap-10">
          <div className="flex max-w-[40%] flex-col justify-between text-white">
            <div>
              <span className="text-sm font-light text-gray-400 md:text-lg">
                <span className="border-b-2 border-red-500">Best</span> deal
              </span>
              <h1 className="mt-5 flex-1 text-5xl">Oneplus Keyboard 81 Pro</h1>
              <p className="text-sm font-extralight text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                earum quasi quibusdam nostrum
              </p>
            </div>
            <div>
              <span className="mb-4 block text-lg">
                At {formatCurrency(5999)}
              </span>
              <LinkButton
                href="/"
                className="bg-white text-black hover:bg-gray-300"
              >
                Buy Now
              </LinkButton>
            </div>
          </div>
          <div className="relative h-96 w-[60%]">
            <Image src="/banner.webp" alt="Banner image" fill />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
