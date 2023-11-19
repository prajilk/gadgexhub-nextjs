import ClientLink from "@/components/shared/client-link";
import { NavbarCategories } from "@/lib/types/types";
import { ChevronDown } from "lucide-react";

const DropdownItem = ({ item }: { item: NavbarCategories }) => {
  return (
    <li>
      <input
        type="checkbox"
        id={`menu-${item.parent}`}
        className="menu-toggle"
      />
      <label
        className="menu-item justify-between"
        htmlFor={`menu-${item.parent}`}
      >
        <span className="text-base font-medium">{item.parent}</span>
        <span className="menu-icon">
          <ChevronDown size={15} />
        </span>
      </label>

      <div className="menu-item-collapse">
        <div className="min-h-0">
          <ul>
            {item.child &&
              item.child.map((child, i) => (
                <li key={i}>
                  <label className="menu-item ml-3">
                    <ClientLink
                      htmlFor="drawer-left"
                      redirect={`/store/c/${item.parent
                        .toLowerCase()
                        .replace(/[\/. ]/g, "-")}/${child
                        .toLowerCase()
                        .replace(/[\/. ]/g, "-")}`}
                      className="p-0 text-sm"
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
