import notificationApi from '@/api/notificationApi';
import { Classroom, NotificationContent, User } from '@/type';
import { useQuery } from 'react-query';

export type NotificationInfo = {
  sender: User;
  classroom: Classroom;
  notification: NotificationContent;
};

const useNotification = () => {
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

  const { data: notifications, isLoading } = useQuery('notifications', async () => {
    const res = await notificationApi.getNotifications();
    if (res) {
      const newNotification = res.map((notification: any) => {
        return mapData(notification);
      });
      newNotification.sort((a: any, b: any) => {
        return new Date(b.notification.created_at).getTime() - new Date(a.notification.created_at).getTime();
      });
      return newNotification;
    }
  });

  return { notifications, isLoading };
};
export default useNotification;
