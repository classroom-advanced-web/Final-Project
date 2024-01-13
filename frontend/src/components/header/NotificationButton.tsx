import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Notifications from './Notifications';

const NotificationButton = () => {
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
