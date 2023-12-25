import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { gradesStructureSchema } from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';

import { useState } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SortableTable from '../sortable/SortableTable';
import CompisitionForm from './CompisitionForm';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GradeStructureForm = ({ open, onOpenChange }: Props) => {
  const [showForm, setshowForm] = useState(false);
  const [items, setItems] = useState<any[]>(['Item 1', 'Item 2']);
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
        <SortableTable items={items} onSortEnd={onSortEnd} />
        <Button
          type='button'
          className='mx-auto mt-0 block'
          onClick={() => {
            setshowForm(!showForm);
          }}
        >
          +
        </Button>
        {showForm && <CompisitionForm setItems={setItems} items={items} />}

        {/* {error && <div className='text-red-500'>{error}</div>} */}
      </DialogContent>
    </Dialog>
  );
};
export default GradeStructureForm;
