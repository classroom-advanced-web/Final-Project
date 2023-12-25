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
  ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div className={className || ''}>{children}</div>
  )
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
      className='itemsContainer container'
    >
      {items.map((value: any, index: number) => (
        <SortableItem key={value.id} index={index} className='item container pl-0'>
          <SortableTrigger className='itemTrigger'>
            <Button className='text-md'>
              <GiHamburgerMenu />
            </Button>
          </SortableTrigger>
          <div className='itemContent text-xl font-semibold'>{value.name}</div>
          <span className='ml-auto'>{value.scale} %</span>
        </SortableItem>
      ))}
    </SortableList>
  );
};
export default SortableTable;
