import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import CreateClassForm from './CreateClassForm';

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
                <Button variant='ghost'>Join class</Button>
              </li>
              <li>
                {/* <Button variant='ghost'>Create class</Button> */}
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
