import Container from "./container";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import LinkButton from "./shared/link-button";
import { getBestDeal } from "@/lib/api/get-best-deal";

const Banner = async () => {
  const deal = await getBestDeal();
  if (!deal) return;

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
                {deal?.deal?.title}
              </h1>
              {deal?.deal?.imageUrl && (
                <div className="relative h-60 w-full md:hidden">
                  <Image
                    src={deal?.deal?.imageUrl}
                    alt="Banner image"
                    fill
                    sizes="100vw"
                  />
                </div>
              )}
              <p className="my-3 text-sm font-extralight text-gray-400">
                {deal?.deal?.description}
              </p>
            </div>
            <div>
              <span className="mb-3 block font-Roboto">
                At {formatCurrency(deal?.deal?.price || 0)}
              </span>
              <LinkButton
                href={deal?.deal?.url || "/"}
                className="bg-white font-medium text-black hover:bg-gray-300"
              >
                Buy Now
              </LinkButton>
            </div>
          </div>
          <div className="relative hidden h-96 w-[60%] md:block">
            <Image src={deal?.deal?.imageUrl || "/"} alt="Banner image" fill />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
