import * as z from 'zod';

export const signUpSchema = z.object({
  first_name: z.string().min(1, 'Please enter your first name').trim(),
  last_name: z.string().min(1, 'Please enter your last name').trim(),
  dob: z
    .string()
    .min(1, 'Please enter your date of birth')
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      const MIN_AGE = 6;
      const MAX_YEAR = new Date().getFullYear() - MIN_AGE;
      return date < now && date.getFullYear() > 1900 && date.getFullYear() <= MAX_YEAR;
    }, 'Please enter a valid birthday'),
  gender: z.string().min(1, 'Please enter your gender').trim().toUpperCase(),
  email: z.string().min(1, 'Please enter your email').email('Please enter a valid email').trim(),
  password: z
    .string()
    .min(6, 'Password should be 6 - 20 character long')
    .max(20, 'Password should be 6 - 20 character long')
    .trim()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
      'Only contain ASCII without special character. At least 6 characters, 1 number, 1 upper,  1 lowercase'
    )
});

export const signInSchema = z.object({
  email: z.string().min(1, 'Please enter your email').email('Please enter a valid email').trim(),
  password: z.string().min(1, 'Please enter your password').trim()
});

export const ProfileSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name').trim(),
  lastName: z.string().min(1, 'Please enter your last name').trim(),
  birthday: z
    .string()
    .min(1, 'Please enter your date of birth')
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();

      return date < now && date.getFullYear() > 1900;
    }, 'Please enter a valid birthday'),
  gender: z.string().min(1, 'Please enter your gender').trim(),
  studentId: z.string().min(1, 'Please enter your student ID').trim()
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password should be 6 - 20 character long')
      .max(20, 'Password should be 6 - 20 character long')
      .trim()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
        'Only contain ASCII without special character. At least 6 characters, 1 number, 1 upper,  1 lowercase'
      ),
    confirmPassword: z.string().min(1, 'Please enter your password confirmation').trim()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export const createClassSchema = z.object({
  className: z.string().min(1, 'Please enter your class name').trim(),
  section: z.string().trim(),
  subject: z.string().trim(),
  room: z.string().trim()
});

export const joinClassSchema = z.object({
  code: z.string().min(1, 'Please enter your code').trim()
});

export const updateClassSchema = z.object({
  className: z.string().min(1, 'Please enter your class name').trim(),
  description: z.string().trim(),
  section: z.string().trim(),
  room: z.string().trim(),
  subject: z.string().trim()
});

export const inviteSchema = z.object({
  email: z.string().min(1, 'Please enter your email').email('Please enter a valid email').trim()
});

export const requestReviewSchema = z.object({
  expectationGrade: z.coerce
    .number()
    .min(1, 'Please enter a positive number')
    .int()
    .gte(1, 'Please enter a positive number')
    .lte(100, 'Please enter a number less than 100'),
  explanationMessage: z.string().min(1, 'Please enter your explanation').trim()
});

export const gradesStructureSchema = z.object({
  compositionName: z.string().min(1, 'Please enter your name').trim(),
  scale: z.coerce
    .number()
    .min(1, 'Please enter a positive number')
    .int()
    .gte(1, 'Please enter a positive number')
    .lte(100, 'Please enter a number less than 100')
});

export const changeGradeSchema = z.object({
  grade: z.coerce
    .number()
    .int()
    .gte(0, 'Please enter a positive number')
    .lte(100, 'Please enter a number less than 100')
});
