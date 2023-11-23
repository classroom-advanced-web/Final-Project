import ProfileForm from "@/components/profile/ProfileForm";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { formatDate } from '@/lib/utils.ts';

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { user } = useAuth();

  if (!user) return;

  const setEditMode = () => {
    setIsEditMode(true);
  };

  return (
    <main className="container flex max-w-[1024px] flex-col justify-center py-20">
      <h1 className=" text-center text-4xl font-bold">Profile</h1>
      {isEditMode ? (
        <ProfileForm user={user} setIsEditMode={setIsEditMode} />
      ) : (
        <div className="grid grid-cols-1 gap-1">
          <div className="container mx-auto ">
            <div className="mx-auto max-w-2xl rounded-md bg-white p-8 shadow-md">
              <div className="mb-6 flex items-center space-x-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {user.firstName && user.lastName
                      ? user.firstName + " " + user.lastName
                      : "Chưa đặt tên"}
                  </h3>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="mb-2 text-lg font-semibold">Date of Birth:</h4>
                  <p>{formatDate(user.dob)}</p>
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold">Gender:</h4>
                  <p>
                    {user.gender.charAt(0).toUpperCase() +
                      user.gender.slice(1).toLowerCase()}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="rounded-md bg-blue-500 px-4 py-2 text-white"
                  onClick={setEditMode}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
