import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import classApi from '@/api/classApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GradeForm from './GradeForm';
import { GradeComposition, StudentPreview } from '@/type';
import useStudentList from '@/hooks/useStudentList';
import Loading from '../loading/Loading';

const TeacherGradeTable = () => {
  const [items, setItems] = useState<GradeComposition[]>([]);
  const { id } = useParams();
  const [onOpenChange, setonOpenChange] = useState(false);
  const [compositionName, setCompositionName] = useState('');
  const { studentList, isLoading } = useStudentList();

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const res = await classApi.getComposition(id!);
        if (res) {
          setItems(res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStructure();
  }, []);

  function handleReview(compositionName: string) {
    setonOpenChange(true);
    setCompositionName(compositionName);
  }

  if (isLoading) return <Loading />;

  return (
    <div>
      <Table className='container w-3/4'>
        <TableCaption>Teacher Grade</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead className='w-[270px]'></TableHead> */}
            <TableHead className='w-[132px] text-left'>Student ID</TableHead>

            {items.map((item) => (
              <TableHead key={String(item.id)} className='w-[132px] text-right'>
                {item.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentList.map((student: StudentPreview) => (
            <TableRow key={String(student.student_id)}>
              <TableCell className='text-left'>{student.student_id}</TableCell>
              <TableCell className='text-right'>60 </TableCell>
              <TableCell className='text-right'>70</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <GradeForm compisitionName={compositionName} open={onOpenChange} onOpenChange={setonOpenChange} />
    </div>
  );
};
export default TeacherGradeTable;
