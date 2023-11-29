import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-black text-white">
      {/* <div className="mx-auto flex max-w-6xl flex-col-reverse justify-between gap-7 px-4 py-10 sm:flex-row"> */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 px-4 py-10 sm:grid-cols-2">
        <div className="order-2 ms-3 flex flex-col">
          <h1 className="mb-3 text-lg font-bold sm:text-xl">GadgeXhub</h1>
          <p className="mb-10 text-xs text-[#828282]">
            &copy; 2023 - {new Date().getFullYear()} GadgeXhub. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="#"
              className="block w-fit text-[#828282] duration-200 hover:text-white"
            >
              <Instagram />
            </Link>
            <Link
              href="#"
              className="block w-fit text-[#828282] duration-200 hover:text-white"
            >
              <Youtube size={30} />
            </Link>
          </div>
        </div>
        <div className="ms-3 grid grid-cols-2 sm:order-3">
          <div>
            <h2 className="text-sm">Store</h2>
            <ul className="mt-5 text-xs text-[#828282]">
              <li className="my-3 w-fit duration-200 hover:text-white">
                <Link href="/store/c/accessories">Accessories</Link>
              </li>
              <li className="my-3 w-fit duration-200 hover:text-white">
                <Link href="/store/c/gadgets">Gadgets</Link>
              </li>
              <li className="my-3 w-fit duration-200 hover:text-white">
                <Link href="/store/c/audio-video">Audio/Video</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm">Support</h2>
            <ul className="mt-5 text-xs text-[#828282]">
              <li className="my-3 w-fit duration-200 hover:text-white">
                <Link href="/contact-us">Contact us</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="flex flex-1 justify-around sm:justify-evenly">
          <div>
            <h2 className="text-sm">Store</h2>
            <ul className="mt-5 text-xs text-[#828282]">
              <li className="my-3 w-fit duration-200 hover:text-white">
                <Link href="/store/c/accessories">Accessories</Link>
              </li>
              <li className="my-3 w-fit duration-200 hover:text-white">
                <Link href="/store/c/gadgets">Gadgets</Link>
              </li>
              <li className="my-3 w-fit duration-200 hover:text-white">
                <Link href="/store/c/audio-video">Audio/Video</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm">Support</h2>
            <ul className="mt-5 text-xs text-[#828282]">
              <li className="my-3 w-fit duration-200 hover:text-white">
                <Link href="/contact-us">Contact us</Link>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
