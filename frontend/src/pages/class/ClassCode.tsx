import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { HiDotsVertical } from 'react-icons/hi';
import { IoLink, IoCopyOutline } from 'react-icons/io5';

type Props = {
  classCode: String;
};

const ClassCode = ({ classCode }: Props) => {
  const copyClassCode = () => {
    navigator.clipboard.writeText(classCode);
  };
  return (
    <div className=' w-full rounded-sm border-[1px] p-3'>
      <div className='flex items-center justify-between'>
        <span className='text-sm'>Class code</span>
        <DropdownMenu>
          <DropdownMenuTrigger className='focus:outline-none'>
            <span className='text-sm'>
              <HiDotsVertical />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='p-5'>
            <DropdownMenuItem>
              <div className='flex items-center gap-3'>
                <span className='text-xl'>
                  <IoLink />
                </span>
                <span>Copy class invite link</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div onClick={copyClassCode} className='flex items-center gap-3'>
                <span className='text-xl'>
                  <IoCopyOutline />
                </span>
                <span>Copy class code</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <h3 className='text-xl font-medium'>{classCode}</h3>
      </div>
    </div>
  );
};
export default ClassCode;
