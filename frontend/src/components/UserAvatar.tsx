import { Avatar, AvatarImage } from './ui/avatar';

type Props = {
  keyword: String;
};

const UserAvatar = ({ keyword }: Props) => {
  return (
    <Avatar className='relative h-8 w-8'>
      <AvatarImage className='absolute z-0' src='https://singlecolorimage.com/get/bf360c/100x100' />
      <h3 className='z-1 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-lg font-semibold text-white'>
        {keyword.toUpperCase()}
      </h3>
    </Avatar>
  );
};
export default UserAvatar;
