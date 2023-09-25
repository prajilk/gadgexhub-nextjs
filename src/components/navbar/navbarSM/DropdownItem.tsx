import { DropdownItemProps } from "@/lib/types/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const DropdownItem = ({ item }: { item: DropdownItemProps }) => {
  return (
    <li>
      <input
        type="checkbox"
        id={`menu-${item.title}`}
        className="menu-toggle"
      />
      <label
        className="menu-item justify-between"
        htmlFor={`menu-${item.title}`}
      >
        <span className="text-base font-medium">{item.title}</span>
        <span className="menu-icon">
          <ChevronDown size={15} />
        </span>
      </label>

      <div className="menu-item-collapse">
        <div className="min-h-0">
          <ul>
            {item.subItems &&
              item.subItems.map((subitem, i) => (
                <li key={i}>
                  <label className="menu-item ml-3">
                    <Link href={subitem.url} className="p-0 text-sm">
                      {subitem.title}
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
