import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Account = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/authentication");
  return (
    <div className="my-28 flex items-center font-black">
      <h1>Hello user {session.user.username}</h1>
    </div>
  );
};

export default Account;
