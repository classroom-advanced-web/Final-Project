import Loading from '@/components/loading/Loading';
import StudentListAction from '@/components/student-list/StudentListAction';
import StudentListTable from '@/components/student-list/StudentListTable';
import useStudentList from '@/hooks/useStudentList';

const StudentListPage = () => {
  const { studentList, isLoading } = useStudentList();

  if (isLoading) return <Loading />;

  if (!studentList) return null;

  return (
    <main className='flex flex-col justify-center gap-5 p-8 lg:mx-20'>
      <div className='flex justify-end'>
        <StudentListAction students={studentList} />
      </div>
      <StudentListTable students={studentList} />
    </main>
  );
};
export default StudentListPage;
