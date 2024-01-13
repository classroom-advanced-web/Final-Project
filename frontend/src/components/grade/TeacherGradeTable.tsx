import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import classApi from '@/api/classApi';
import useGradeBoard from '@/hooks/useGradeBoard';
import { DefaultGrade, GradeComposition } from '@/type';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Loading from '../loading/Loading';
import { Button } from '../ui/button';
import ChangeGradeForm from './ChangeGradeForm';
import GradeAction from './GradeAction';

const TeacherGradeTable = () => {
  const [items, setItems] = useState<GradeComposition[]>([]);
  const { id } = useParams();
  const [openForm, setOpenForm] = useState(false);
  const [defaultGradeInfor, setDefaultGradeInfor] = useState<DefaultGrade>({
    defaultGrade: 0,
    compositionName: '',
    studentId: '',
    compositionId: ''
  });

  const { gradeBoard, isLoading } = useGradeBoard();

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

  if (isLoading) return <Loading />;

  return (
    <div>
      <GradeAction gradeBoard={gradeBoard} gradeComposition={items} />
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
          {gradeBoard.map((student: any) => (
            <TableRow key={String(student.student_id)}>
              <TableCell className='text-left'>{student.student_id}</TableCell>
              {student.grades.map((grade: any, index: number) => (
                <TableCell className=' text-right' key={String(index)}>
                  <div className='flex items-center justify-end gap-1'>
                    <span>{!grade.id ? 'N/A' : `${grade.value}/100`}</span>

                    <Button
                      variant={'ghost'}
                      onClick={() => {
                        setDefaultGradeInfor({
                          defaultGrade: grade.value,
                          compositionName: grade.grade_composition.name,
                          studentId: grade.student_id,
                          compositionId: grade.grade_composition.id
                        });
                        setOpenForm(true);
                      }}
                    >
                      <FaEdit />
                    </Button>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <GradeForm compisitionName={compositionName} open={onOpenChange} onOpenChange={setonOpenChange} /> */}
      <ChangeGradeForm open={openForm} onOpenChange={setOpenForm} defaultGradeInfor={defaultGradeInfor} />
    </div>
  );
};
export default TeacherGradeTable;
