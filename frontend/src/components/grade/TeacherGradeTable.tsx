import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import classApi from '@/api/classApi';
import { useEffect, useState } from 'react';
import { MdOutlineRateReview } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import GradeForm from './GradeForm';

const TeacherGradeTable = () => {
  const [items, setItems] = useState<GradeComposition[]>([]);
  const { id } = useParams();
  const [onOpenChange, setonOpenChange] = useState(false);
  const [compisitionName, setCompisitionName] = useState('');

  //sample data
  var studentList = ['Student 1', 'Student 2'];

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

  function handleReview(compisitionName: string) {
    setonOpenChange(true);
    setCompisitionName(compisitionName);
  }

  return (
    <div>
      <Table className='container w-3/4'>
        <TableCaption>Teacher Grade</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead className='w-[270px]'></TableHead> */}
            <TableHead className='w-[132px] text-left'>Student name</TableHead>

            {items.map((item) => (
              <TableHead className='w-[132px] text-right'>{item.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentList.map((student) => (
            <TableRow>
              <TableCell className='text-left'>{student}</TableCell>
              <TableCell className='text-right'>60 </TableCell>
              <TableCell className='text-right'>70</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <GradeForm compisitionName={compisitionName} open={onOpenChange} onOpenChange={setonOpenChange} />
    </div>
  );
};
export default TeacherGradeTable;
