import React from "react";
import Link from "next/link";
import ReactFastMarquee from "react-fast-marquee";
import { MarqueeOffers } from "@prisma/client";

const Marquee = ({ offers }: { offers: MarqueeOffers[] }) => {
  return (
    <ReactFastMarquee
      pauseOnHover={true}
      className="bg-black py-2 text-white md:py-3"
    >
      {offers.map((offer, i) => (
        <React.Fragment key={i}>
          <Link href={offer.url} className="text-xs font-semibold">
            {offer.title}
          </Link>
          {i !== offers.length - 1 ? (
            <span className="mx-20">•</span>
          ) : (
            <span className="me-20"></span>
          )}
        </React.Fragment>
      ))}
    </ReactFastMarquee>
  );
};

export default Marquee;
