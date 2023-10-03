import ProfileForm from "@/components/form/profile-form";

const Profile = async () => {
  return (
    <div className="mx-3">
      <div className="mx-auto max-w-lg rounded-sm bg-white p-5 shadow-md">
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
