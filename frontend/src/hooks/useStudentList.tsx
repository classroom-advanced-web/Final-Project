import classApi from '@/api/classApi';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const useStudentList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) navigate('/');
  const { data: studentList, isLoading, error } = useQuery(['studentList', id], () => classApi.getStudentList(id!));

  return { studentList, isLoading, error };
};
export default useStudentList;
