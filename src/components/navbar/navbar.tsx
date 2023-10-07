import Marquee from "./marquee";
import Link from "next/link";
import TopNav from "./navbarLG/top-nav";
import SidebarNav from "./navbarSM/sidebar-nav";
import SearchPopup from "./navbarLG/search-popup";
import { ShoppingCart } from "lucide-react";
import Profile from "./profile";
import Drawer from "../cart/drawer";
import { useGlobalContext } from "@/context/store";
import Cart from "./cart";

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
    title: "Store",
    url: "/store",
  },
];

const Navbar = () => {
  return (
    <div className="navbar-sticky">
      <Marquee />
      <div className="navbar border-b py-3.5 shadow-none">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="navbar-start w-fit">
            <Link
              href="/"
              className="navbar-item p-0 text-lg font-semibold md:text-2xl"
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
              <Drawer trigger={<Cart />} />
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
