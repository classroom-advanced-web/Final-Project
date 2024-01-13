import classApi from '@/api/classApi';
import classworkSvg from '@/assets/classwork.svg';
import Loading from '@/components/loading/Loading';
import GradeStructureForm from '@/components/structure/GradeStructureForm';
import GradeStructureTable from '@/components/structure/GradeStructureTable';
import { ROLE } from '@/constance/constance';
import { useClassroom } from '@/hooks/useClassroom';
import { GradeComposition } from '@/type';
import { useEffect, useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import { useParams } from 'react-router-dom';

const data = [1];

const StructurePage = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<GradeComposition[]>([]);

  const { id } = useParams();
  const { classDetail, isLoading } = useClassroom();

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const res = await classApi.getComposition(id!);
        if (res) {
          setItems(res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStructure();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <main className='mx-auto mt-8 flex flex-col items-center justify-center gap-5 px-4 lg:w-[70%]'>
        {data.length === 0 ? (
          <>
            <img src={classworkSvg} className='mt-[135px] w-[200px] ' alt='classwork' />
            <div className='text-center'>
              <h3>{"This is where you’ll see your grade structure"}</h3>
            </div>
          </>
        ) : (
          <div className='w-full'>
            <div className='flex items-center justify-between border-b-[1px] border-b-blue-500 p-3 text-blue-600'>
              <h1 className='text-2xl font-medium leading-10 '>Grades structure</h1>
              {classDetail.role?.code != ROLE.STUDENT && (
                <span className='cursor-pointer text-xl' onClick={() => setOpen(true)}>
                  <TiEdit />
                </span>
              )}
            </div>
            <GradeStructureTable gradeCompositions={items} />
          </div>
        )}
      </main>
      <GradeStructureForm items={items} setItems={setItems} open={open} onOpenChange={setOpen} />
    </div>
  );
};
export default StructurePage;
