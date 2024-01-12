import { GradeReview } from '@/type';
import React, { useState } from 'react';
import { LuSendHorizonal } from 'react-icons/lu';
type Props = {
  gradeReview: GradeReview;
};

//get comment

// This component represents a review with a post title, content, and user information.
const ReviewComponent = ({ gradeReview }: Props) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Handle comment submission logic here
    console.log('Comment submitted:', comment);
    setComment('');

    //add comment
  };

  return (
    <div className='my-3 rounded-lg border border-gray-300  p-4 '>
      <div className='flex items-center'>
        <img className='mr-2 h-8 w-8 rounded-full' src='https://via.placeholder.com/50' alt='User Avatar' />

        <div className='flex flex-col'>
          <span className='text-gray-700'>{gradeReview.student_id} (get name later)</span>
          <span className='text-xs text-gray-400'>{gradeReview.created_at.toString()}</span>
        </div>
      </div>
      <h2 className='mb-2 text-xl font-bold'>Request review: {gradeReview.compositionName}</h2>
      <p> Current score: {gradeReview.currentScore}</p>
      <p> Expected score: {gradeReview.expectedScore}</p>
      <p>Explanation: {gradeReview.explanation}</p>
      {/* Comment Section */}
      <div className='mt-4'>
        <h3 className='text-lg font-semibold'>Comments</h3>
        {/* Render comments here */}
        <div className='flex flex-row justify-start'>
          <img className='mr-2 h-8 w-8 rounded-full' src='https://via.placeholder.com/50' alt='User Avatar' />
          <div className='flex flex-col'>
            <div className='flex flex-row items-center'>
              <span>Nguyen Khanh Huy</span>
              <span className='ml-1 text-sm text-gray-400'>10 thg 1</span>
            </div>

            <span className='text-sm'>This is ultra pro comment</span>
          </div>
        </div>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit}>
        <div className='flex flex-row'>
          <img className='mr-2 h-8 w-8 rounded-full' src='https://via.placeholder.com/50' alt='User Avatar' />
          <input
            className='w-full rounded-2xl border border-gray-300 p-2 text-sm'
            placeholder='Write a comment...'
            value={comment}
            type='text'
            onChange={handleCommentChange}
          ></input>

          <button className='ml-3 text-lg text-gray-600 hover:text-black' type='submit'>
            <LuSendHorizonal />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewComponent;
