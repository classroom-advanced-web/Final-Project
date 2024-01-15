import gradeApi from '@/api/gradeApi';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const useReview = (gradeId: string) => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) navigate('/');

  const { data: reviews, isLoading } = useQuery(['review', id], () => gradeApi.getComments(id, gradeId));

  return { reviews, isLoading };
};

export default useReview;
