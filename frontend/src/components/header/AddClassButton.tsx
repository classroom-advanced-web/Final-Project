import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Plus } from 'lucide-react';
import CreateClassForm from './CreateClassForm';
import JoinClassForm from './JoinClassForm';
import { useState } from 'react';
import { Button } from '../ui/button';

const AddClassButton = () => {
  const [joinClassOpen, setJoinClassOpen] = useState(false);
  const [createClassOpen, setCreateClassOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Plus />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button variant='ghost' onClick={() => setJoinClassOpen(true)}>
              Join class
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant='ghost' onClick={() => setCreateClassOpen(true)}>
              Create class
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <JoinClassForm open={joinClassOpen} onOpenChange={setJoinClassOpen} />
      <CreateClassForm open={createClassOpen} onOpenChange={setCreateClassOpen} />
    </>
  );
};
export default AddClassButton;
