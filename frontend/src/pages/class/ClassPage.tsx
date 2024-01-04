import classApi from '@/api/classApi';
import streamSvg from '@/assets/stream.svg';
import Loading from '@/components/loading/Loading';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ClassCode from './ClassCode';

const ClassPage = () => {
  const { id } = useParams();

  if (!id) return <div>Class not found</div>;

  const { data, isLoading } = useQuery(['classDetail', id], () => classApi.getClassDetail(id));

  if (isLoading) return <Loading />;
  return (
    <main className='container py-5'>
      <section
        style={{ backgroundImage: `url(${data.image_url})`, backgroundSize: 'cover' }}
        className='flex h-[200px] overflow-hidden rounded-md md:h-[240px] lg:h-[300px]'
      >
        <div className='mb-4 ml-4 mt-auto'>
          <h1 className='truncate text-2xl text-white lg:text-3xl'>{data.name}</h1>
          <h2 className='truncate text-white lg:text-xl'>{data.section}</h2>
        </div>
      </section>
      <section className='mt-5 flex items-start gap-3'>
        <div className='hidden w-[240px] md:inline-block'>
          <ClassCode classCode={data.code} />
        </div>
        <div>
          <div className='flex h-[200px] w-full items-center gap-5 rounded-sm border-[1px] px-3 py-5'>
            <div className='h-full overflow-hidden rounded-md'>
              <img className='h-full ' src={streamSvg} alt='' />
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
  );
};
export default ClassPage;
