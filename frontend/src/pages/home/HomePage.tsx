import classApi from '@/api/classApi';
import Loading from '@/components/loading/Loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Classroom, Role } from '@/type';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { HiDotsVertical } from 'react-icons/hi';
import { LuUserSquare2 } from 'react-icons/lu';
import { useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import './home.css';

type getClassApi = {
  classroom: Classroom;
  role: Role;
};

const HomePage = () => {
  const { data, isLoading } = useQuery('classes', () => classApi.getClasses(), { refetchOnWindowFocus: false });
  const { user } = useAuth();

  const navigate = useNavigate();
  const navigateToClass = (classId: String) => {
    navigate(`/class/${classId}`);
  };

  if (isLoading) return <Loading />;

  if (user && localStorage.getItem('redirect-url')) {
    const url = localStorage.getItem('redirect-url') ?? '';
    const path = new URL(url).pathname;
    const searchParams = new URL(url).searchParams;

    return <Navigate to={path + '?' + searchParams} replace />;
  }

  if (!data) return;

  if (user?.is_admin) {
    return <Navigate to='/admin/user' replace />;
  }

  const classes = data;
  return (
    <main className='container h-[1200px]'>
      <h1 className='py-10 text-center text-4xl font-bold'>Your classes</h1>
      <section>
        <ul className='grid grid-cols-2 gap-6 md:flex md:flex-wrap md:justify-center'>
          {classes.map((item: getClassApi) => (
            <li key={item.classroom.id}>
              <Card
                onClick={() => navigateToClass(item.classroom.id)}
                className='cursor-pointer overflow-hidden rounded-md shadow-sm hover:shadow-md md:w-[300px]'
              >
                <CardHeader className='h-[90px] p-0'>
                  <div
                    style={{ backgroundImage: `url('${item.classroom.image_url}')`, backgroundSize: 'cover' }}
                    className='class-card__thumb flex h-full w-full items-center justify-between p-3'
                  >
                    <div className='overflow-hidden text-white'>
                      <h2 className='truncate text-xl'>{item.classroom.name}</h2>
                      <p className='truncate text-sm'>{item.classroom.section}</p>
                    </div>
                    <Button variant='ghost' className='text-xl text-white'>
                      <HiDotsVertical />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='h-[136px]'></div>
                </CardContent>
                <CardFooter className='flex items-center justify-center border-y-[1px] px-2 py-0'>
                  <div className='ml-auto flex items-center justify-center py-2 '>
                    <Button variant='ghost' className='text-xl'>
                      <FaArrowTrendUp />
                    </Button>
                    <Button variant='ghost' className='text-xl'>
                      <LuUserSquare2 />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default HomePage;
