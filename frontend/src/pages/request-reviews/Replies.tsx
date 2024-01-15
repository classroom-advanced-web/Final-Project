import UserAvatar from '@/components/UserAvatar';
import Loading from '@/components/loading/Loading';
import { useAuth } from '@/hooks/useAuth';
import useReplies from '@/hooks/useReplies';
import { timeAgo } from '@/lib/utils';
import { useState } from 'react';
import { LuSendHorizonal } from 'react-icons/lu';
import { useParams } from 'react-router-dom';

type Props = {
  review: any;
  onSubmit: any;
};

const Replies = ({ review, onSubmit }: Props) => {
  const [comment, setComment] = useState('');

  const { id } = useParams<{ id: string }>();

  const { replies, isLoading } = useReplies(review.id);

  const { user } = useAuth();
  if (!id) {
    return null;
  }

  if (!user) {
    return null;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className='relative flex max-h-[480px] flex-col gap-4 overflow-y-auto'>
        {replies &&
          replies.map((reply: any) => {
            return (
              <div className='mt-4 px-2 py-3 shadow-sm'>
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
      </div>
      <form
        className='mt-4'
        onSubmit={(e) => {
          onSubmit(e, comment, review.grade.id, review.id);
          setComment('');
        }}
      >
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
