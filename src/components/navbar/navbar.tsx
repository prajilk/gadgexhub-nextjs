import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/navbar";
import Marquee from "./marquee";
import Link from "next/link";
import DropdownContainer from "./dropdown";
import { getNavbarCategories } from "@/lib/api/get-category-tree";
import { Button } from "@nextui-org/button";
import { getFilteredProduct } from "@/lib/api/products/get-filtered-products";
import Drawer from "../cart/drawer";
import Profile from "./profile";
import SidebarNav from "./navbarSM/sidebar-nav";
import Search from "./search";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Navbar() {
  const navItems = await getNavbarCategories();
  const session = await getServerSession(authOptions);
  const popular = await getFilteredProduct({
    category: "popular",
    sort: "popular",
  });

  return (
    <>
      <Marquee />
      <NextNavbar
        shouldHideOnScroll
        classNames={{
          wrapper:
            "h-auto max-w-6xl px-2 py-3.5 xl:px-0 flex flex-col items-start",
        }}
      >
        <div className="flex w-full items-center">
          <NavbarBrand className="flex-grow-0">
            <Link
              href="/"
              className="navbar-item p-0 text-lg font-semibold md:text-2xl"
            >
              GadgeXhub
            </Link>
          </NavbarBrand>
          <NavbarContent
            className="me-3 hidden flex-1 ps-5 md:block"
            justify="center"
          >
            <Search bestSeller={popular} />
          </NavbarContent>
          <NavbarContent
            className="flex items-center gap-4 md:!flex-grow-0"
            justify="end"
          >
            <div className="hidden gap-4 lg:flex">
              {navItems?.map((item, i) => (
                <DropdownContainer child={item.child} key={i}>
                  {item.parent}
                </DropdownContainer>
              ))}
              <Button
                disableRipple
                className="min-w-0 bg-transparent p-0 font-medium data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                <Link href={"/store"}>Store</Link>
              </Button>
            </div>
            <div className="flex items-center gap-5">
              <Drawer />
              {session ? (
                <Profile session={session} />
              ) : (
                <Button
                  disableRipple
                  className="min-w-0 bg-transparent p-0 font-medium data-[hover=true]:bg-transparent"
                  radius="sm"
                  variant="light"
                >
                  <Link href={"/authentication"}>Login</Link>
                </Button>
              )}
            </div>

            {/* For Small Screen */}
            <div className="flex items-center gap-3 lg:hidden">
              <SidebarNav navItems={navItems} />
            </div>
          </NavbarContent>
        </div>
        <div className="w-full px-3 md:hidden">
          <Search bestSeller={popular} />
        </div>
      </NextNavbar>
    </>
  );
}
