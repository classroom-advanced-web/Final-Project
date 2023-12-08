import { cn } from '@/lib/utils';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../ui/button';

type Props = {
  page: 'stream' | 'classwork' | 'people' | 'grades';
};

const ClassNav = ({ page }: Props) => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <nav className='container border-b-[1px]'>
      <ul className='flex items-center'>
        <li className={cn('px-4 py-1', page === 'stream' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Button variant='ghost'>
            <Link to={`/class/${id}`}> Stream</Link>
          </Button>
        </li>
        <li className={cn('px-4 py-1', page === 'classwork' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Button variant='ghost'>
            <Link to={`/classwork/${id}`}> Classwork</Link>
          </Button>
        </li>
        <li className={cn('px-4 py-1', page === 'people' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Button variant='ghost'>
            <Link to={`/people/${id}`}> People</Link>
          </Button>
        </li>
        <li className={cn('px-4 py-1', page === 'grades' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Button variant='ghost'>
            <Link to={`/grades/${id}`}> Grades</Link>
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
