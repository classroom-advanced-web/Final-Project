import { GiHamburgerMenu } from 'react-icons/gi';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
  SortableHandle
} from 'react-sortable-hoc';
import './sortable.css';
import { Button } from '../ui/button';
import { MdOutlineDelete } from 'react-icons/md';
import classApi from '@/api/classApi';
import { useToast } from '../ui/use-toast';
import { FaRegEdit } from 'react-icons/fa';
interface ISortableHandleElement {
  children: React.ReactNode;
  className?: string;
}

interface ISortableItem extends SortableElementProps {
  children: React.ReactNode;
  className?: string;
}

interface ISortableContainer extends SortableContainerProps {
  children: React.ReactNode;
  className?: string;
}

type Props = {
  items: any[];
  onSortEnd: any;
  setItems: any;
};

const SortableTrigger: React.ComponentClass<ISortableHandleElement, any> = SortableHandle(
  ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div className={className || ''}>{children}</div>
  )
);

const SortableItem: React.ComponentClass<ISortableItem, any> = SortableElement(
  ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div className={className || ''}>{children}</div>
  )
);
const SortableList: React.ComponentClass<ISortableContainer, any> = SortableContainer(
  ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  }
);
const SortableTable = ({ items, onSortEnd, setItems }: Props) => {
  const { toast } = useToast();
  const handleDelete = async (compositionId: string) => {
    try {
      const res = await classApi.deleteComposition(compositionId);
      if (res) {
        const newItems = [...items];
        const index = newItems.findIndex((item) => item.id === compositionId);
        newItems.splice(index, 1);
        setItems(newItems);
        toast({
          title: `Delete: ${items[index].name} successfully`
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SortableList
      lockAxis='y'
      lockToContainerEdges={true}
      useDragHandle
      onSortEnd={onSortEnd}
      helperClass='sortableHelper'
      className='itemsContainer'
    >
      {items.map((value: any, index: number) => (
        <SortableItem key={value.id} index={index} className='item pl-0'>
          <SortableTrigger className='itemTrigger'>
            <Button className='text-md'>
              <GiHamburgerMenu />
            </Button>
          </SortableTrigger>
          <div className='itemContent text-xl font-semibold'>{value.name}</div>
          <div className='ml-auto flex items-center gap-2 pr-4'>
            <span>{value.scale} %</span>
            <Button variant={'ghost'} className='px-2 text-xl' onClick={() => handleDelete(value.id)}>
              <MdOutlineDelete />
            </Button>
            <Button variant={'ghost'} className='px-2 text-lg' onClick={() => handleDelete(value.id)}>
              <FaRegEdit />
            </Button>
          </div>
        </SortableItem>
      ))}
    </SortableList>
  );
};
export default SortableTable;
