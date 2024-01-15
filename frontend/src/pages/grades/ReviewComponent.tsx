import gradeApi from '@/api/gradeApi';
import UserAvatar from '@/components/UserAvatar';
import { timeAgo } from '@/lib/utils';
import { GradeReview } from '@/type';
import React, { useEffect, useState } from 'react';
import { LuSendHorizonal } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import Replies from '../request-reviews/Replies';
import useReview from '@/hooks/useReview';
import { useQueryClient } from 'react-query';
import Loading from '@/components/loading/Loading';
import { FaCheckSquare } from 'react-icons/fa';
type Props = {
  gradeReview: GradeReview;
};

//get comment

// This component represents a review with a post title, content, and user information.
const ReviewComponent = ({ gradeReview }: Props) => {
  const { id, gradeReviewId } = useParams<{ id: string; gradeReviewId: string }>();
  console.log(gradeReviewId);

  const { reviews, isLoading } = useReview(gradeReviewId!);

  const queryClient = useQueryClient();

  if (isLoading) {
    return <Loading />;
  }
  if (!gradeReviewId) return <Loading />;

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

  if (!reviews) {
    return null;
  }

  return (
    <div className='relative my-3 rounded-lg border  border-gray-300 p-4'>
      <div className='absolute right-4 top-4 flex items-center justify-end gap-2'>
        {reviews[0].is_shut_down && 'This request has been ended'}
      </div>
      <div className='flex items-center'>
        <div className='mr-2 h-8 w-8 rounded-full'>
          <UserAvatar keyword={reviews[0].user?.first_name[0] ?? 'D'} />
        </div>

        <div className='flex flex-col'>
          {reviews[0].user?.first_name + ' ' + reviews[0].user?.last_name}
          <span className='text-xs text-gray-400'>{timeAgo(reviews[0].created_at)}</span>
        </div>
      </div>
      <h2 className='mb-2 text-xl font-bold'>Request review: {reviews[0].grade?.grade_composition?.name}</h2>
      <p> Current score: {reviews[0].grade?.value}</p>
      <p>
        {reviews[0].content &&
          reviews[0].content.split('\n').map((i: string, key: number) => {
            return <div key={key}>{i}</div>;
          })}
      </p>
      <h3 className='text-lg font-semibold'>Comments</h3>

      <Replies review={reviews[0]} onSubmit={handleSubmit}></Replies>
    </div>
  );
};

export default ReviewComponent;
