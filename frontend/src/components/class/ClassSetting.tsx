import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { IoSettingsOutline } from 'react-icons/io5';

import { useClassroom } from '@/hooks/useClassroom';
import Loading from '../loading/Loading';
import UpdateClassForm from './UpdateClassForm';

const ClassSetting = () => {
  const { classDetail, isLoading } = useClassroom();

  if (isLoading) return <Loading />;

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <span className='text-lg focus-within:outline-none'>
            <IoSettingsOutline />
          </span>
        </DialogTrigger>
        <DialogContent className='container inset-0 flex w-screen max-w-none translate-x-0 translate-y-0 flex-col overflow-auto'>
          <DialogHeader>
            <DialogTitle>Class settings</DialogTitle>
          </DialogHeader>
          <div className='mt-6 flex w-full flex-col gap-8 self-center  lg:w-[700px]'>
            <section className='rounded-md border p-4'>
              <h2 className='mb-4 text-2xl font-medium text-blue-700'>Class Details</h2>
              <UpdateClassForm classroom={classDetail} />
            </section>
            <section className='rounded-md border p-4'>
              <h2 className='mb-4 text-2xl font-medium text-blue-700'>General</h2>
              <div className='mt-8 flex flex-col gap-3'>
                <h3 className='text-lg font-medium'>Invite codes</h3>
                <div className='flex items-center justify-between text-sm'>
                  <h4>Invite link</h4>
                  <p>{`${window.location.host}/invite?code=${classDetail.code}`}</p>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <h4>Class code</h4>
                  <p>{classDetail.code}</p>
                </div>
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ClassSetting;
