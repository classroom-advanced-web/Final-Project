import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import './ReviewComponent';
import ReviewComponent from './ReviewComponent';
function GradesReviewPage() {
  const gradeReviews: GradeReview[] = [
    {
      id: '1',
      currentScore: 60,
      expectedScore: 70,
      explanation: 'You got 60 points out of 70 points',
      compositionName: 'Homework 1'
    },
    {
      id: '2',
      currentScore: 60,
      expectedScore: 70,
      explanation: 'You got 60 points out of 70 points',
      compositionName: 'Homework 2'
    },
    {
      id: '3',
      currentScore: 60,
      expectedScore: 70,
      explanation: 'You got 60 points out of 70 points',
      compositionName: 'Homework 3'
    }
    //example/ get from api
  ];
  return (
    <div className='container w-3/4'>
      {/* <Table className='container w-3/4'>
        <TableCaption>Your Request</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[10px] text-left'>Compisition Name</TableHead>
            <TableHead className='w-[10px] text-center'>Current Score</TableHead>
            <TableHead className='w-[10px] text-center'>Expected Score</TableHead>
            <TableHead className='w-[200px] text-center'>Explanation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gradeReviews.map((gradeReview) => (
            <TableRow key={gradeReview.id}>
              <TableCell className='text-left'>{gradeReview.compositionName}</TableCell>
              <TableCell className='text-center'>{gradeReview.currentScore}</TableCell>
              <TableCell className='text-center'>{gradeReview.expectedScore}</TableCell>
              <TableCell className='text-center'>{gradeReview.explanation}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table> */}
      <ReviewComponent />
      <ReviewComponent />
    </div>
  );
}

export default GradesReviewPage;
