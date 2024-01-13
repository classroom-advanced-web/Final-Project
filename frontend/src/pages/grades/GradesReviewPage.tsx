import { GradeReview } from '@/type';
import './ReviewComponent';
import ReviewComponent from './ReviewComponent';

//gọi api lấy composition name, current score, expected score, explanation

function GradesReviewPage() {
  const gradeReviews: GradeReview[] = [
    {
      created_at: new Date('2024-01-10'),
      student_id: 'student_id_01',
      id: '1',
      currentScore: 60,
      expectedScore: 70,
      explanation: 'You got 60 points out of 70 points',
      compositionName: 'Homework 1'
    },
    {
      created_at: new Date('December 17, 1995 03:24:00'),
      student_id: 'student_id_02',
      id: '2',
      currentScore: 60,
      expectedScore: 70,
      explanation: 'You got 60 points out of 70 points',
      compositionName: 'Homework 2'
    },
    {
      created_at: new Date('December 17, 1995 03:24:00'),
      student_id: 'student_id_03',
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
      {gradeReviews.map((gradeReview) => {
        return <ReviewComponent gradeReview={gradeReview} />;
      })}
    </div>
  );
}

export default GradesReviewPage;
