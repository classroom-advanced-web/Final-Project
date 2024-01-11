import { TableCaption, TableHeader, TableRow, TableHead, Table, TableBody, TableCell } from '../ui/table';

type Props = {
  students: StudentPreview[];
};

const StudentListTable = ({ students }: Props) => {
  return (
    <Table className='container w-3/4'>
      <TableCaption>Your Grade</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=' text-left'>Account ID</TableHead>
          <TableHead className=' text-left'>Student ID</TableHead>
          <TableHead className=' text-left'>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.user.id}>
            <TableCell className='text-left'>{student.user.id}</TableCell>
            <TableCell className='text-left'>{student.user.student_id ?? ''}</TableCell>
            <TableCell className='text-left'>{student.user_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default StudentListTable;
