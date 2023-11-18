import { NavbarCategories } from "@/lib/types/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

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
                    <Link
                      href={`/store/c/${item.parent
                        .toLowerCase()
                        .replace(/[\/. ]/g, "-")}/${child
                        .toLowerCase()
                        .replace(/[\/. ]/g, "-")}`}
                      className="p-0 text-sm"
                    >
                      {child}
                    </Link>
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
