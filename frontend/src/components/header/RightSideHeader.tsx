import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import { Button } from '../ui/button';
import AddClassButton from './AddClassButton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import NotificationButton from './NotificationButton';

const RightSideHeader = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Button variant='ghost'>
        <Link to='/login'>Sign in</Link>
      </Button>
    );
  }

  return (
    <div className='flex items-center gap-3'>
      {user && <NotificationButton />}
      {user && <AddClassButton />}
      <DropdownMenu>
        <DropdownMenuTrigger className=' focus-within:outline-none'>
          <div className='flex items-center gap-2'>
            <h3>
              {user.firstName && user.lastName
                ? `
              ${user.firstName} ${user.lastName}
            `
                : 'Chưa đặt tên'}
            </h3>
            {user.firstName && user.lastName && (
              <Avatar className='relative h-8 w-8'>
                <AvatarImage className='absolute z-0' src='https://singlecolorimage.com/get/bf360c/100x100' />
                <h3 className='z-1 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-lg font-semibold text-white'>
                  {user.firstName[0].toUpperCase()}
                </h3>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-fit px-4 py-5 lg:min-w-[240px]'>
          <ul className='flex flex-col justify-evenly gap-5'>
            <li className=''>
              <Link to='/profile' className='w-full'>
                <Button variant='link' size={'lg'} className='grid w-full grid-cols-2 gap-4'>
                  <User size={20} className='ml-8' />
                  <span className='mr-auto'>Profile</span>
                </Button>
              </Link>
            </li>
            <li>
              <Button variant='link' size={'lg'} className='grid w-full grid-cols-2 gap-4' onClick={handleLogOutClick}>
                <LogOut size={20} className='ml-8' />
                <span className='mr-auto'>Log out</span>
              </Button>
            </li>
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default RightSideHeader;
