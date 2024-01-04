import { Link, useLocation } from 'react-router-dom';
import RightSideHeader from './RightSideHeader';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import MobileSideBar from './MobileSideBar';

const Header = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  return (
    <header className='sticky top-0 w-full border-b-[1px] bg-white py-5 shadow-sm'>
      <div className='container flex items-center gap-10'>
        {user && <MobileSideBar />}
        <h2 className='text-xl font-bold md:text-3xl'>
          <Link to='/'>Classroom</Link>
        </h2>
        {user && (
          <nav className='hidden items-center gap-5 md:flex '>
            <Link to='/' className={cn('text-xl font-semibold', pathname === '/' && 'text-gray-400')}>
              Home
            </Link>
            <Link to='/landing' className={cn('text-xl font-semibold', pathname === '/landing' && 'text-gray-400')}>
              About
            </Link>
          </nav>
        )}

        <div className='ml-auto'>
          <RightSideHeader />
        </div>
      </div>
    </header>
  );
};
export default Header;
