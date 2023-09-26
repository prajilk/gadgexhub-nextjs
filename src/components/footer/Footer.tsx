import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col-reverse justify-between gap-7 px-4 py-10 sm:flex-row">
        <div className="ms-3 flex flex-col">
          <h1 className="mb-3 text-xl font-bold sm:text-3xl">GadgeXhub</h1>
          <p className="mb-10 text-sm text-[#828282]">
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
        <div className="flex flex-1 justify-around sm:justify-evenly">
          <div>
            <h2>Store</h2>
            <ul className="mt-5 text-[#828282]">
              <li className="my-3 w-fit text-sm duration-200 hover:text-white">
                <Link href="#">Accessories</Link>
              </li>
              <li className="my-3 w-fit text-sm duration-200 hover:text-white">
                <Link href="#">Gadgets</Link>
              </li>
              <li className="my-3 w-fit text-sm duration-200 hover:text-white">
                <Link href="#">Audio/Video</Link>
              </li>
              <li className="my-3 w-fit text-sm duration-200 hover:text-white">
                <Link href="#">Cases & Protections</Link>
              </li>
              <li className="my-3 w-fit text-sm duration-200 hover:text-white">
                <Link href="#">Power & Cables</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Support</h2>
            <ul className="mt-5 text-[#828282]">
              <li className="my-3 w-fit text-sm duration-200 hover:text-white">
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
