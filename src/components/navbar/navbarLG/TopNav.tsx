import Link from "next/link";
import DropdownItem from "./DropdownItem";
import { NavProps } from "@/lib/types/types";

const TopNav = ({ navItems }: { navItems: NavProps[] }) => {
  return (
    <ul className="flex items-center">
      {navItems.map((item, i) =>
        item.subItems ? (
          <DropdownItem item={item} key={i} />
        ) : (
          <div className="navbar-item" key={i}>
            <Link
              href={item.url ? item.url : "/"}
              className="p-0 text-sm font-medium hover:text-gray-500"
            >
              {item.title}
            </Link>
          </div>
        ),
      )}
    </ul>
  );
};

export default TopNav;
