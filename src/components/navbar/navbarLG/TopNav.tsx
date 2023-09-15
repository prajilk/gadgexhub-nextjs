import Link from "next/link";
import DropdownItem from "./DropdownItem";

type TopNavProps = {
    title: string;
    subItems?: {
        title: string;
        url: string;
    }[];
    url?: string;
};

const TopNav = ({ navItems }: { navItems: TopNavProps[] }) => {
    return (
        <ul className="flex">
            {navItems.map((item, i) =>
                item.subItems ? (
                    <DropdownItem item={item} key={i} />
                ) : (
                    <div className="navbar-item" key={i}>
                        <Link
                            href={item.url ? item.url : "/"}
                            className="font-medium p-0"
                        >
                            {item.title}
                        </Link>
                    </div>
                )
            )}
        </ul>
    );
};

export default TopNav;
