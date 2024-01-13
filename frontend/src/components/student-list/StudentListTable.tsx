import { StudentPreview } from '@/type';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import StudentMapDialog from './StudentMapDialog';

type Props = {
  students: StudentPreview[];
};

const StudentListTable = ({ students }: Props) => {
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    student_id: '',
    student_name: ''
  });

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
            <TableCell className='text-left'>
              {student.account_id ? (
                student.account_id
              ) : (
                <Button
                  variant='ghost'
                  onClick={() => {
                    setOpenMapDialog(true);
                    setCurrentStudent({
                      student_id: student.student_id,
                      student_name: student.student_name
                    });
                  }}
                >
                  <FaEdit />
                </Button>
              )}
            </TableCell>
            <TableCell className='text-left'>{student.student_id}</TableCell>
            <TableCell className='text-left'>{student.student_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <StudentMapDialog open={openMapDialog} onOpenChange={setOpenMapDialog} currentStudent={currentStudent} />
    </Table>
  );
};
export default StudentListTable;
