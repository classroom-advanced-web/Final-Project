import gradeApi from '@/api/gradeApi';

import { useQuery } from 'react-query';

const useReplies = (reviewId: string) => {
  const { data: replies, isLoading } = useQuery(['reply', reviewId], () => gradeApi.getReply(reviewId));

  if (replies) {
    replies.sort((a: any, b: any) => {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  }

  return { replies, isLoading };
};

export default useReplies;
