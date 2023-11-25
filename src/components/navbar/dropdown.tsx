"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { NavbarItem } from "@nextui-org/navbar";
import { ChevronDown } from "lucide-react";

const DropdownContainer = ({
  children,
  child,
}: {
  children: React.ReactNode;
  child: string[];
}) => {
  return (
    <Dropdown className="rounded-lg border bg-white">
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="bg-transparent p-0 font-medium data-[hover=true]:bg-transparent"
            endContent={<ChevronDown size={15} />}
            radius="sm"
            variant="light"
          >
            {children}
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        variant="flat"
        aria-label={`GadgeXhub ${children}`}
        className="w-[240px] bg-white"
        itemClasses={{
          base: "gap-4",
        }}
      >
        {child.map((item, i) => (
          <DropdownItem key={i} className="py-2">
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownContainer;
