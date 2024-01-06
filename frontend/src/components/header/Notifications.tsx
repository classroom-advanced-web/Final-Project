import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import Loading from '../loading/Loading';
import UserAvatar from '../UserAvatar';
import notificationApi from '@/api/notificationApi';

const SERVER_URL = import.meta.env.VITE_SERVER_HOST as string;
let Sock = new SockJS(`${SERVER_URL}/notifications`);
export const stompClient = over(Sock);

type NotificationInfo = {
  sender: User;
  classroom: Classroom;
  notification: NotificationContent;
};

const mapData = (notification: any): NotificationInfo => {
  return {
    ...notification,
    sender: {
      ...notification.sender,
      firstName: notification.sender.first_name,
      lastName: notification.sender.last_name
    }
  };
};

const Notifications = () => {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState<NotificationInfo[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await notificationApi.getNotifications();
        if (res) {
          const newNotification = res.map((notification: any) => {
            return mapData(notification);
          });
          setNotifications(newNotification);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchNotifications();
      stompClient.connect({}, onConnected, (err: any) => {
        console.log(err);
      });
    }

    // return () => {
    //   stompClient.disconnect(() => {
    //     console.log('disconnected');
    //   });
    // };
  }, []);

  const onConnected = () => {
    console.log('connected');
    if (user) {
      stompClient.subscribe(`/user/${user.id}/receiver`, (message: any) => {
        const messageBody = JSON.parse(message.body);
        const map = {
          ...messageBody,
          sender: {
            ...messageBody.sender,
            firstName: messageBody.sender.first_name,
            lastName: messageBody.sender.last_name
          }
        };
        const newNotifications = [map, ...notifications];
        console.log(newNotifications);
        setNotifications(newNotifications);
      });
      // stompClient.send('/app/notifications', {}, JSON.stringify({ user_id: user.id, message: 'hello' }));
    }
  };

  console.log(notifications);

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
      {notifications.length > 0 &&
        notifications.map((notification) => (
          <DropdownMenuItem className='py-6'>
            <div className='flex items-center gap-3'>
              <UserAvatar keyword={notification.sender.firstName[0]} />
              <div className='flex flex-col gap-1'>
                <h3 className='font-semibold'>
                  {`${notification.sender.firstName} ${notification.sender.lastName}`}:{' '}
                  {notification.notification.title}
                </h3>

                <p className='text-xs text-gray-500'>{notification.classroom.name}</p>
                {/* <p className='text-xs text-gray-500'>{notification.notification.created_at.toISOString()}</p> */}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
    </DropdownMenuContent>
  );
};
export default Notifications;
