import Container from "@/components/container";
import LinkButton from "@/components/shared/link-button";
import { authOptions } from "@/lib/auth";
import { AccountCardProps } from "@/lib/types/types";
import { ChevronRight, MapPin, Package, User2 } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Card = ({ icon, title }: AccountCardProps) => {
  return (
    <div className="flex justify-between rounded-md border bg-white p-5">
      <div className="flex gap-3">
        {icon}
        <h2 className="font-medium">{title}</h2>
      </div>
      <ChevronRight />
    </div>
  );
};

const Account = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/authentication");
  return (
    <Container className="flex flex-col justify-center px-3 font-semibold">
      <h1 className="text-xl">Hey! {session.user.name}</h1>
      <hr className="my-5 border-gray-300" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Link href={`/account/profile`}>
          <Card icon={<User2 />} title="Edit profile" />
        </Link>
        <Link href="/orders">
          <Card icon={<Package />} title="My Orders" />
        </Link>
        <Link href="/account/address">
          <Card icon={<MapPin />} title="Manage Address" />
        </Link>
      </div>
      <hr className="my-5 border-gray-300" />
      <LinkButton href="/signout" className="md:w-fit">
        Sign out
      </LinkButton>
    </Container>
  );
};

export default Account;
