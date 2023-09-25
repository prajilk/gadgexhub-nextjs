import { Menu } from "lucide-react";
import DropdownItem from "./DropdownItem";
import Link from "next/link";
import { NavProps } from "@/lib/types/types";

const SidebarNav = ({ navItems }: { navItems: NavProps[] }) => {
  return (
    <>
      <input type="checkbox" id="drawer-left" className="drawer-toggle" />

      <label htmlFor="drawer-left" className="">
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
            {navItems.map((item, i) =>
              item.subItems ? (
                <DropdownItem item={item} key={i} />
              ) : (
                <div className="menu-item" key={i}>
                  <Link
                    href={item.url ? item.url : "/"}
                    className="p-0 text-base font-medium"
                  >
                    {item.title}
                  </Link>
                </div>
              ),
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
