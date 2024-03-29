import { useState } from 'react';
import { MdPersonAddAlt } from 'react-icons/md';
import InviteModal from './InviteModal';
import StudentRow from './StudentRow';
import { ROLE } from '@/constance/constance';
import { useClassroom } from '@/hooks/useClassroom';
import Loading from '../loading/Loading';
import { ClassMember } from '@/type';

type Props = {
  students: ClassMember[];
};

const Students = ({ students }: Props) => {
  const [open, setOpen] = useState(false);
  const { classDetail, isLoading } = useClassroom();

  if (isLoading) return <Loading />;
  const numberStudent = students.length;

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
