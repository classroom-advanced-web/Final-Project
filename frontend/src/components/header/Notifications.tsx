import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import Loading from '../loading/Loading';
import { useEffect } from 'react';
import axios from '@/api/axiosConfig';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

const SERVER_URL = import.meta.env.VITE_SERVER_HOST as string;
let Sock = new SockJS('http://localhost:5000/api/v1/notifications');
const stompClient = over(Sock);

const Notifications = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    stompClient.connect({}, onConnected, (err: any) => {
      console.log(err);
    });
  }, []);

  const onConnected = () => {
    console.log('connected');
    if (user) {
      stompClient.subscribe(`/user/${user.id}/receiver`, (message: any) => {
        console.log(message);
      });
      stompClient.send('/app/notifications', {}, JSON.stringify({ user_id: user.id, message: 'hello' }));
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }
  return (
    <DropdownMenuContent className='max-h-[720px] w-full overflow-y-auto md:min-w-[480px]'>
      <div className='border-b-[1px] px-1 py-3'>
        <h2>Notifications</h2>
      </div>
      {/* {notifications.map((notification) => (
        <DropdownMenuItem key={notification.id} className='py-6'>
          <div className='flex items-center gap-3'>
            <div className='relative h-8 w-8'>
              <img className='absolute z-0 h-full w-full rounded-full object-cover' src={notification.avatar} alt='' />
              <h3 className='z-1 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-lg font-semibold text-white'>
                {notification.name[0].toUpperCase()}
              </h3>
            </div>
            <div className='flex flex-col gap-1'>
              <h3 className='font-semibold'>
                {notification.name}: {notification.content}
              </h3>

              <p className='text-xs text-gray-500'>{notification.className}</p>
              <p className='text-xs text-gray-500'>{notification.time}</p>
            </div>
          </div>
        </DropdownMenuItem>
      ))} */}
    </DropdownMenuContent>
  );
};
export default Notifications;
