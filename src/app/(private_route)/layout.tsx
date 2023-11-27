import Profile from "@/components/navbar/profile";
import ShowPrivateNavbar from "@/components/navbar/show-private-navbar";
import { authOptions } from "@/lib/auth";
import { LayoutProps } from "@/lib/types/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const PrivateLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(`/authentication`);
  return (
    <>
      <ShowPrivateNavbar>
        <nav className="mb-5 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
            <Link href="/">
              <h1 className="text-lg font-semibold md:text-2xl">GadgeXhub</h1>
            </Link>
            <Profile session={session} />
          </div>
        </nav>
      </ShowPrivateNavbar>
      <main>{children}</main>
    </>
  );
};

export default PrivateLayout;
