import instance from './axiosConfig';

class GradeApi {
  async changeGrade(value: number, student_id: string, composition_id: string) {
    const res = await instance.post('/grades/create/student', {
      value: value,
      student_id: student_id,
      grade_composition: {
        id: composition_id
      }
    });
    return res.data;
  }

  async importGrades(grades: any) {
    const res = await instance.post('/grades/board/file-update', JSON.stringify(grades));
    return res.data;
  }

  async requestReview(content: string, grade_id: string) {
    const res = await instance.post('/comments', {
      content: content,
      grade: {
        id: grade_id
      },
      reply_to: null
    });
    return res.data;
  }

  async getComments(class_id: string | undefined, grade_id: string | undefined) {
    const res = await instance.get(`/comments/classroom/${class_id}?grade_id=${grade_id}`);

    return res.data;
  }

  async replyComment(content: string, grade_id: string, reply_to: string) {
    const res = await instance.post('/comments', {
      content: content,
      grade: {
        id: grade_id
      },
      reply_to: {
        id: reply_to
      }
    });
    return res.data;
  }
}

const gradeApi = new GradeApi();
export default gradeApi;
