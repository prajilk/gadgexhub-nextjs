import React from "react";
import Marquee from "./Marquee";
import Link from "next/link";
import TopNav from "./navbarLG/TopNav";
import SidebarNav from "./navbarSM/SidebarNav";
import SearchPopup from "./navbarLG/SearchPopup";
import { ChevronRight, ShoppingCart, UserCircle2 } from "lucide-react";

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
            <div className="badge badge-error badge-xs absolute -top-1 -right-2 translate-y-[-25%] p-2">
                <span className="absolute inset-0 translate-y-[20%]">1</span>
            </div>
        </Link>
    );
};

const Profile = () => {
    return (
        <div className="dropdown dropdown-hover cursor-pointer">
            <label tabIndex={0}>
                <UserCircle2 />
            </label>
            <div className="dropdown-menu w-72 md:w-80 border border-gray-200 rounded-none bg-white p-0 pb-3 cursor-default">
                <div className="flex gap-3 p-5">
                    <UserCircle2 />
                    <Link
                        href="/authentication"
                        className="hover:text-blue-500 hover:underline duration-100"
                    >
                        Sign up
                    </Link>
                    <span>or</span>
                    <Link
                        href="/authentication"
                        className="hover:text-blue-500 hover:underline duration-100"
                    >
                        Sign in
                    </Link>
                </div>
                <div className="divider m-0 h-0"></div>
                <Link
                    href="/orders"
                    className="flex gap-3 py-3 px-5 justify-between hover:bg-gray-100"
                >
                    Orders
                    <ChevronRight />
                </Link>
                <div className="divider m-0 h-0"></div>
                <Link
                    href="/account"
                    className="flex gap-3 py-3 px-5 justify-between hover:bg-gray-100"
                >
                    Account
                    <ChevronRight />
                </Link>
            </div>
        </div>
    );
};

const Navbar = () => {
    return (
        <div className="navbar-sticky">
            <Marquee />
            <div className="navbar py-3.5 p-5 md:px-14">
                <div className="navbar-start w-fit">
                    <Link
                        href="/"
                        className="navbar-item text-2xl md:text-3xl font-bold p-0"
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

                    <div className="flex items-center gap-5 mx-2">
                        <Cart />
                        <Profile />
                    </div>

                    {/* For Small Screen */}
                    <div className="lg:hidden flex gap-3 items-center">
                        <SidebarNav navItems={navItems} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
