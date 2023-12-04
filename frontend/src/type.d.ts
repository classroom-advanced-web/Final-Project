type User = {
  id: number;
  email: string;
  dob: Date;
  firstName: string;
  lastName: string;
  activated: boolean
  gender: "MALE" | "FEMALE";
};

type RegisterDTO = {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string | "MALE" | "FEMALE";
  email: string;
  password: string;
};



type ProfileFields = {
  id: number;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
};
