import classApi from '@/api/classApi';
import Loading from '@/components/loading/Loading';
import StudentListAction from '@/components/student-list/StudentListAction';
import StudentListTable from '@/components/student-list/StudentListTable';
import { ROLE } from '@/constance/constance';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const STUDENT = [ROLE.STUDENT];

const StudentListPage = () => {
  const { id } = useParams() ?? '0';
  const { data, isLoading } = useQuery(['studentList', id], () => classApi.getStudentList(id!), {
    enabled: !!id
  });

  if (isLoading) return <Loading />;

  if (!data) return null;

  const students = data.filter((user: StudentPreview) => STUDENT.includes(user.role.code));

  return (
    <main className='flex flex-col justify-center gap-5 p-8 lg:mx-20'>
      <div className='flex justify-end'>
        <StudentListAction students={students} />
      </div>
      <StudentListTable students={students} />
    </main>
  );
};
export default StudentListPage;
