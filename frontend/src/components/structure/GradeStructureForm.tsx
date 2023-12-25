import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '../ui/use-toast';

import { useState } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import SortableTable from '../sortable/SortableTable';
import CompisitionForm from './CompisitionForm';
import CompisitionUpdateForm from './CompositionUpdateForm';
import { IoMdAdd } from 'react-icons/io';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: GradeComposition[];
  setItems: any;
};
type FormStatus = 'none' | 'create' | 'update';

const GradeStructureForm = ({ open, onOpenChange, items, setItems }: Props) => {
  const [formStatus, setFormStatus] = useState<FormStatus>('none');
  const [oldItem, setOldItem] = useState<GradeComposition>({
    name: '',
    scale: 0,
    id: ''
  });

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newArr = arrayMove(items, oldIndex, newIndex);
    setItems(newArr);
  };

  const handleEdit = async (composition: GradeComposition) => {
    try {
      setOldItem(composition);
      setFormStatus('update');
    } catch (error) {
      console.error(error);
    }
  };

  const closeForm = () => {
    setFormStatus('none');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='container inset-0 flex w-screen max-w-none translate-x-0 translate-y-0 flex-col overflow-auto'>
        <DialogHeader>
          <DialogTitle>Composition Name</DialogTitle>
        </DialogHeader>
        <SortableTable handleEdit={handleEdit} setItems={setItems} items={items} onSortEnd={onSortEnd} />
        <Button
          type='button'
          className='mx-auto mt-0 block text-2xl font-bold'
          onClick={() => {
            formStatus !== 'create' ? setFormStatus('create') : setFormStatus('none');
          }}
        >
          <IoMdAdd />
        </Button>
        {formStatus === 'create' && <CompisitionForm closeForm={closeForm} setItems={setItems} items={items} />}

        {formStatus === 'update' && (
          <CompisitionUpdateForm oldItem={oldItem} closeForm={closeForm} setItems={setItems} items={items} />
        )}

        {/* {error && <div className='text-red-500'>{error}</div>} */}
      </DialogContent>
    </Dialog>
  );
};
export default GradeStructureForm;
