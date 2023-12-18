import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
const GradeStructureTable = () => {
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
        <TableRow>
          <TableCell className='text-left font-medium'>Kiểm tra giữa kỳ</TableCell>
          <TableCell className='text-right'>30</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default GradeStructureTable;
