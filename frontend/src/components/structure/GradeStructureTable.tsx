import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Props = {
  gradeCompositions: GradeComposition[];
};

const GradeStructureTable = ({ gradeCompositions }: Props) => {
  return (
    <Table className=''>
      <TableCaption>Grade structure of your class</TableCaption>
      <TableHeader>
        <TableRow className='w-full'>
          <TableHead className='lg:[60%]'>Name</TableHead>
          <TableHead className='w-auto text-right'>Scale</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gradeCompositions.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='text-left font-medium'>{item.name}</TableCell>
            <TableCell className='text-right'>{item.scale}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default GradeStructureTable;
