import { NavbarCategories } from "@/lib/types/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DropdownItem from "./dropdown-item";
import ClientLink from "@/components/shared/client-link";

const SidebarNav = ({ navItems }: { navItems: NavbarCategories[] | null }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className="mb-5 text-left">
          <SheetTitle>GadgeXhub</SheetTitle>
        </SheetHeader>
        <ul className="text-left">
          {navItems?.map((item, i) => <DropdownItem item={item} key={i} />)}
          <div className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-200">
            <ClientLink
              htmlFor="drawer-left"
              redirect="/store"
              className="cursor-pointer p-0 text-base font-medium"
            >
              Store
            </ClientLink>
          </div>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarNav;
