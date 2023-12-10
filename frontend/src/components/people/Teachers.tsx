import { MdPersonAddAlt } from 'react-icons/md';
import TeacherRow from './TeacherRow';

type Props = {
  teachers: ClassMember[];
};

const Teachers = ({ teachers }: Props) => {
  console.log({ teachers });
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between border-b-[1px] border-b-blue-500 p-3 text-blue-600'>
        <h1 className='text-2xl font-medium leading-10 '>Teachers</h1>
        <span className='text-xl'>
          <MdPersonAddAlt />
        </span>
      </div>
      <ul>
        {teachers.map((teacher) => (
          <li className='border-b-[1px] p-4 last:border-0'>
            <TeacherRow
              name={`${teacher.user.firstName} ${teacher.user.lastName}`}
              avatar={'https://lh3.googleusercontent.com/a/default-user=s40-c'}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Teachers;
