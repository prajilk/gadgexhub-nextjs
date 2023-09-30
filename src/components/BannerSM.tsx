import React from "react";
import Container from "./Container";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import LinkButton from "./shared/LinkButton";

const BannerSM = () => {
  return (
    <div className="bg-black py-5 md:hidden">
      <Container className="py-10 md:py-20">
        <div className="flex flex-col justify-between gap-10">
          <div className="flex flex-col justify-between text-white">
            <div>
              <span className="text-sm font-light text-gray-400 md:text-lg">
                <span className="border-b-2 border-red-500">Best</span> deal
              </span>
              <h1 className="my-3 flex-1 text-3xl">Oneplus Keyboard 81 Pro</h1>
              <div className="relative h-60 w-full">
                <Image src="/banner.webp" alt="Banner image" fill />
              </div>
              <p className="my-3 text-sm font-extralight text-gray-200">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                earum quasi quibusdam nostrum
              </p>
              <span className="mb-3 block text-base">
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
        </div>
      </Container>
    </div>
  );
};

export default BannerSM;
