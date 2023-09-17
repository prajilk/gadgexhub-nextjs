import React from "react";
import Marquee from "./Marquee";
import Link from "next/link";
import TopNav from "./navbarLG/TopNav";
import SidebarNav from "./navbarSM/SidebarNav";
import SearchPopup from "./navbarLG/SearchPopup";
import Cart from "./Cart";
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

const Navbar = () => {
    return (
        <div className="navbar-sticky">
            <Marquee />
            <div className="navbar py-3.5 px-14">
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
