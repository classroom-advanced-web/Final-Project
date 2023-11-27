import { Link, useLocation } from 'react-router-dom';
import RightSideHeader from './RightSideHeader';
import { cn } from '@/lib/utils';

const Header = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <header className='sticky top-0 w-full border-b-[1px] bg-white py-5 shadow-sm'>
      <div className='container flex items-center gap-10'>
        <h2 className='text-3xl font-bold'>
          <Link to='/'>Classroom</Link>
        </h2>
        <nav className='hidden items-center gap-5 md:flex '>
          <Link to='/' className={cn('text-xl font-semibold', pathname === '/' && 'text-gray-400')}>
            Home
          </Link>
          <Link to='/landing' className={cn('text-xl font-semibold', pathname === '/landing' && 'text-gray-400')}>
            About
          </Link>
        </nav>

        <div className='ml-auto'>
          <RightSideHeader />
        </div>
      </div>
    </header>
  );
};
export default Header;
