import classApi from '@/api/classApi';
import Loading from '@/components/loading/Loading';
import StudentListAction from '@/components/student-list/StudentListAction';
import StudentListTable from '@/components/student-list/StudentListTable';
import { useToast } from '@/components/ui/use-toast';
import { StudentPreview } from '@/type';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentListPage = () => {
  const { id } = useParams() ?? '0';
  const [students, setStudents] = useState<StudentPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        setIsLoading(true);
        const res = await classApi.getStudentList(id!);

        if (res) {
          setStudents(res);
        }
      } catch (error: any) {
        if (error?.response) {
          toast({
            variant: 'destructive',
            title: error.response.data.message
          });
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentList();
  }, []);

  if (isLoading) return <Loading />;

  if (!students) return null;

  return (
    <main className='flex flex-col justify-center gap-5 p-8 lg:mx-20'>
      <div className='flex justify-end'>
        <StudentListAction students={students} setStudents={setStudents} />
      </div>
      <StudentListTable students={students} />
    </main>
  );
};
export default StudentListPage;
