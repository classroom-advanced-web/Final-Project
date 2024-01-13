import { User } from '@/type';
import instance from './axiosConfig';

class AdminApi {
  async getAllUsers(): Promise<User[]> {
    const res = await instance.get('/users/admin/users');
    return res.data;
  }

  async banUser(id: string, status: boolean): Promise<User> {
    const res = await instance.put(`/users/admin/users/${id}?status=${status}`);
    return res.data;
  }
}

const adminApi = new AdminApi();
export default adminApi;
