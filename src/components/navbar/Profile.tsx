import { ChevronRight, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none" asChild>
        <UserCircle />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[250px] p-2" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            <UserCircle />
            {session ? (
              <div className="flex flex-col">
                <Link href="/account">{session.user.name}</Link>
                <Link
                  href="/signout"
                  className="w-fit text-xs hover:text-destructive hover:underline"
                >
                  Sign out
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/authentication"
                  className="duration-100 hover:text-blue-500 hover:underline"
                >
                  Sign up
                </Link>
                <span>or</span>
                <Link
                  href="/authentication"
                  className="duration-100 hover:text-blue-500 hover:underline"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer py-3" asChild>
          <Link
            href="/orders"
            className="flex w-full items-center justify-between py-2"
          >
            Orders
            <ChevronRight size={20} />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer py-3" asChild>
          <Link
            href="/account"
            className="flex w-full items-center justify-between"
          >
            Account
            <ChevronRight size={20} />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
