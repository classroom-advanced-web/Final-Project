import * as z from "zod";

export const signUpSchema = z.object({
  first_name: z.string().min(1, "Please enter your first name").trim(),
  last_name: z.string().min(1, "Please enter your last name").trim(),
  dob: z
    .string()
    .min(1, "Please enter your date of birth")
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      console.log(date.getFullYear());
      return date < now && date.getFullYear() > 1900;
    }, "Please enter a valid birthday"),
  gender: z.string().min(1, "Please enter your gender").trim().toUpperCase(),
  role: z.string().min(1, "Please enter your role").trim().toUpperCase(),
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email")
    .trim(),
  password: z
    .string()
    .min(6, "Password should be 6 - 20 character long")
    .max(20, "Password should be 6 - 20 character long")
    .trim()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
      "Only contain ASCII without special character. At least 6 characters, 1 number, 1 upper,  1 lowercase",
    ),
});

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email")
    .trim(),
  password: z.string().min(1, "Please enter your password").trim(),
});

export const ProfileSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name").trim(),
  lastName: z.string().min(1, "Please enter your last name").trim(),
  birthday: z
    .string()
    .min(1, "Please enter your date of birth")
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      console.log(date.getFullYear());
      return date < now && date.getFullYear() > 1900;
    }, "Please enter a valid birthday"),
  gender: z.string().min(1, "Please enter your gender").trim(),
});
