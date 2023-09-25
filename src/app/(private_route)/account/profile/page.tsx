import ProfileForm from "@/components/form/ProfileForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/authentication");
  return (
    <div className=" mx-3">
      <div className="mx-auto max-w-lg rounded-sm bg-white p-5 shadow-md">
        <ProfileForm id={session?.user.id} />
      </div>
    </div>
  );
};

export default Profile;
