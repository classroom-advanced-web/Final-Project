import { DEFAULT_THUMB } from '@/constance/constance';
import instance from './axiosConfig';

type CompositionSort = {
  id: string;
  weight: number;
};

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
    classId: string;
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

  getClassDetail = async (classId: string) => {
    const res = await instance.get(`/classrooms/${classId}`);
    return res.data;
  };

  joinClass = async (code: string) => {
    const res = await instance.post('/classrooms/join/code', {
      code
    });
    return res.data;
  };

  getStudents = async (classId: string) => {
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

  inviteMember = async (classId: string, email: string, roleCode: number) => {
    const res = await instance.post(`/classrooms/invite`, {
      receiver_email: email,
      redirect_url: `${location.protocol}//${location.host}/invite-link`,
      role_code: roleCode,
      classroom_id: classId
    });
    return res.data;
  };

  joinClassEmail = async (invitationId: string) => {
    const res = await instance.post(`/classrooms/join/email`, {
      invitation_id: +invitationId
    });
    return res.data;
  };

  createComposition = async (name: string, scale: number, classId: string) => {
    const res = await instance.post(`/grade-composition?classroom_id=${classId}`, {
      name,
      scale
    });
    return res.data;
  };

  getComposition = async (classId: string) => {
    const res = await instance.get(`/grade-composition/classroom?classroom_id=${classId}`);
    return res.data;
  };

  deleteComposition = async (compositionId: string) => {
    const res = await instance.delete(`/grade-composition/${compositionId}`);
    return res.data;
  };

  editComposition = async (name: string, scale: number, id: string) => {
    const res = await instance.put(`/grade-composition/${id}`, {
      name,
      scale
    });
    return res.data;
  };

  sortComposition = async (classroomId: string, compositionIds: CompositionSort[]) => {
    const res = await instance.post(`/grade-composition/sort`, {
      classroom_id: classroomId,
      grade_compositions: compositionIds
    });
    return res.data;
  };

  getStudentList = async (classroomId: string) => {
    const res = await instance.get(`/classrooms/students/${classroomId}`);
    return res.data;
  };

  MapStudentId = async ({
    student_id = null,
    account_id,
    student_name,
    classroom_id
  }: {
    student_id?: string | null;
    account_id: string;
    student_name: string;
    classroom_id: string;
  }) => {
    const res = await instance.post(`/classrooms/student-id/mapping`, {
      student_id,
      account_id,
      student_name,
      classroom_id
    });
    return res.data;
  };
}

const classApi = new ClassApi();
export default classApi;
