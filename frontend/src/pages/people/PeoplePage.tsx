import ClassNav from '@/components/class/ClassNav';
import Students from '@/components/people/Students';
import Teachers from '@/components/people/Teachers';
import { useParams } from 'react-router-dom';

const PeoplePage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <ClassNav page='people' />
      <main className='mx-20 flex flex-col justify-center gap-5 p-8'>
        <Teachers />
        <Students />
      </main>
    </div>
  );
};
export default PeoplePage;
