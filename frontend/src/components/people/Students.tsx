import { MdPersonAddAlt } from 'react-icons/md';
import StudentRow from './StudentRow';

const students = [
  {
    name: 'Toàn Trần'
  },
  {
    name: 'Lê Trần Thiện Thắng',
    avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWxiiPvj0vI2j47V0SE_e2M5aiJRNJXKpmXHTe0LVkD970=s32-c'
  }
];

type Props = {
  students: ClassMember[];
};

const Students = ({ students }: Props) => {
  const numberStudent = students.length;

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between border-b-[1px] border-b-blue-500 p-3 text-blue-600'>
        <h1 className='text-2xl font-medium leading-10 '>Students</h1>
        <div className='flex gap-4'>
          <span>{numberStudent} student</span>
          <span className='text-xl'>
            <MdPersonAddAlt />
          </span>
        </div>
      </div>
      <ul>
        {students.map((student) => (
          <li className='border-b-[1px] p-4 last:border-0'>
            <StudentRow
              name={`${student.user.firstName} ${student.user.lastName}`}
              avatar={'https://lh3.googleusercontent.com/a/default-user=s40-c'}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Students;
