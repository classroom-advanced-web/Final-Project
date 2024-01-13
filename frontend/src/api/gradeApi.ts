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
}

const gradeApi = new GradeApi();
export default gradeApi;
