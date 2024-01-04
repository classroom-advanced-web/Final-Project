import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '../ui/use-toast';

import classApi from '@/api/classApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { arrayMove } from 'react-sortable-hoc';
import SortableTable from '../sortable/SortableTable';
import CompisitionForm from './CompisitionForm';
import CompisitionUpdateForm from './CompositionUpdateForm';

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
  const [isOrderChanging, setIsOrderChanging] = useState(false);

  const { toast } = useToast();

  const { id: classId } = useParams<{ id: string }>() ?? '';
  if (!classId) return null;

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newArr = arrayMove(items, oldIndex, newIndex);
    setItems(newArr);
    setIsOrderChanging(true);
  };

  const handleEdit = async (composition: GradeComposition) => {
    try {
      setOldItem(composition);
      setFormStatus('update');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = async () => {
    try {
      const newOrderItems = items.map((item, index) => {
        return {
          id: item.id,
          weight: index + 1
        };
      });
      const res = await classApi.sortComposition(classId, newOrderItems);
      if (res) {
        toast({
          title: 'Sort successfully'
        });

        setIsOrderChanging(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Sort failed',
        variant: 'destructive'
      });
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
        <div className='flex justify-end gap-4'>
          <Button
            type='button'
            className='mt-0 block font-bold'
            onClick={() => {
              formStatus !== 'create' ? setFormStatus('create') : setFormStatus('none');
            }}
          >
            Add
          </Button>
          <Button type='button' className='mt-0 block font-bold' disabled={!isOrderChanging} onClick={handleSort}>
            Save
          </Button>
        </div>
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
