import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DEFAULT_THUMB } from '@/constance/constance';
import { HiDotsVertical } from 'react-icons/hi';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { LuUserSquare2 } from 'react-icons/lu';
import './home.css';

const classes = Array(10).fill(0);

const HomePage = () => {
  const navigateToClass = () => {
    console.log('navigate to class');
  };
  return (
    <main className='container h-[1200px]'>
      <h1 className='py-10 text-center text-4xl font-bold'>Your classes</h1>
      <section>
        <ul className='grid grid-cols-2 gap-6 md:flex md:flex-wrap md:justify-center'>
          {classes.map(() => (
            <li>
              <Card
                onClick={navigateToClass}
                className='cursor-pointer overflow-hidden rounded-md shadow-sm hover:shadow-md md:w-[300px]'
              >
                <CardHeader className='h-[90px] p-0'>
                  <div
                    style={{ backgroundImage: 'url(' + DEFAULT_THUMB + ')', backgroundSize: 'cover' }}
                    className='class-card__thumb flex h-full w-full items-center justify-between p-3'
                  >
                    <div className='overflow-hidden text-white'>
                      <h2 className='truncate text-xl'>Classroom</h2>
                      <p className='truncate text-sm'>Phát triển ứng dụng web nâng cao</p>
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
