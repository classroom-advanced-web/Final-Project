import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link, useSearchParams } from 'react-router-dom';

const ClassNav = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 'stream';

  const setPage = (page: string) => {
    setSearchParams({ page });
  };
  return (
    <nav className='container border-b-[1px]'>
      <ul className='flex items-center'>
        <li className={cn('px-4 py-1', page === 'stream' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Button variant='ghost' onClick={() => setPage('stream')}>
            Stream
          </Button>
        </li>
        <li className={cn('px-4 py-1', page === 'classwork' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Button variant='ghost' onClick={() => setPage('classwork')}>
            Classwork
          </Button>
        </li>
        <li className={cn('px-4 py-1', page === 'people' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Button variant='ghost' onClick={() => setPage('people')}>
            People
          </Button>
        </li>
        <li className={cn('px-4 py-1', page === 'grades' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Button variant='ghost' onClick={() => setPage('grades')}>
            Grades
          </Button>
        </li>
        <li className='ml-auto py-1 '>
          <Button variant='ghost' className='text-xl'>
            <IoSettingsOutline />
          </Button>
        </li>
      </ul>
    </nav>
  );
};
export default ClassNav;
