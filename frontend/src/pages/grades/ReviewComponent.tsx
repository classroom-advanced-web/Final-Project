import React, { useState } from 'react';

// This component represents a review with a post title, content, and user information.
const ReviewComponent: React.FC = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle comment submission logic here
    console.log('Comment submitted:', comment);
    setComment('');
  };

  //   const gradeReviews: CommentOnGradeReview[] = [
  //     {
  //         id: '1',
  //         content: 'You got 60 points out of 70 points',
  //         user_id: 'John Doe',
  //         created_at: '2021-10-10',
  //         grade_review_id: '1'
  //         },
  //         {
  //         id: '2',
  //         comment: 'You got 60 points out of 70 points',
  //         userName: 'John Doe'
  //         },
  //         {
  //         id: '3',
  //         comment: 'You got 60 points out of 70 points',
  //         userName: 'John Doe'
  //     }]

  return (
    <div className='rounded-lg bg-white p-4 shadow-md'>
      <h2 className='mb-2 text-xl font-bold'>Post Title</h2>
      <p className='mb-4 text-gray-600'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nunc id aliquam lacinia,
        nisl justo consectetur libero, id tincidunt nunc mauris vitae nunc.
      </p>
      <div className='flex items-center'>
        <img className='mr-2 h-8 w-8 rounded-full' src='https://via.placeholder.com/50' alt='User Avatar' />
        <span className='text-gray-700'>John Doe</span>
      </div>

      {/* Comment Section */}
      <div className='mt-4'>
        <h3 className='text-lg font-semibold'>Comments</h3>
        {/* Render comments here */}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit}>
        <textarea
          className='w-full rounded border border-gray-300 p-2'
          placeholder='Write a comment...'
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <button className='mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewComponent;
