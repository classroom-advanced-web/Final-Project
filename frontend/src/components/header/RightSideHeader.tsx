import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import UserAvatar from '../UserAvatar';
import Loading from '../loading/Loading';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import AddClassButton from './AddClassButton';
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
            {user && <UserAvatar keyword={user.firstName[0]} />}
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
