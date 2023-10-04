import Profile from "@/components/navbar/profile";
import { LayoutProps } from "@/lib/types/types";
import Link from "next/link";

const Layout = async ({ children }: LayoutProps) => {
  return (
    <>
      <nav className="mb-5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/">
            <h1 className="text-lg font-semibold md:text-2xl">GadgeXhub</h1>
          </Link>
          <Profile />
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
