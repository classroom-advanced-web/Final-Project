import { classroom } from '@/assets/classroom.svg';

type User = {
  id: string;
  email: string;
  dob: Date;
  firstName: string;
  lastName: string;
  activated: boolean;
  gender: 'MALE' | 'FEMALE';
  banned?: boolean;
  student_id?: string;
  is_revoked?: boolean;
  is_admin?: boolean;
};

type RegisterDTO = {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string | 'MALE' | 'FEMALE';
  email: string;
  password: string;
};

type ProfileFields = {
  id: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
};

type Classroom = {
  id: string;
  name: string;
  section?: string;
  description?: string;
  subject?: string;
  code: string;
  room?: string;
  image_url?: string;
  role?: Role;
  is_revoked?: boolean;
};

type Role = {
  id: string;
  name: string;
  code: number;
};

type ClassMember = {
  user: User;
  role: Role;
};

type GradeComposition = {
  id: string;
  name: string;
  scale: number;
  weight?: number;
  classroom_id?: string;
  is_final?: boolean;
};

type NotificationContent = {
  id: string;
  title: string;
  content: string;
  is_read: Boolean;
  created_at: Date;
  receiver_id?: string;
};

// {"id":"5318f7aa-c06d-4700-a1dd-68b06b8f8da0","title":"New Grade Structure","content":"New Grade Structure has been created","is_read":false,"classroom_id":"0fc38713-d066-49b3-9703-7f446d00fa26","sender_id":"c5551663-721f-409c-b520-c8396f726459"},"sender":{"id":"93ac2072-54ea-44ea-8734-601969c3e1dd","email":"tranminhtoan1280@gmail.com","gender":"UNKNOWN","dob":null,"first_name":"Toàn","last_name":"Trần","is_activated":false},"classroom":{"id":"0fc38713-d066-49b3-9703-7f446d00fa26","name":"classname","description":null,"subject":"","section":"","code":"oyRbN2","room":"","image_url":"https://gstatic.com/classroom/themes/img_backtoschool_thumb.jpg","role":null}

type GradeReview = {
  id: string;
  student_id: string;
  currentScore: number;
  expectedScore: number;
  explanation?: string;
  compositionName: string;
  created_at: Date;
};

type CommentOnGradeReview = {
  id: string;
  content: string;
  grade_review_id: string;
  user_id: string;
  created_at: Date;
};

// type StudentPreview = {
//   user_name: String;
//   user: User;
//   role: Role;
// };

type StudentPreview = {
  student_name: string;
  student_id: string;
  account_id: string | null;
  classroom_id: string;
};

type DefaultGrade = {
  defaultGrade: number;
  compositionName: string;
  studentId: string;
  compositionId: string;
};

type GradeBoard = {
  id: string | null;
  value: number;
  grade_composition: GradeComposition;
  student_id: string | null;
};

type StudentGrades = {
  grades: GradeBoard[];
  student_id: string | null;
};

type ClassroomAdmin = {
  role?: Role;
  classroom?: Classroom;
};
