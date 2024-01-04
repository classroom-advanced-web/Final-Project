import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const GradeTable = () => {
  return (
    <Table className='container'>
      <TableCaption>Grade of your class</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[270px]'></TableHead>
          <TableHead className='w-[132px] text-center'>Giữa kỳ</TableHead>
          <TableHead className='w-[132px] text-center'>Cuối kỳ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='text-left font-medium'>Trần Minh Toàn</TableCell>
          <TableCell className='text-center'></TableCell>
          <TableCell className='text-center'></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default GradeTable;
