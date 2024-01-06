import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Loading from '../loading/Loading';
import Notifications from './Notifications';

const data = [
  {
    id: 1,
    name: 'Toan Tran',
    avatar: 'https://singlecolorimage.com/get/bf360c/100x100',
    content: 'Đã tạo bảng điểm mới',
    time: '2 giờ trước',
    className: 'Advanced Web'
  },
  {
    id: 2,
    name: 'Toan Tran',
    avatar: 'https://singlecolorimage.com/get/bf360c/100x100',
    content: 'Đã tạo bảng điểm mới',
    time: '2 giờ trước',
    className: 'Advanced Web'
  },
  {
    id: 3,
    name: 'Toan Tran',
    avatar: 'https://singlecolorimage.com/get/bf360c/100x100',
    content: 'Đã tạo bảng điểm mới',
    time: '2 giờ trước',
    className: 'Advanced Web'
  },
  {
    id: 4,
    name: 'Toan Tran',
    avatar: 'https://singlecolorimage.com/get/bf360c/100x100',
    content: 'Đã tạo bảng điểm mới',
    time: '2 giờ trước',
    className: 'Advanced Web'
  }
];

const NotificationButton = () => {
  const [notifications, setNotifications] = useState(data);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='right-6 focus-within:outline-none'>
          <span className='text-xl'>
            <IoMdNotificationsOutline />
          </span>
        </DropdownMenuTrigger>
        <Notifications />
      </DropdownMenu>
    </>
  );
};
export default NotificationButton;
