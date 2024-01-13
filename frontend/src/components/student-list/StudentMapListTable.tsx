import { cn } from '@/lib/utils';
import { ClassMember } from '@/type';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

type Props = {
  students: ClassMember[];
  setChosenAccountId: (id: string) => void;
};

const StudentMapListTable = ({ students, setChosenAccountId }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Table className='container w-3/4'>
      <TableHeader>
        <TableRow>
          <TableHead className=' text-left'>Account ID</TableHead>
          <TableHead className=' text-left'>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student, index) => (
          <TableRow
            onClick={() => {
              setCurrentIndex(index);
              setChosenAccountId(student.user.id);
            }}
            key={String(student.user.id)}
            className={cn(
              index === currentIndex
                ? 'rounded-md bg-gray-200'
                : 'cursor-pointer bg-white transition-colors hover:bg-gray-200'
            )}
          >
            <TableCell className='w-max whitespace-nowrap text-left'>{student.user.id}</TableCell>
            <TableCell className='w-max whitespace-nowrap text-left'>{`${student.user.firstName} ${student.user.lastName}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default StudentMapListTable;
