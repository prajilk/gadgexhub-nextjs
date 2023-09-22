import { authOptions } from "@/lib/auth";
import { LayoutProps } from "@/lib/types/ui";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const PrivateLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/authentication");
  return <>{children}</>;
};

export default PrivateLayout;
