import gradeApi from '@/api/gradeApi';
import UserAvatar from '@/components/UserAvatar';
import { timeAgo } from '@/lib/utils';

import Loading from '@/components/loading/Loading';
import useReview from '@/hooks/useReview';
import React from 'react';
import { useQueryClient } from 'react-query';
import Replies from './Replies';
import { useParams } from 'react-router-dom';
import { FaCheckSquare } from 'react-icons/fa';
import { ImCheckboxUnchecked } from 'react-icons/im';

const RequestReviewsPage = () => {
  const { id } = useParams<{ id: string; gradeReviewId: string }>();

  const { reviews, isLoading } = useReview('');

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

  const handleAccept = async (reviewId: string, status: boolean) => {
    try {
      const res = await gradeApi.acceptGrade(reviewId, status, id!);
      if (res) {
        queryClient.invalidateQueries(['review', id]);

        // stompClient &&
        //   stompClient.send(
        //     '/app/notifications',
        //     {},
        //     JSON.stringify({
        //       sender_id: user?.id,
        //       classroom_id: id,
        //       receiver_id: review.user.id,
        //       title: 'End Grade Review',
        //       content: 'Your grade review has been ended'
        //     })
        //   );
        // navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container relative w-3/4'>
      {reviews.map((review: any) => {
        return (
          <div className='relative my-3 rounded-lg border border-gray-300  p-4 '>
            <div className='absolute right-4 top-4 flex items-center justify-end gap-2'>
              <span>End this Review</span>
              <span
                className='cursor-pointer transition-all hover:opacity-60'
                onClick={() => handleAccept(review.id, !review.is_shut_down)}
              >
                {review.is_shut_down ? <FaCheckSquare /> : <ImCheckboxUnchecked />}
              </span>
            </div>

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
