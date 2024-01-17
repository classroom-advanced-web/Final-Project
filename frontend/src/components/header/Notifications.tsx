import notificationApi from '@/api/notificationApi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import useNotification, { NotificationInfo } from '@/hooks/useNotification';
import { timeAgo } from '@/lib/utils';
import { useEffect } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import UserAvatar from '../UserAvatar';
import Loading from '../loading/Loading';

export let stompClient: Client | null = null;

const Notifications = () => {
  const { user, loading } = useAuth();

  const { notifications, isLoading } = useNotification();
  const queryClient = useQueryClient();

  useEffect(() => {
    const SERVER_URL = import.meta.env.VITE_SERVER_HOST as string;
    let Sock = new SockJS(`${SERVER_URL}/notifications`);
    stompClient = over(Sock);

    if (user && stompClient) {
      // fetchNotifications();
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
    if (user && stompClient) {
      stompClient.subscribe(`/user/${user.id}/receiver`, () => {
        // const messageBody = JSON.parse(message.body);
        queryClient.invalidateQueries('notifications');
      });
    }
  };

  const navigate = useNavigate();

  const handleGoToNotificationLocation = (classroomId: String, notificationTitle: String, content: string) => {
    switch (notificationTitle) {
      case 'New Grade Structure':
        navigate(`/structure/${classroomId}`);
        break;
      case 'Update Grade Structure':
        navigate(`/structure/${classroomId}`);
        break;
      case 'Finalize Grade Structure':
        navigate(`/grades/${classroomId}`);
        break;
      case 'Reply from teacher':
        navigate(`/grades-review/${classroomId}/${content}`);
        break;
      case 'End Grade Request Review':
        navigate(`/grades-review/${classroomId}/${content}`);
        break;

      case 'Request a review':
        navigate(`/request-reviews/${classroomId}?id=${content}`);

        break;

      case 'Your Student Replied':
        navigate(`/request-reviews/${classroomId}?id=${content}`);
        break;

      default:
        break;
    }
  };

  if (loading || isLoading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  if (!notifications) {
    return null;
  }

  const hasNewNotification = notifications.some(
    (notification: NotificationInfo) => notification.notification.is_read === false
  );

  const handleMarkAllAsRead = async () => {
    try {
      const res = await notificationApi.markAsRead();
      if (res) {
        queryClient.invalidateQueries('notifications');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className='relative text-xl'>
            {hasNewNotification && (
              <span className='absolute right-[-2px] top-[-4px] h-2 w-2 rounded-full bg-blue-500'></span>
            )}
            <IoMdNotificationsOutline />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='relative max-h-[720px] w-full overflow-y-auto md:min-w-[480px]'>
          <div className='border-b-[1px] px-1 py-3'>
            <h2>Notifications</h2>
          </div>
          {notifications.length > 0 &&
            notifications.map((notification: NotificationInfo) => (
              <DropdownMenuItem
                className='py-6'
                onClick={() => {
                  handleGoToNotificationLocation(
                    notification.classroom.id,
                    notification.notification.title,
                    notification.notification.content
                  );
                  console.log({ notification });
                  handleMarkAllAsRead();
                }}
              >
                <div className='flex items-center gap-3'>
                  <UserAvatar keyword={notification.sender.firstName[0]} />
                  <div className='flex flex-col gap-1'>
                    <h3 className='font-semibold'>
                      {`${notification.sender.firstName} ${notification.sender.lastName}`}:{' '}
                      {notification.notification.title}
                    </h3>

                    <p className='text-xs text-gray-500'>{notification.classroom.name}</p>
                    <p className='text-xs text-gray-500'>{timeAgo(notification.notification.created_at)}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default Notifications;
