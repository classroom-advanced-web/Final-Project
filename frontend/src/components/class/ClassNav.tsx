import { cn } from '@/lib/utils';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import ClassSetting from './ClassSetting';

type Props = {
  page: 'stream' | 'people' | 'grades' | 'structure' | 'grades-review';
};

const ClassNav = ({ page }: Props) => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <nav className='container overflow-x-scroll border-b-[1px] md:overflow-hidden '>
      <ul className='relative flex items-center'>
        <li className={cn('px-4 py-1', page === 'stream' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Link to={`/class/${id}`}>
            <Button variant='ghost'>Stream</Button>
          </Link>
        </li>
        <li className={cn('px-4 py-1', page === 'people' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Link to={`/people/${id}`}>
            <Button variant='ghost'>People</Button>
          </Link>
        </li>
        <li className={cn('px-4 py-1', page === 'structure' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Link to={`/structure/${id}`}>
            {' '}
            <Button variant='ghost'>Structure</Button>
          </Link>
        </li>
        <li className={cn('px-4 py-1', page === 'grades' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Link to={`/grades/${id}`}>
            {' '}
            <Button variant='ghost'>Grades</Button>
          </Link>
        </li>
        <li className={cn('px-4 py-1', page === 'grades-review' && 'border-b-[2px] border-b-blue-700 text-blue-700')}>
          <Link to={`/grades-review/${id}`}>
            {' '}
            <Button variant='ghost'>Grades Review</Button>
          </Link>
        </li>
        <li className='absolute right-0 ml-auto flex items-center bg-white p-5 py-1 md:static md:p-0'>
          <ClassSetting />
        </li>
      </ul>
    </nav>
  );
};
export default ClassNav;
