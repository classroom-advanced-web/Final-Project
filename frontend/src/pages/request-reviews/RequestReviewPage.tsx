import gradeApi from '@/api/gradeApi';
import UserAvatar from '@/components/UserAvatar';
import { timeAgo } from '@/lib/utils';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Replies from './Replies';

//get comment

// This component represents a review with a post title, content, and user information.
const RequestReviewsPage = () => {
  const { id } = useParams<{ id: string; gradeReviewId: string }>();

  const [reviews, setReviews] = useState<any[]>([]);
  const [replies, setReplies] = useState<any[]>([]);

  const [currentReviewId, setCurrentReviewId] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleReply = async (content: string, gradeReviewId: string, reviewId: string) => {
    try {
      const res = await gradeApi.replyComment(content, gradeReviewId, reviewId);
      if (res) {
        navigate(0);
      }
    } catch (error) {}
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    comment: string,
    gradeReviewId: string,
    reviewId: string
  ) => {
    event.preventDefault();
    console.log({ comment, gradeReviewId, reviewId });
    handleReply(comment, gradeReviewId, reviewId);
    //send comment comment
  };

  useEffect(() => {
    const getGradeReview = async () => {
      try {
        const res = await gradeApi.getComments(id, '');
        if (res) {
          setReviews(res);
          setCurrentReviewId(res);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getGradeReview();
  }, []);

  useEffect(() => {
    const getReply = async (reviewId: string) => {
      try {
        const res = await gradeApi.getReply(reviewId);
        if (res) {
          setReplies((prev) => [...prev, res]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (currentReviewId) {
      currentReviewId.forEach((element) => {
        getReply(element?.id);
      });
    }
  }, [currentReviewId]);

  return (
    <div className='container w-3/4'>
      {reviews.map((review, index) => {
        return (
          <div className='my-3 rounded-lg border border-gray-300  p-4 '>
            <div className='flex items-center'>
              <div className='mr-2 h-8 w-8 rounded-full'>
                <UserAvatar keyword={review?.user?.first_name[0] ?? 'D'} />
              </div>

              <div className='flex flex-col'>
                {review?.user?.first_name + ' ' + review?.user?.last_name}
                <span className='text-xs text-gray-400'>{timeAgo(review?.created_at)}</span>
              </div>
            </div>
            <h2 className='mb-2 text-xl font-bold'>Request review: {review?.grade?.grade_composition?.name}</h2>
            <p> Current score: {review?.grade?.value}</p>
            <p>
              {' '}
              {review?.content.split('\n').map((i: string, key: number) => {
                return <div key={key}>{i}</div>;
              })}
            </p>
            <h3 className='text-lg font-semibold'>Comments</h3>
            <Replies review={review} replies={replies[index]} onSubmit={handleSubmit} />
          </div>
        );
      })}
    </div>
  );
};

export default RequestReviewsPage;
