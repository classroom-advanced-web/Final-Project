import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '../ui/use-toast';

import { useState } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SortableTable from '../sortable/SortableTable';
import CompisitionForm from './CompisitionForm';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: GradeComposition[];
  setItems: any;
};

const GradeStructureForm = ({ open, onOpenChange, items, setItems }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newArr = arrayMove(items, oldIndex, newIndex);
    setItems(newArr);
  };

  const { toast } = useToast();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='container inset-0 flex w-screen max-w-none translate-x-0 translate-y-0 flex-col overflow-auto'>
        <DialogHeader>
          <DialogTitle>Composition Name</DialogTitle>
        </DialogHeader>
        <SortableTable setItems={setItems} items={items} onSortEnd={onSortEnd} />
        <Button
          type='button'
          className='mx-auto mt-0 block'
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          +
        </Button>
        {showForm && <CompisitionForm setShowForm={setShowForm} setItems={setItems} items={items} />}

        {/* {error && <div className='text-red-500'>{error}</div>} */}
      </DialogContent>
    </Dialog>
  );
};
export default GradeStructureForm;
