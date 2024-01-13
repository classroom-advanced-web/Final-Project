import adminApi from '@/api/adminApi';
import { useQuery } from 'react-query';

const useAdminUser = () => {
  const { data: users, isLoading } = useQuery('users', async () => {
    const res = await adminApi.getAllUsers();

    if (res) {
      return res.map((user: any) => {
        return {
          ...user,
          firstName: user.first_name,
          lastName: user.last_name
        };
      });
    }
  });

  return { users, isLoading };
};
export default useAdminUser;
