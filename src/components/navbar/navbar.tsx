import Marquee from "./marquee";
import Link from "next/link";
import TopNav from "./navbarLG/top-nav";
import SidebarNav from "./navbarSM/sidebar-nav";
import SearchPopup from "./navbarLG/search-popup";
import Profile from "./profile";
import Drawer from "../cart/drawer";
import Cart from "./cart";
import { getNavbarCategories } from "@/lib/api/get-category-tree";

const Navbar = async () => {
  const navItems = await getNavbarCategories();

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
