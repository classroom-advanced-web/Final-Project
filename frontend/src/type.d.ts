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
  role?: Role;
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

type NotificationContent = {
  id: String;
  title: String;
  content: String;
  is_read: Boolean;
  created_at: Date;
};

// {"id":"5318f7aa-c06d-4700-a1dd-68b06b8f8da0","title":"New Grade Structure","content":"New Grade Structure has been created","is_read":false,"classroom_id":"0fc38713-d066-49b3-9703-7f446d00fa26","sender_id":"c5551663-721f-409c-b520-c8396f726459"},"sender":{"id":"93ac2072-54ea-44ea-8734-601969c3e1dd","email":"tranminhtoan1280@gmail.com","gender":"UNKNOWN","dob":null,"first_name":"Toàn","last_name":"Trần","is_activated":false},"classroom":{"id":"0fc38713-d066-49b3-9703-7f446d00fa26","name":"classname","description":null,"subject":"","section":"","code":"oyRbN2","room":"","image_url":"https://gstatic.com/classroom/themes/img_backtoschool_thumb.jpg","role":null}

type GradeReview = {
  id: string;
  currentScore: number;
  expectedScore: number;
  explanation?: string;
  compositionName: string;
};

type CommentOnGradeReview = {
  id: string;
  content: string;
  grade_review_id: string;
  user_id: string;
  created_at: Date;
};
