import ClassNav from '@/components/class/ClassNav';
import { useParams } from 'react-router-dom';
import gradesSvg from '@/assets/grades.svg';

const GradesPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <ClassNav page='grades' />
      <main className='mt-[135px] flex flex-col items-center justify-center gap-5'>
        <img src={gradesSvg} className='w-[200px]' alt='classwork' />
        <div className='text-center'>
          <h3>Create assignment to see grades</h3>
        </div>
      </main>
    </div>
  );
};
export default GradesPage;
