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

  updateClass = async ({
    classId,
    className,
    description,
    section,
    subject,
    room
  }: {
    classId: number;
    className: string;
    description: string;
    section: string;
    subject: string;
    room: string;
  }) => {
    const res = await instance.put(`/classrooms/update/${classId}`, {
      name: className,
      description,
      section,
      subject,
      room
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

  getStudents = async (classId: number) => {
    const res = await instance.get(`/classrooms/users/${classId}`);
    const data = res.data;
    const students: ClassMember[] = data.map((student: any) => {
      return {
        ...student,
        user: {
          ...student.user,
          firstName: student.user.first_name,
          lastName: student.user.last_name
        }
      };
    });

    return students;
  };
}

const classApi = new ClassApi();
export default classApi;
