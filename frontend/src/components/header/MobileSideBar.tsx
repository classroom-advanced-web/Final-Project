import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

const MobileSideBar = () => {
  return (
    <div className='md:hidden '>
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon className='h-4 w-4' />
        </SheetTrigger>
        <SheetContent className='w-[400px] sm:w-[540px]' side='left'>
          <SheetHeader>
            <SheetTitle>Classroom</SheetTitle>
            <nav className='w-full self-start pt-4'>
              <ul className='flex flex-col gap-5'>
                <li>
                  <Link to='/'>
                    <Button variant='outline' className='w-full'>
                      Home
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to='/landing'>
                    <Button variant='outline' className='w-full'>
                      About
                    </Button>
                  </Link>
                </li>
              </ul>
            </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileSideBar;
