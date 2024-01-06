import { useState } from 'react';
import { MdPersonAddAlt } from 'react-icons/md';
import InviteModal from './InviteModal';
import StudentRow from './StudentRow';
import { ROLE } from '@/constance/constance';
import { useClassroom } from '@/hooks/useClassroom';
import Loading from '../loading/Loading';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MdArrowDropDown } from 'react-icons/md';
import { RiFolderDownloadLine } from 'react-icons/ri';
import { writeExcelFile } from '@/lib/utils';
type Props = {
  students: ClassMember[];
};

const Students = ({ students }: Props) => {
  const [open, setOpen] = useState(false);
  const { classDetail, isLoading } = useClassroom();

  if (isLoading) return <Loading />;
  const numberStudent = students.length;

  const handleExportExcel = () => {
    const data = students.map((student) => {
      return {
        'Student ID': student.user.id,
        'Full Name': `${student.user.firstName} ${student.user.lastName}`
      };
    });
    writeExcelFile(data, `students - ${classDetail.name}.xlsx`);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between border-b-[1px] border-b-blue-500 p-3 text-blue-600'>
        <h1 className='text-2xl font-medium leading-10 '>Students</h1>
        <div className='flex gap-4'>
          <span>{numberStudent} student</span>
          {classDetail.role?.code != ROLE.STUDENT && (
            <span className='cursor-pointer text-xl' onClick={() => setOpen(true)}>
              <MdPersonAddAlt />
            </span>
          )}
        </div>
      </div>
      <ul>
        <li className='mt-2 flex justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center gap-3 rounded-sm border px-4 py-2 focus:outline-none'>
              <span>Action</span>
              <MdArrowDropDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-5'>
              <DropdownMenuItem>
                <div className='flex items-center gap-3' onClick={handleExportExcel}>
                  <span className='text-xl'>
                    <RiFolderDownloadLine />
                  </span>
                  <span>Export to XLSX</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        {students.map((student) => (
          <li key={student.user.id} className='border-b-[1px] p-4 last:border-0'>
            <StudentRow name={`${student.user.firstName} ${student.user.lastName}`} />
          </li>
        ))}
      </ul>
      <InviteModal open={open} onOpenChange={setOpen} roleId={ROLE.STUDENT} />
    </div>
  );
};
export default Students;
