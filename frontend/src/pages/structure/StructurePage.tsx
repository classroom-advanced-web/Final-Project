import ClassNav from '@/components/class/ClassNav';
import { useParams } from 'react-router-dom';
import classworkSvg from '@/assets/classwork.svg';
import GradeStructureTable from '@/components/structure/GradeStructureTable';
import { TiEdit } from 'react-icons/ti';
import { useState } from 'react';
import GradeStructureForm from '@/components/structure/GradeStructureForm';
import { arrayMove } from 'react-sortable-hoc';
import SortableTable from '@/components/sortable/SortableTable';

const data = [1];

const StructurePage = () => {
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  return (
    <div>
      <ClassNav page='structure' />
      <main className='mx-auto mt-8 flex flex-col items-center justify-center gap-5 px-4 lg:w-[70%]'>
        {data.length === 0 ? (
          <>
            <img src={classworkSvg} className='mt-[135px] w-[200px] ' alt='classwork' />
            <div className='text-center'>
              <h3>This is where you’ll see your grade structure</h3>
            </div>
          </>
        ) : (
          <div className='w-full'>
            <div className='flex items-center justify-between border-b-[1px] border-b-blue-500 p-3 text-blue-600'>
              <h1 className='text-2xl font-medium leading-10 '>Grades structure</h1>
              <span className='cursor-pointer text-xl' onClick={() => setOpen(true)}>
                <TiEdit />
              </span>
            </div>
            <GradeStructureTable />
          </div>
        )}
      </main>
      <GradeStructureForm open={open} onOpenChange={setOpen} />
    </div>
  );
};
export default StructurePage;
