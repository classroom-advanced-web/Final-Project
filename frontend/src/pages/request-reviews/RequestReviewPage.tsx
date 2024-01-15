import gradeApi from '@/api/gradeApi';
import UserAvatar from '@/components/UserAvatar';
import { timeAgo } from '@/lib/utils';

import Loading from '@/components/loading/Loading';
import useReview from '@/hooks/useReview';
import React from 'react';
import { useQueryClient } from 'react-query';
import Replies from './Replies';

const RequestReviewsPage = () => {
  // const { id } = useParams<{ id: string; gradeReviewId: string }>();

  const { reviews, isLoading } = useReview();

  const queryClient = useQueryClient();

  if (isLoading) {
    return <Loading />;
  }

  const handleReply = async (content: string, gradeReviewId: string, reviewId: string) => {
    try {
      const res = await gradeApi.replyComment(content, gradeReviewId, reviewId);
      if (res) {
        queryClient.invalidateQueries(['reply', reviewId]);
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
    if (!comment) return;
    console.log({ comment, gradeReviewId, reviewId });
    handleReply(comment, gradeReviewId, reviewId);
  };

  return (
    <div className='container w-3/4'>
      {reviews.map((review: any) => {
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
            <Replies review={review} onSubmit={handleSubmit} />
          </div>
        );
      })}
    </div>
  );
};

export default RequestReviewsPage;
