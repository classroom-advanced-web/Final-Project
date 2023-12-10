import { DEFAULT_THUMB } from '@/constance/constance';
import instance from './axiosConfig';

class ClassApi {
  getClasses = async () => {
    const res = await instance.get('/users/classrooms');
    return res.data;
  };

  createClass = async ({
    className,
    section,
    subject,
    room
  }: {
    className: string;
    section: string;
    subject: string;
    room: string;
  }) => {
    const res = await instance.post('/classrooms/create', {
      name: className,
      section,
      subject,
      room,
      image_url: DEFAULT_THUMB
    });
    return res.data;
  };

  getClassDetail = async (classId: number) => {
    const res = await instance.get(`/classrooms/${classId}`);
    return res.data;
  };

  joinClass = async (code: string, role_id: number) => {
    const res = await instance.post('/classrooms/join', {
      code,
      role_id
    });
    return res.data;
  };
}

const classApi = new ClassApi();
export default classApi;
