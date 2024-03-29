import { Classroom, User } from '@/type';
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

  async getAllClassrooms(): Promise<Classroom[]> {
    const res = await instance.get('/users/admin/classrooms');
    return res.data;
  }

  async inactivateClassroom(id: string, status: boolean): Promise<Classroom> {
    const res = await instance.put(`/users/admin/classrooms/${id}?status=${status}`);
    return res.data;
  }
}

const adminApi = new AdminApi();
export default adminApi;
