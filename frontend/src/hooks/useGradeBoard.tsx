import classApi from '@/api/classApi';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const useGradeBoard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) navigate('/');
  const { data: gradeBoard, isLoading, error } = useQuery(['gradeBoard', id], () => classApi.getGradeBoard(id!));

  return { gradeBoard, isLoading, error };
};
export default useGradeBoard;
