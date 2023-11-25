"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { LogOut, Package, UserCircle } from "lucide-react";
import { Session } from "next-auth";

const Profile = ({ session }: { session: Session }) => {
  return (
    <Dropdown className="border bg-white">
      <DropdownTrigger className="cursor-pointer">
        <UserCircle />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" href="/account" textValue="Signed In">
          <b className="font-medium">
            Signed in as <br /> {session.user.email}
          </b>
        </DropdownItem>
        <DropdownItem
          key="account"
          href="/account"
          color="secondary"
          startContent={<UserCircle />}
        >
          Account
        </DropdownItem>
        <DropdownItem
          key="orders"
          href="/orders"
          color="secondary"
          startContent={<Package />}
        >
          Orders
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          href="/signout"
          startContent={<LogOut />}
        >
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Profile;
