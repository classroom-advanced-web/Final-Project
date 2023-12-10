import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Plus } from 'lucide-react';
import CreateClassForm from './CreateClassForm';
import JoinClassForm from './JoinClassForm';

const AddClassButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Plus />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <JoinClassForm>Join class</JoinClassForm>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreateClassForm>Create class </CreateClassForm>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AddClassButton;
