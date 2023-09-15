import { ChevronDown } from "lucide-react";
import Link from "next/link";

type DropdownItemProps = {
    title: string;
    subItems?: {
        title: string;
        url: string;
    }[];
};

const DropdownItem = ({ item }: { item: DropdownItemProps }) => {
    return (
        <div className="dropdown dropdown-hover">
            <label
                className="navbar-item font-medium flex items-center gap-2"
                tabIndex={0}
            >
                <span>{item.title}</span>
                <ChevronDown size={15} />
            </label>
            <div className="dropdown-menu border border-gray-200">
                <ul className="menu-items">
                    {item.subItems &&
                        item.subItems.map((item, i) => (
                            <li className="dropdown-item" key={i}>
                                <Link href={item.url} className="p-0 text-sm">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default DropdownItem;
