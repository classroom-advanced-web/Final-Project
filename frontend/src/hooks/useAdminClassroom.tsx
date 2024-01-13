import adminApi from '@/api/adminApi';
import { useQuery } from 'react-query';

const useAdminClassroom = () => {
  const { data: classrooms, isLoading } = useQuery('adminClassroom', () => adminApi.getAllClassrooms());

  return { classrooms, isLoading };
};
export default useAdminClassroom;
