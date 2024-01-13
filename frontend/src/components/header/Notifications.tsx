import notificationApi from '@/api/notificationApi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { Classroom, NotificationContent, User } from '@/type';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import UserAvatar from '../UserAvatar';
import Loading from '../loading/Loading';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { timeAgo } from '@/lib/utils';
import { Button } from '../ui/button';

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

export let stompClient: Client | null = null;

const Notifications = () => {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState<NotificationInfo[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const SERVER_URL = import.meta.env.VITE_SERVER_HOST as string;
    let Sock = new SockJS(`${SERVER_URL}/notifications`);
    stompClient = over(Sock);
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

    if (user && stompClient) {
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
    if (user && stompClient) {
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
        setNotifications(newNotifications);
      });
    }
  };

  const navigate = useNavigate();

  const handleGoToNotificationLocation = (classroomId: String, notificationTitle: String) => {
    if (notificationTitle === 'New Grade Structure') {
      navigate(`/structure/${classroomId}`);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  const hasNewNotification = notifications.some((notification) => notification.notification.is_read === false);

  const handleMarkAllAsRead = async () => {
    // setOpen(true);
    try {
      // const res = await notificationApi.markAsRead();
      // if (res) {
      //   const newNotification = res.map((notification: any) => {
      //     return mapData(notification);
      //   });
      //   setNotifications(newNotification);
      // }
      console.log('test');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant='ghost' onClick={handleMarkAllAsRead}>
        <span className='relative text-xl'>
          {hasNewNotification && (
            <span className='absolute right-[-2px] top-[-4px] h-2 w-2 rounded-full bg-blue-500'></span>
          )}
          <IoMdNotificationsOutline />
        </span>
      </Button>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuContent className='relative max-h-[720px] w-full overflow-y-auto md:min-w-[480px]'>
          <div className='border-b-[1px] px-1 py-3'>
            <h2>Notifications</h2>
          </div>
          {notifications.length > 0 &&
            notifications.map((notification) => (
              <DropdownMenuItem
                className='py-6'
                onClick={() =>
                  handleGoToNotificationLocation(notification.classroom.id, notification.notification.title)
                }
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
