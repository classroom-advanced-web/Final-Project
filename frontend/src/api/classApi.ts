import { DEFAULT_THUMB } from '@/constance/constance';
import instance from './axiosConfig';

class ClassApi {
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

  getClassDetail = async (classId: string) => {
    const res = await instance.get(`/classrooms/${classId}`);
    return res.data;
  };
}

const classApi = new ClassApi();
export default classApi;
