import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';

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
        <DropdownMenuContent className='max-h-[720px] w-full overflow-y-auto md:min-w-[480px]'>
          <div className='border-b-[1px] px-1 py-3'>
            <h2>Notifications</h2>
          </div>
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className='py-6'>
              <div className='flex items-center gap-3'>
                <div className='relative h-8 w-8'>
                  <img
                    className='absolute z-0 h-full w-full rounded-full object-cover'
                    src={notification.avatar}
                    alt=''
                  />
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
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default NotificationButton;
