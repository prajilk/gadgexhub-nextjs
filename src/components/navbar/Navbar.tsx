import Marquee from "./Marquee";
import Link from "next/link";
import TopNav from "./navbarLG/TopNav";
import SidebarNav from "./navbarSM/SidebarNav";
import SearchPopup from "./navbarLG/SearchPopup";
import { ShoppingCart } from "lucide-react";
import Profile from "./Profile";

const navItems = [
  {
    title: "Accessories",
    subItems: [
      { title: "Gaming Accessories", url: "/store/gaming-accessories" },
      {
        title: "Computer Accessories",
        url: "/store/computer-accessories",
      },
      { title: "Laptop Accessories", url: "/store/laptop-accessories" },
      {
        title: "Mobile & Tablet Accessories",
        url: "/store/mobile-tablet-accessories",
      },
      { title: "Power Banks", url: "/store/power-banks" },
    ],
  },
  {
    title: "Gadgets",
    subItems: [
      { title: "Gadget 1", url: "/store/gadget-1" },
      { title: "Gadget 2", url: "/store/gadget-2" },
      { title: "Gadget 3", url: "/store/gadget-3" },
    ],
  },
  {
    title: "Audio/Video",
    subItems: [
      { title: "Headphones", url: "/store/headphones" },
      { title: "Earphones", url: "/store/earphones" },
      { title: "Speakers", url: "/store/speakers" },
      { title: "Bluetooth Speakers", url: "/store/bluetooth-speakers" },
    ],
  },
  {
    title: "Contact Us",
    url: "/contact-us",
  },
];

const Cart = () => {
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart />
      <div className="badge badge-error badge-xs absolute -right-2 -top-1 translate-y-[-25%] p-2">
        <span className="absolute inset-0 translate-y-[20%]">1</span>
      </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className="navbar-sticky">
      <Marquee />
      <div className="navbar py-3.5">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="navbar-start w-fit">
            <Link
              href="/"
              className="navbar-item p-0 text-2xl font-bold md:text-3xl"
            >
              GadgeXhub
            </Link>
          </div>
          <div className="navbar-end">
            <SearchPopup />
            {/* For Large Screens */}
            <div className="hidden lg:block">
              <TopNav navItems={navItems} />
            </div>

            <div className="mx-2 flex items-center gap-5">
              <Cart />
              <Profile />
            </div>

            {/* For Small Screen */}
            <div className="flex items-center gap-3 lg:hidden">
              <SidebarNav navItems={navItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
