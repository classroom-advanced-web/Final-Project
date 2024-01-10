import UserAvatar from '../UserAvatar';

type Props = {
  name: string;
};

const StudentRow = ({ name }: Props) => {
  return (
    <div className='flex items-center gap-5'>
      <UserAvatar keyword={name[0]} />
      <span>{name}</span>
    </div>
  );
};
export default StudentRow;
