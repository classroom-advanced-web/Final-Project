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
        <TableCaption>Your Grade</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead className='w-[270px]'></TableHead> */}
            <TableHead className='w-[132px] text-left'>Student name</TableHead>
            <TableHead className='w-[132px] text-right'>Gia Ky</TableHead>
            <TableHead className='w-[132px] text-right'>Cuoi Ky</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className='text-left'>{item.name}</TableCell>
              <TableCell className='text-right'>60 </TableCell>
              <TableCell className='text-right'>
                <span className='cursor-pointer text-xl' onClick={() => handleReview(item.name)}>
                  <MdOutlineRateReview />
                </span>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className='text-left font-bold'>Average</TableCell>
            <TableCell className='text-right font-bold'>60 </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <GradeForm compisitionName={compisitionName} open={onOpenChange} onOpenChange={setonOpenChange} />
    </div>
  );
};
export default TeacherGradeTable;
