import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
} from '@/components/ui/navigation-menu';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import CreateClassForm from './CreateClassForm';
import JoinClassForm from './JoinClassForm';

const AddClassButton = () => {
  return (
    <NavigationMenu className='w-max'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Plus />
          </NavigationMenuTrigger>
          <NavigationMenuContent className='px-4 py-5'>
            <ul className='flex flex-col justify-evenly gap-5'>
              <li>
                <JoinClassForm>Join class</JoinClassForm>
              </li>
              <li>
                <CreateClassForm>Create class </CreateClassForm>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default AddClassButton;
