import { CircleIcon, StarIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Course = {
  description: string;
  lesson: number;
  level: string;
  title: string;
};

const courses: Course[] = [
  {
    title: 'Life in the Internet Age',
    description: "Let's discuss how technology is changing the way we live",
    level: 'Intermediate',
    lesson: 9,
  },
  {
    title: 'Caring for Our Planet',
    description: "Let's discuss our relationship as humans with our planet, Earth",
    level: 'Intermediate',
    lesson: 7,
  },
  {
    title: 'Healthy Mind, Healthy Body',
    description: "Let's discuss the many aspects of living a long, happy life",
    level: 'Intermediate',
    lesson: 6,
  },
  {
    title: 'Movies and Television',
    description: "Let's discuss our preferences and habits surrounding movies and television shows",
    level: 'Intermediate',
    lesson: 10,
  },
  {
    title: 'Raising Children',
    description: "Let's discuss raising children and practice using English for common parenting situations",
    level: 'Intermediate',
    lesson: 11,
  },
  {
    title: 'The Olympics',
    description: 'Let’s practice talking about the Olympics, the biggest sports festival on earth!',
    level: 'Advance',
    lesson: 11,
  },
];

const HomePage = () => {
  return (
    <main className='h-[1200px]'>
      <h1 className=' p-3 text-center text-4xl font-bold'>Your courses</h1>
      {courses.map((course) => (
        <Card>
          <CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 space-y-0'>
            <div className='space-y-1'>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex space-x-4 text-sm text-muted-foreground'>
              <div className='flex items-center'>
                <CircleIcon className='mr-1 h-3 w-3 fill-sky-400 text-sky-400' />
                {course.level}
              </div>
              <div className='flex items-center'>
                <StarIcon className='mr-1 h-3 w-3' />
                {course.level} lessons
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default HomePage;
