import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full bg-black text-white">
            <div className="max-w-6xl mx-auto py-10 flex justify-between flex-col-reverse gap-7 sm:flex-row">
                <div className="flex flex-col ms-3">
                    <h1 className="text-xl sm:text-3xl font-bold mb-3">
                        GadgeXhub
                    </h1>
                    <p className="text-sm text-[#828282] mb-10">
                        &copy; 2023 - {new Date().getFullYear()} GadgeXhub. All
                        Rights Reserved.
                    </p>
                    <div className="flex gap-5 items-center">
                        <Link
                            href="#"
                            className="text-[#828282] hover:text-white w-fit block duration-200"
                        >
                            <Instagram />
                        </Link>
                        <Link
                            href="#"
                            className="text-[#828282] hover:text-white w-fit block duration-200"
                        >
                            <Youtube size={30} />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-around sm:justify-evenly flex-1">
                    <div>
                        <h2>Store</h2>
                        <ul className="text-[#828282] mt-5">
                            <li className="hover:text-white duration-200 w-fit my-3 text-sm">
                                <Link href="#">Accessories</Link>
                            </li>
                            <li className="hover:text-white duration-200 w-fit my-3 text-sm">
                                <Link href="#">Gadgets</Link>
                            </li>
                            <li className="hover:text-white duration-200 w-fit my-3 text-sm">
                                <Link href="#">Audio/Video</Link>
                            </li>
                            <li className="hover:text-white duration-200 w-fit my-3 text-sm">
                                <Link href="#">Cases & Protections</Link>
                            </li>
                            <li className="hover:text-white duration-200 w-fit my-3 text-sm">
                                <Link href="#">Power & Cables</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>Support</h2>
                        <ul className="text-[#828282] mt-5">
                            <li className="hover:text-white duration-200 w-fit my-3 text-sm">
                                <Link href="/contact-us">Contact us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
