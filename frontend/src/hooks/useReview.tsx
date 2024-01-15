import gradeApi from '@/api/gradeApi';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const useReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) navigate('/');

  const { data: reviews, isLoading } = useQuery(['review', id], () => gradeApi.getComments(id, ''));

  return { reviews, isLoading };
};

export default useReview;
