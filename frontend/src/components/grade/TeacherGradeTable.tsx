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
import { FaCheckSquare } from 'react-icons/fa';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { useToast } from '../ui/use-toast';
import { stompClient } from '../header/Notifications';
import { useAuth } from '@/hooks/useAuth';

const TeacherGradeTable = () => {
  const [items, setItems] = useState<GradeComposition[]>([]);
  const [checkList, setCheckList] = useState<boolean[]>([]);
  const { id } = useParams();
  const [openForm, setOpenForm] = useState(false);
  const [defaultGradeInfor, setDefaultGradeInfor] = useState<DefaultGrade>({
    defaultGrade: 0,
    compositionName: '',
    studentId: '',
    compositionId: ''
  });
  const { user } = useAuth();

  const { gradeBoard, isLoading } = useGradeBoard();
  const { toast } = useToast();

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const res = await classApi.getComposition(id!);
        if (res) {
          setItems(res);
          const checkList = res.map((item: GradeComposition) => {
            return item.is_final;
          });
          setCheckList(checkList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStructure();
  }, []);

  const handleCheck = async (compositionId: String, index: number) => {
    const newCheckList: boolean[] = [...checkList];
    newCheckList[index] = !newCheckList[index];
    setCheckList(newCheckList);
    try {
      await classApi.finalizeComposition(compositionId, newCheckList[index]);
      if (newCheckList[index]) {
        stompClient &&
          stompClient.send(
            '/app/notifications',
            {},
            JSON.stringify({
              sender_id: user?.id,
              classroom_id: id,
              title: 'Finalize Grade Structure',
              content: 'Grade Structure has been updated'
            })
          );
      }
    } catch (error: any) {
      if (error?.response) {
        toast({
          title: error.response.data.error,
          variant: 'destructive'
        });
      }
      setCheckList(checkList);
    }
  };

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

            {items.map((item, index) => (
              <TableHead key={String(item.id)} className=' text-tight w-[132px]'>
                <div className='flex items-center justify-end gap-2'>
                  <span>{item.name}</span>
                  <span
                    className='cursor-pointer transition-all hover:opacity-60'
                    onClick={() => handleCheck(item.id, index)}
                  >
                    {checkList[index] ? <FaCheckSquare /> : <ImCheckboxUnchecked />}
                  </span>
                </div>
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
