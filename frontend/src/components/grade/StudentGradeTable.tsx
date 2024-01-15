import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import classApi from '@/api/classApi';
import { GradeBoard, GradeComposition, StudentGrades } from '@/type';
import { useEffect, useState } from 'react';
import { MdOutlineRateReview } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import GradeForm from './GradeForm';

const StudentGradeTable = () => {
  const [items, setItems] = useState<GradeComposition[]>([]);
  const { id } = useParams();
  const [onOpenChange, setonOpenChange] = useState(false);
  const [compisitionName, setCompisitionName] = useState('');
  const [grade, setGrade] = useState<StudentGrades>();
  const [gradeBoard, setGradeBoard] = useState<GradeBoard>();

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const res = await classApi.getComposition(id!);
        if (res) {
          setItems(res);
          console.log(items);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getStudentGradeBoard = async () => {
      try {
        const res = await classApi.getGradeBoard(id!);
        if (res) {
          //set grade
          setGrade(res[0]);
          console.log(res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getStudentGradeBoard();

    fetchStructure();
  }, []);

  function handleReview(item: GradeBoard) {
    setonOpenChange(true);
    setCompisitionName(item.grade_composition.name);
    setGradeBoard(item);

    //call api
  }

  const calculateAverage = (studentGrade: StudentGrades) => {
    let total = 0;
    studentGrade.grades.forEach((item) => {
      total += (item.value * item.grade_composition.scale) / 100;
    });
    return total;
  };
  return (
    <div>
      <Table className='container w-3/4'>
        <TableCaption>Your Grade</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead className='w-[270px]'></TableHead> */}
            <TableHead className='w-[2000px] text-left'>Structure</TableHead>
            <TableHead className='w-[132px] text-right'>Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grade?.grades.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className='text-left'>{item.grade_composition.name}</TableCell>
              <TableCell className='text-right'>{item.id == null ? 'NA' : item.value}</TableCell>
              <TableCell className='text-right'>
                {item.id && (
                  <span className='cursor-pointer text-xl' onClick={() => handleReview(item)}>
                    <MdOutlineRateReview />
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className='text-left font-bold'>Average</TableCell>

            {grade && <TableCell className='text-right font-bold'>{calculateAverage(grade)}</TableCell>}
          </TableRow>
        </TableBody>
      </Table>
      <GradeForm
        compisitionName={compisitionName}
        open={onOpenChange}
        onOpenChange={setonOpenChange}
        gradeBoard={gradeBoard}
      />
    </div>
  );
};
export default StudentGradeTable;
