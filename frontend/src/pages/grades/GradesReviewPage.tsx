import './ReviewComponent';
import ReviewComponent from './ReviewComponent';

//gọi api lấy composition name, current score, expected score, explanation

function GradesReviewPage() {
  return (
    <div className='container w-3/4'>
      <ReviewComponent />
    </div>
  );
}

export default GradesReviewPage;
