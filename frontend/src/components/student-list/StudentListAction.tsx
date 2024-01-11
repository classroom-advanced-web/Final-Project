import { useClassroom } from '@/hooks/useClassroom';
import { writeExcelFile } from '@/lib/utils';
import Loading from '../loading/Loading';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MdArrowDropDown } from 'react-icons/md';
import { RiFolderDownloadLine } from 'react-icons/ri';

type Props = {
  students: StudentPreview[];
};

const StudentListAction = ({ students }: Props) => {
  const { classDetail, isLoading } = useClassroom();

  if (isLoading) return <Loading />;
  if (!classDetail) return null;

  const handleExportExcel = () => {
    const data = students.map((student: StudentPreview) => {
      return {
        'Account ID': student.user.id,
        'Student ID': student.user.student_id ?? '',
        'Full Name': student.user_name
      };
    });
    writeExcelFile(data, `students - ${classDetail.name}.xlsx`);
  };

  return (
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
  );
};
export default StudentListAction;
