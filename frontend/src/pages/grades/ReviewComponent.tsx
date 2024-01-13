import gradeApi from '@/api/gradeApi';
import UserAvatar from '@/components/UserAvatar';
import { timeAgo } from '@/lib/utils';
import { GradeReview } from '@/type';
import React, { useEffect, useState } from 'react';
import { LuSendHorizonal } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
type Props = {
  gradeReview: GradeReview;
};

//get comment

// This component represents a review with a post title, content, and user information.
const ReviewComponent = ({ gradeReview }: Props) => {
  const [comment, setComment] = useState('');
  const { id, gradeReviewId } = useParams<{ id: string; gradeReviewId: string }>();

  const [review, setReview] = useState<any[]>([]);
  const [replies, setReplies] = useState<any[]>([]);

  const [currentReviewId, setCurrentReviewId] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleReply = async (content: string) => {
    try {
      const res = await gradeApi.replyComment(content, gradeReviewId, review[0]?.id);
      if (res) {
        console.log(res);
        //setReplies(res);
        setReplies((prev) => [...prev, res]);
      }
    } catch (error) {}
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Handle comment submission logic here
    console.log('Comment submitted:', comment);
    if (!comment) return;
    handleReply(comment);
    setComment('');
    //send comment comment
  };

  useEffect(() => {
    const getGradeReview = async () => {
      try {
        const res = await gradeApi.getComments(id, gradeReviewId);
        if (res) {
          setReview(res);
          setCurrentReviewId(res[0]?.id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getGradeReview();
  }, []);

  useEffect(() => {
    const getReply = async () => {
      try {
        const res = await gradeApi.getReply(currentReviewId);
        if (res) {
          console.log(res);
          setReplies(res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (currentReviewId) {
      getReply();
    }
  }, [currentReviewId]);

  return (
    <div className='my-3 rounded-lg border border-gray-300  p-4 '>
      <div className='flex items-center'>
        <div className='mr-2 h-8 w-8 rounded-full'>
          <UserAvatar keyword={review[0]?.user?.first_name[0] ?? 'D'} />
        </div>

        <div className='flex flex-col'>
          {review[0]?.user?.first_name + ' ' + review[0]?.user?.last_name}
          <span className='text-xs text-gray-400'>{timeAgo(review[0]?.created_at)}</span>
        </div>
      </div>
      <h2 className='mb-2 text-xl font-bold'>Request review: {review[0]?.grade?.grade_composition?.name}</h2>
      <p> Current score: {review[0]?.grade?.value}</p>
      <p>
        {' '}
        {review[0]?.content.split('\n').map((i: string, key: number) => {
          return <div key={key}>{i}</div>;
        })}
      </p>
      <h3 className='text-lg font-semibold'>Comments</h3>
      {replies.map((reply) => {
        return (
          <div className='mt-4'>
            {/* Render comments here */}
            <div className='flex flex-row justify-start'>
              <div className='mr-2 h-8 w-8 rounded-full'>
                <UserAvatar keyword={reply?.user?.last_name[0]} />
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
      <form onSubmit={handleSubmit}>
        <div className='flex flex-row'>
          <div className='mr-2 h-8 w-8 rounded-full'>
            <UserAvatar keyword={review[0]?.user?.first_name[0] ?? 'D'} />
          </div>
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
