import classApi from '@/api/classApi';
import Loading from '@/components/loading/Loading';
import Students from '@/components/people/Students';
import Teachers from '@/components/people/Teachers';
import { ROLE } from '@/constance/constance';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const TEACHER = [ROLE.OWNER, ROLE.TEACHER];
const STUDENT = [ROLE.STUDENT];

const PeoplePage = () => {
  let teachers: ClassMember[] = [];
  let students: ClassMember[] = [];

  const { id } = useParams() ?? '0';
  const { data, isLoading, isSuccess } = useQuery(['member', id], () => classApi.getStudents(id!), {
    refetchOnWindowFocus: false,
    enabled: !!id
  });

  console.log(data);

  if (isLoading) return <Loading />;

  if (isSuccess) {
    teachers = data.filter((user: ClassMember) => TEACHER.includes(user.role.code));
    students = data.filter((user: ClassMember) => STUDENT.includes(user.role.code));
  }

  return (
    <main className='flex flex-col justify-center gap-5 p-8 lg:mx-20'>
      <Teachers teachers={teachers} />
      <Students students={students} />
    </main>
  );
};
export default PeoplePage;
