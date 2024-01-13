import gradeApi from '@/api/gradeApi';
import UserAvatar from '@/components/UserAvatar';
import { timeAgo } from '@/lib/utils';
import { useState } from 'react';
import { LuSendHorizonal } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheckSquare } from 'react-icons/fa';
import { ImCheckboxUnchecked } from 'react-icons/im';

type Props = {
  review: any;
  replies: any[];
  onSubmit: any;
};

const Replies = ({ review, replies, onSubmit }: Props) => {
  const [comment, setComment] = useState('');
  const [check, setCheck] = useState(review.is_shut_down);
  const { id } = useParams<{ id: string }>();
  console.log({ review });
  const navigate = useNavigate();
  if (!id) {
    return null;
  }

  const handleAccept = async (reviewId: string, status: boolean) => {
    setCheck(!check);
    try {
      const res = await gradeApi.acceptGrade(reviewId, status, id);
      if (res) {
        navigate(0);
      }
    } catch (error) {
      setCheck(check);
    }
  };
  return (
    <div className='relative'>
      <div className='absolute right-0 top-0 flex items-center justify-end gap-2'>
        <span>End this Review</span>
        <span
          className='cursor-pointer transition-all hover:opacity-60'
          onClick={() => handleAccept(review.id, !check)}
        >
          {check ? <FaCheckSquare /> : <ImCheckboxUnchecked />}
        </span>
      </div>
      {replies &&
        replies.map((reply: any) => {
          return (
            <div className='mt-4'>
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
      <form onSubmit={(e) => onSubmit(e, comment, review.grade.id, review.id)}>
        <div className='flex flex-row'>
          <div className='mr-2 h-8 w-8 rounded-full'>
            <UserAvatar keyword={review?.user?.first_name[0] ?? 'D'} />
          </div>
          <input
            className='w-full rounded-2xl border border-gray-300 p-2 text-sm'
            placeholder='Write a comment...'
            value={comment}
            type='text'
            onChange={(e) => setComment(e.target.value)}
            disabled={review?.is_shut_down}
          ></input>

          <button className='ml-3 text-lg text-gray-600 hover:text-black' type='submit'>
            <LuSendHorizonal />
          </button>
        </div>
      </form>
    </div>
  );
};
export default Replies;
