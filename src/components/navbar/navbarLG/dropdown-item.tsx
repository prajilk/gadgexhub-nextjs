import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { NavbarCategories } from "@/lib/types/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const DropdownItem = ({ item }: { item: NavbarCategories }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mx-3 outline-none" asChild>
        <span className="flex cursor-pointer items-center gap-2 text-sm font-medium hover:text-gray-500">
          {item.parent}
          <ChevronDown size={15} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]">
        {item.child &&
          item.child.map((child, i) => (
            <DropdownMenuItem key={i} asChild className="cursor-pointer p-3">
              <Link
                href={`/store/c/${item.parent
                  .toLowerCase()
                  .replace(/[\/. ]/g, "-")}/${child
                  .toLowerCase()
                  .replace(/[\/. ]/g, "-")}`}
                className="text-sm"
              >
                {child}
              </Link>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownItem;
