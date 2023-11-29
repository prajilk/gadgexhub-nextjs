import ClientLink from "@/components/shared/client-link";
import { NavbarCategories } from "@/lib/types/types";
import { ChevronDown } from "lucide-react";

const DropdownItem = ({ item }: { item: NavbarCategories }) => {
  return (
    <li>
      <input type="checkbox" id={`menu-${item.parent}`} className="toggle" />
      <label
        className="item flex cursor-pointer items-center justify-between gap-2 rounded-lg px-4 py-2 text-sm duration-400 hover:bg-gray-200 active:scale-95"
        htmlFor={`menu-${item.parent}`}
      >
        <span className="text-base font-medium">{item.parent}</span>
        <span className="icon duration-300 active:rotate-90">
          <ChevronDown size={15} />
        </span>
      </label>

      <div className="menu-collapse grid grid-rows-[0fr] overflow-hidden transition-[padding_grid-template-rows]">
        <div className="min-h-0">
          <ul>
            {item.child &&
              item.child.map((child, i) => (
                <li key={i}>
                  <label className="ml-3 flex flex-col gap-2 rounded-lg px-4 py-2 duration-400 hover:bg-gray-200 active:scale-95">
                    <ClientLink
                      htmlFor="drawer-left"
                      redirect={`/store/c/${item.parent
                        .toLowerCase()
                        .replace(/[\/. ]/g, "-")}/${child
                        .toLowerCase()
                        .replace(/[\/. ]/g, "-")}`}
                      className="cursor-pointer p-0 text-sm"
                    >
                      {child}
                    </ClientLink>
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default DropdownItem;
