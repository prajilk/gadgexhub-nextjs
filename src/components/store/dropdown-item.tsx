import { TransformedCategory } from "@/lib/types/types";
import { ChevronDown } from "lucide-react";

const DropdownItem = ({ item }: { item: TransformedCategory }) => {
  return (
    <li>
      <input
        type="checkbox"
        id={`cat-${item.parent}`}
        className="menu-toggle"
      />
      <label
        htmlFor={`cat-${item.parent}`}
        className="menu-item w-full justify-between"
      >
        <span className="text-sm">{item.parent}</span>
        <span className="menu-icon">
          <ChevronDown size={15} />
        </span>
      </label>

      <div className="menu-item-collapse">
        <div className="min-h-0">
          <ul>
            {item.directChild &&
              item.directChild.map((child, i) => (
                <li key={i}>
                  <label
                    htmlFor={child.parent}
                    className="ml-3 flex cursor-pointer items-center gap-1.5 rounded-md p-2 duration-150 hover:bg-[rgb(var(--gray-4)/var(--tw-bg-opacity))]"
                  >
                    <input type="checkbox" id={child.parent} />
                    {child.parent}
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
