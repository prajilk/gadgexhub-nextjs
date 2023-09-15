import React from "react";
import Link from "next/link";
import ReactFastMarquee from "react-fast-marquee";

const offers = [
    {
        text: "Offer 1",
        url: "#",
    },
    {
        text: "Offer 2",
        url: "#",
    },
    {
        text: "Offer 3",
        url: "#",
    },
    {
        text: "Offer 4",
        url: "#",
    },
    {
        text: "Offer 5",
        url: "#",
    },
];

const Marquee = () => {
    return (
        <ReactFastMarquee
            pauseOnHover={true}
            className="bg-black py-2 md:py-3 text-white"
        >
            {offers.map((offer, i) => (
                <React.Fragment key={i}>
                    <Link href={offer.url} className="text-sm font-bold">
                        {offer.text}
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
