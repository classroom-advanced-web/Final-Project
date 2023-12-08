import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = {
  avatar?: string;
  name: string;
};

const StudentRow = ({ avatar = 'https://lh3.googleusercontent.com/a/default-user=s32-c', name }: Props) => {
  return (
    <div className='flex items-center gap-5'>
      <Avatar className='relative h-8 w-8'>
        <AvatarImage className='absolute z-0' src={avatar} />
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
      <span>{name}</span>
    </div>
  );
};
export default StudentRow;
