import { IoSettingsOutline } from 'react-icons/io5';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const ClassSetting = () => {
  return (
    <div>
      {/* <Button variant='ghost' className='text-xl'>
        <IoSettingsOutline />
      </Button> */}
      <Dialog>
        <DialogTrigger>
          <IoSettingsOutline />
        </DialogTrigger>
        <DialogContent className='max-w-screen inset-0 h-screen w-screen translate-x-0 translate-y-0'>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ClassSetting;
