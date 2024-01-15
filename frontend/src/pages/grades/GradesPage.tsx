import StudentGradeTable from '@/components/grade/StudentGradeTable';
import TeacherGradeTable from '@/components/grade/TeacherGradeTable';
import Loading from '@/components/loading/Loading';
import { ROLE } from '@/constance/constance';
import { useClassroom } from '@/hooks/useClassroom';

const GradesPage = () => {
  const { classDetail, isLoading } = useClassroom();

  if (isLoading) return <Loading />;

  //student
  return <main>{classDetail.role?.code === ROLE.STUDENT ? <StudentGradeTable /> : <TeacherGradeTable />}</main>;
};
export default GradesPage;
