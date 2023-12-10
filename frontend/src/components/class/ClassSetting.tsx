import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { IoSettingsOutline } from 'react-icons/io5';

import UpdateClassForm from './UpdateClassForm';
import classApi from '@/api/classApi';
import { useParams } from 'react-router-dom';
import Loading from '../loading/Loading';
import { useQuery } from 'react-query';

const ClassSetting = () => {
  const { id } = useParams<{ id: string }>() ?? 0;
  const { data, isLoading } = useQuery('class', () => classApi.getClassDetail(+id!));

  if (isLoading) return <Loading />;

  console.log(data);
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <span className='text-lg focus-within:outline-none'>
            <IoSettingsOutline />
          </span>
        </DialogTrigger>
        <DialogContent className='container inset-0 flex w-screen max-w-none translate-x-0 translate-y-0 flex-col'>
          <DialogHeader>
            <DialogTitle>Class settings</DialogTitle>
          </DialogHeader>
          <div className='mt-6 w-full self-center rounded-md border p-4 lg:w-[700px]'>
            <section>
              <h2 className='mb-4 text-2xl font-medium text-blue-700'>Class Details</h2>
              <UpdateClassForm classroom={data} />
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ClassSetting;
