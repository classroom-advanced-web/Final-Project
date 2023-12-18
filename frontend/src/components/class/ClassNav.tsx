import { cn } from '@/lib/utils';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import ClassSetting from './ClassSetting';

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
          <Link to={`/class/${id}`}>
            <Button variant='ghost'>Stream</Button>
          </Link>
        </li>
        <li className={cn('px-4 py-1', page === 'classwork' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Link to={`/classwork/${id}`}>
            <Button variant='ghost'>Classwork</Button>
          </Link>
        </li>
        <li className={cn('px-4 py-1', page === 'people' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Link to={`/people/${id}`}>
            <Button variant='ghost'>People</Button>
          </Link>
        </li>
        <li className={cn('px-4 py-1', page === 'grades' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Link to={`/grades/${id}`}>
            <Button variant='ghost'>Grades</Button>
          </Link>
        </li>
        <li className='ml-auto py-1 '>
          <ClassSetting />
        </li>
      </ul>
    </nav>
  );
};
export default ClassNav;
