type User = {
  id: string;
  email: string;
  dob: Date;
  firstName: string;
  lastName: string;
  activated: boolean;
  gender: 'MALE' | 'FEMALE';
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
};
