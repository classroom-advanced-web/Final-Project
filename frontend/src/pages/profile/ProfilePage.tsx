import authApi from '@/api/authApi';
import ProfileForm from '@/components/profile/ProfileForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn, formatDate } from '@/lib/utils.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return;

  const setEditMode = () => {
    setIsEditMode(true);
  };

  const handleActivateClick = async () => {
    setLoading(true);
    try {
      const res = await authApi.requestOtp({ email: user.email });
      navigate(`/redeem?action=activate&email=${user.email}`, {
        state: { id: res.otp_id, accessToken: res.access_token }
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='container flex max-w-[1024px] flex-col justify-center py-20'>
      <h1 className=' text-center text-4xl font-bold'>Profile</h1>
      {isEditMode ? (
        <ProfileForm user={user} setIsEditMode={setIsEditMode} />
      ) : (
        <div className='grid grid-cols-1 gap-1'>
          <div className='container mx-auto '>
            <div className='mx-auto max-w-2xl rounded-md bg-white p-8 shadow-md'>
              <div className='mb-6 flex items-center space-x-4'>
                <div className=' grid w-full grid-cols-2 gap-4'>
                  <div className='flex flex-col justify-between'>
                    <h3 className='text-xl font-semibold'>
                      {user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : 'Chưa đặt tên'}
                    </h3>
                    <p className='mb-2 truncate text-lg font-semibold' title={user.email}>
                      {user.email}
                    </p>
                  </div>

                  <div className='flex flex-col'>
                    <h4 className='mb-2 text-lg font-semibold'> Status: </h4>
                    <span className={cn('', user.activated && '', !user.activated && '')}>
                      {user.activated ? (
                        `Activated 🟢`
                      ) : (
                        <span>
                          Not activated 🔴
                          <Button
                            disabled={loading}
                            variant='outline'
                            className='ml-2 text-sm text-blue-500 underline transition hover:text-blue-400'
                            onClick={handleActivateClick}
                          >
                            {loading ? 'Please wait...' : 'Activate'}
                          </Button>
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='mb-2 text-lg font-semibold'>Date of Birth:</h4>
                  <p>{formatDate(user.dob)}</p>
                </div>
                <div>
                  <h4 className='mb-2 text-lg font-semibold'>Gender:</h4>
                  <p>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1).toLowerCase()}</p>
                </div>
              </div>
              <div className='mt-5 grid grid-cols-2 gap-4'>
                <div>
                  <h4 className='mb-2 text-lg font-semibold'>Student ID:</h4>
                  <p>{user.student_id}</p>
                </div>
              </div>

              <div className='mt-8'>
                <button className='rounded-md bg-blue-500 px-4 py-2 text-white' onClick={setEditMode}>
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
