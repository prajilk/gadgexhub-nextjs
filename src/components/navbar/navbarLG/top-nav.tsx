import Link from "next/link";
import DropdownItem from "./dropdown-item";
import { NavbarCategories } from "@/lib/types/types";

const TopNav = ({ navItems }: { navItems: NavbarCategories[] | null }) => {
  return (
    <ul className="flex items-center">
      {navItems?.map((item, i) => <DropdownItem item={item} key={i} />)}
      <div className="navbar-item">
        <Link
          href={"/store"}
          className="p-0 text-sm font-medium hover:text-gray-500"
        >
          Store
        </Link>
      </div>
    </ul>
  );
};

export default TopNav;
