import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import classApi from '@/api/classApi';
import classworkSvg from '@/assets/classwork.svg';
import Loading from '@/components/loading/Loading';
import GradeStructureForm from '@/components/structure/GradeStructureForm';
import GradeStructureTable from '@/components/structure/GradeStructureTable';
import { ROLE } from '@/constance/constance';
import { useClassroom } from '@/hooks/useClassroom';
import { useEffect, useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import { useParams } from 'react-router-dom';
import { MdOutlineRateReview } from 'react-icons/md';
import { Button } from '../ui/button';
import GradeForm from './GradeForm';

const GradeTable = () => {
  const [items, setItems] = useState<GradeComposition[]>([]);
  const { id } = useParams();
  const [onOpenChange, setonOpenChange] = useState(false);

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
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className='text-left'>{item.name}</TableCell>
              <TableCell className='text-right'>60 </TableCell>
              <TableCell className='text-right'>
                <span
                  className='cursor-pointer text-xl'
                  onClick={() => {
                    setonOpenChange(true);
                  }}
                >
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
      <GradeForm compisitionName='giua ky' open={onOpenChange} onOpenChange={setonOpenChange} />
    </div>
  );
};
export default GradeTable;
