import gradesSvg from '@/assets/grades.svg';
import { useParams } from 'react-router-dom';

const GradesPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <main className='mt-[135px] flex flex-col items-center justify-center gap-5'>
      <img src={gradesSvg} className='w-[200px]' alt='classwork' />
      <div className='text-center'>
        <h3>Create assignment to see grades</h3>
      </div>
    </main>
  );
};
export default GradesPage;
