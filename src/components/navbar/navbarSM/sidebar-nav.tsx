import { Menu } from "lucide-react";
import DropdownItem from "./dropdown-item";
import Link from "next/link";
import { NavbarCategories } from "@/lib/types/types";
import ClientLink from "@/components/shared/client-link";

const SidebarNav = ({ navItems }: { navItems: NavbarCategories[] | null }) => {
  return (
    <>
      <input type="checkbox" id="drawer-left" className="drawer-toggle" />

      <label htmlFor="drawer-left">
        <Menu />
      </label>
      <label
        style={{ height: "100vh" }}
        className="overlay"
        htmlFor="drawer-left"
      ></label>
      <div className="drawer">
        <div className="drawer-content flex h-full flex-col pt-10">
          <label
            htmlFor="drawer-left"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="mb-5 text-xl font-bold">GadgeXhub</h2>
          <ul>
            {navItems?.map((item, i) => <DropdownItem item={item} key={i} />)}
            <div className="menu-item">
              <ClientLink
                htmlFor="drawer-left"
                redirect="/store"
                className="p-0 text-base font-medium"
              >
                Store
              </ClientLink>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
