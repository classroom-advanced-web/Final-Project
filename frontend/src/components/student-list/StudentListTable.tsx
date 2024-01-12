import { StudentPreview } from '@/type';
import { TableHeader, TableRow, TableHead, Table, TableBody, TableCell } from '../ui/table';

type Props = {
  students: StudentPreview[];
};

const StudentListTable = ({ students }: Props) => {
  return (
    <Table className='container w-3/4'>
      <TableHeader>
        <TableRow>
          <TableHead className=' text-left'>Account ID</TableHead>
          <TableHead className=' text-left'>Student ID</TableHead>
          <TableHead className=' text-left'>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={String(student.student_id)}>
            <TableCell className='text-left'>{student.account_id}</TableCell>
            <TableCell className='text-left'>{student.student_id}</TableCell>
            <TableCell className='text-left'>{student.student_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default StudentListTable;
