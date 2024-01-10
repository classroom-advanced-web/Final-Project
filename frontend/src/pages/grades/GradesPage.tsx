import StudentGradeTable from '@/components/grade/StudentGradeTable';
import TeacherGradeTable from '@/components/grade/TeacherGradeTable';
import Loading from '@/components/loading/Loading';
import { ROLE } from '@/constance/constance';
import { useClassroom } from '@/hooks/useClassroom';
import { useParams } from 'react-router-dom';

const GradesPage = () => {
  const { id } = useParams();
  const { classDetail, isLoading } = useClassroom();
  console.log(id);

  if (isLoading) return <Loading />;

  //student
  return <main>{classDetail.role?.code === ROLE.STUDENT ? <StudentGradeTable /> : <TeacherGradeTable />}</main>;
};
export default GradesPage;
