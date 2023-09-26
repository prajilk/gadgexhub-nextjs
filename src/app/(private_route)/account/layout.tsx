import { authOptions } from "@/lib/auth";
import { LayoutProps } from "@/lib/types/types";
import { ChevronRight, UserCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Layout = async ({ children }: LayoutProps) => {
  return (
    <>
      <nav className="mb-5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/">
            <h1 className="text-lg font-bold md:text-xl">GadgeXhub</h1>
          </Link>
          <Profile />
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
};

const Profile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="dropdown dropdown-hover cursor-pointer">
      <label tabIndex={0}>
        <UserCircle />
      </label>
      <div className="dropdown-menu w-72 cursor-default rounded-none border border-gray-200 bg-white p-0 pb-3 md:w-80">
        <div className="flex items-center gap-3 p-5">
          <UserCircle />
          {session && (
            <div className="flex flex-col">
              <Link href="/account">{session.user.name}</Link>
              <Link
                href="/signout"
                className="text-xs hover:text-destructive hover:underline"
              >
                Sign out
              </Link>
            </div>
          )}
        </div>
        <div className="divider m-0 h-0"></div>
        <Link
          href="/orders"
          className="flex justify-between gap-3 px-5 py-3 hover:bg-gray-100"
        >
          Orders
          <ChevronRight />
        </Link>
        <div className="divider m-0 h-0"></div>
        <Link
          href="/account"
          className="flex justify-between gap-3 px-5 py-3 hover:bg-gray-100"
        >
          Account
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default Layout;
