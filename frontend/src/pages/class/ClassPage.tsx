import ClassNav from '@/components/class/ClassNav';
import { Button } from '@/components/ui/button';
import { DEFAULT_THUMB } from '@/constance/constance';
import { HiDotsVertical } from 'react-icons/hi';
import { useParams } from 'react-router-dom';

const ClassPage = () => {
  const { id } = useParams();
  return (
    <div>
      <ClassNav page='stream' />
      <main className='container py-5'>
        <section
          style={{ backgroundImage: `url(${DEFAULT_THUMB})`, backgroundSize: 'cover' }}
          className='flex h-[200px] overflow-hidden rounded-md md:h-[240px] lg:h-[300px]'
        >
          <div className='mb-4 ml-4 mt-auto'>
            <h1 className='truncate text-2xl text-white lg:text-3xl'>Classroom</h1>
            <h2 className='truncate text-white lg:text-xl'>Phát triển ứng dụng web nâng cao</h2>
          </div>
        </section>
        <section className='mt-5 flex items-start gap-3'>
          <div className='hidden w-[174px]  md:inline-block'>
            <div className=' w-full rounded-sm border-[1px] p-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Class code</span>
                <Button variant='ghost' className='text-sm'>
                  <HiDotsVertical />
                </Button>
              </div>
              <div>
                <h3 className='text-xl font-medium'>zjcm5k6</h3>
              </div>
            </div>
          </div>
          <div>
            <div className='flex h-[120px] w-full items-center gap-2 rounded-sm border-[1px] px-3 py-2'>
              <div className='h-full overflow-hidden rounded-md'>
                <img
                  className='h-full w-[144px] object-cover'
                  src='https://gstatic.com/classroom/themes/img_read_thumb.jpg'
                  alt=''
                />
              </div>
              <div>
                <h2 className='text-lg font-medium'>This is where you can talk to your class</h2>
                <p className='text-sm'>
                  Use the stream to share announcements, post assignments, and respond to student questions
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default ClassPage;
