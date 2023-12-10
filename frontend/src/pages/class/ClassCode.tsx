import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { HiDotsVertical } from 'react-icons/hi';
import { IoLink, IoCopyOutline } from 'react-icons/io5';

type Props = {
  classCode: string;
};

const ClassCode = ({ classCode }: Props) => {
  const { toast } = useToast();
  const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied',
      description: 'You can send it anywhere'
    });
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
              <div
                className='flex items-center gap-3'
                onClick={() => copyToClipBoard(`${window.location.host}/invite?code=${classCode}`)}
              >
                <span className='text-xl'>
                  <IoLink />
                </span>
                <span>Copy class invite link</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div onClick={() => copyToClipBoard(classCode)} className='flex items-center gap-3'>
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
