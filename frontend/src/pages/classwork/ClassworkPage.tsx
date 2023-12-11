import ClassNav from '@/components/class/ClassNav';
import { useParams } from 'react-router-dom';
import classworkSvg from '@/assets/classwork.svg';

const ClassworkPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <ClassNav page='classwork' />
      <main className='mt-[135px] flex flex-col items-center justify-center gap-5'>
        <img src={classworkSvg} className='w-[200px]' alt='classwork' />
        <div className='text-center'>
          <h3>This is where you’ll assign work</h3>
          <p className='w-[440px] text-center text-sm font-extralight'>
            You can add assignments and other work for the class, then organize it into topics
          </p>
        </div>
      </main>
    </div>
  );
};
export default ClassworkPage;
