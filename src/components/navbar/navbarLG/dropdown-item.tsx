import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { DropdownItemProps } from "@/lib/types/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const DropdownItem = ({ item }: { item: DropdownItemProps }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mx-3 outline-none" asChild>
        <span className="flex cursor-pointer items-center gap-2 text-sm font-medium hover:text-gray-500">
          {item.title}
          <ChevronDown size={15} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {item.subItems &&
          item.subItems.map((item, i) => (
            <DropdownMenuItem key={i} asChild className="cursor-pointer p-3">
              <Link href={item.url} className="text-sm">
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownItem;
