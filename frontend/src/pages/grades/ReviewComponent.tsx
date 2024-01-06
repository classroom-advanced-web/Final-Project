import React from 'react';

// This component represents a review with a post title, content, and user information.
const ReviewComponent: React.FC = () => {
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
    </div>
  );
};

export default ReviewComponent;
