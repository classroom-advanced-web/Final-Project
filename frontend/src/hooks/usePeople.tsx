import classApi from '@/api/classApi';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const usePeople = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) navigate('/');
  const {
    data: people,
    isLoading,
    error
  } = useQuery(['member', id], () => classApi.getStudents(id!), {
    refetchOnWindowFocus: false,
    enabled: !!id
  });

  return { people, isLoading, error };
};
export default usePeople;
