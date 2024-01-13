import gradeApi from '@/api/gradeApi';
import UserAvatar from '@/components/UserAvatar';
import { timeAgo } from '@/lib/utils';

import React, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { LuSendHorizonal } from 'react-icons/lu';
import { useParams } from 'react-router-dom';

//get comment

// This component represents a review with a post title, content, and user information.
const RequestReviewsPage = () => {
  const [comment, setComment] = useState<string[]>([]);
  const { id, gradeReviewId } = useParams<{ id: string; gradeReviewId: string }>();

  const [reviews, setReviews] = useState<any[]>([]);
  const [replies, setReplies] = useState<any[]>([]);

  const [currentReviewId, setCurrentReviewId] = useState<any[]>([]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newComment = [...comment];
    newComment[index] = event.target.value;
    setComment(newComment);
  };

  const handleReply = async (content: string, gradeReviewId: string, reviewId: string) => {
    try {
      const res = await gradeApi.replyComment(content, gradeReviewId, reviewId);
      if (res) {
        console.log(res);
        //setReplies(res);
        setReplies((prev) => [...prev, res]);
      }
    } catch (error) {}
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    gradeReviewId: string,
    reviewId: string,
    index: number
  ) => {
    event.preventDefault();
    //Handle comment submission logic here
    console.log('Comment submitted:', comment);
    if (!comment) return;
    handleReply(comment[index], gradeReviewId, reviewId);
    const newComment = [...comment];
    newComment[index] = '';
    setComment(newComment);
    //send comment comment
  };

  useEffect(() => {
    const getGradeReview = async () => {
      try {
        const res = await gradeApi.getComments(id, '');
        if (res) {
          setReviews(res);
          setCurrentReviewId(res);
          const newComment = res.map((review: any) => '');
          setComment(newComment);
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
          console.log(res);
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
      {reviews.map((review, index: number) => {
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
            {replies[index] &&
              replies[index].map((reply: any) => {
                if (!reply) return null;
                return (
                  <div className='mt-4'>
                    {/* Render comments here */}
                    <div className='flex flex-row justify-start'>
                      <div className='mr-2 h-8 w-8 rounded-full'>
                        <UserAvatar keyword={reply?.user?.first_name[0]} />
                      </div>

                      <div className='flex flex-col'>
                        <div className='flex flex-row items-center'>
                          <span>{reply?.user?.first_name + ' ' + reply?.user?.last_name}</span>
                          <span className='ml-1 text-sm text-gray-400'>{timeAgo(reply?.created_at)}</span>
                        </div>

                        <span className='text-sm'>{reply?.content}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* Comment Form */}
            <form onSubmit={(e) => handleSubmit(e, review.grade.id, review.id, index)}>
              <div className='flex flex-row'>
                <div className='mr-2 h-8 w-8 rounded-full'>
                  <UserAvatar keyword={review?.user?.first_name[0] ?? 'D'} />
                </div>
                <input
                  className='w-full rounded-2xl border border-gray-300 p-2 text-sm'
                  placeholder='Write a comment...'
                  value={comment}
                  type='text'
                  onChange={(e) => handleCommentChange(e, index)}
                ></input>

                <button className='ml-3 text-lg text-gray-600 hover:text-black' type='submit'>
                  <LuSendHorizonal />
                </button>
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default RequestReviewsPage;
