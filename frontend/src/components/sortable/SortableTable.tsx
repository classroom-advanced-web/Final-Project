import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
  SortableHandle
} from 'react-sortable-hoc';
import { GiHamburgerMenu } from 'react-icons/gi';
import './sortable.css';
import classApi from '@/api/classApi';
import { toast } from '../ui/use-toast';

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
};

const SortableTrigger: React.ComponentClass<ISortableHandleElement, any> = SortableHandle(
  ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div className={className || ''}>{children}</div>
  )
);

const SortableItem: React.ComponentClass<ISortableItem, any> = SortableElement(
  ({ children }: { children: React.ReactNode }) => <div>{children}</div>
);
const SortableList: React.ComponentClass<ISortableContainer, any> = SortableContainer(
  ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  }
);
const SortableTable = ({ items, onSortEnd }: Props) => {
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
        <SortableItem key={`item-${index}`} index={index} className='item'>
          <SortableTrigger className='itemTrigger'>
            <GiHamburgerMenu />
          </SortableTrigger>
          <div className='itemContent'>{value}</div>
        </SortableItem>
      ))}
    </SortableList>
  );
};
export default SortableTable;
