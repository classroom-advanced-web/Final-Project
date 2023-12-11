import { useState } from 'react';
import { MdPersonAddAlt } from 'react-icons/md';
import InviteModal from './InviteModal';
import StudentRow from './StudentRow';
import { ROLE } from '@/constance/constance';

type Props = {
  students: ClassMember[];
};

const Students = ({ students }: Props) => {
  const [open, setOpen] = useState(false);
  const numberStudent = students.length;

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between border-b-[1px] border-b-blue-500 p-3 text-blue-600'>
        <h1 className='text-2xl font-medium leading-10 '>Students</h1>
        <div className='flex gap-4'>
          <span>{numberStudent} student</span>
          <span className='cursor-pointer text-xl' onClick={() => setOpen(true)}>
            <MdPersonAddAlt />
          </span>
        </div>
      </div>
      <ul>
        {students.map((student) => (
          <li key={student.user.id} className='border-b-[1px] p-4 last:border-0'>
            <StudentRow
              name={`${student.user.firstName} ${student.user.lastName}`}
              avatar={'https://lh3.googleusercontent.com/a/default-user=s40-c'}
            />
          </li>
        ))}
      </ul>
      <InviteModal open={open} onOpenChange={setOpen} roleId={ROLE.STUDENT} />
    </div>
  );
};
export default Students;
