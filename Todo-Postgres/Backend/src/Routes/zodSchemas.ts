import { z } from "zod";

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
  firstName: z.string(),
  lastName: z.string(),
});

const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const editDetailsSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const passwordChangeSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});

const addTodoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

const editTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

export {
  signinSchema,
  signupSchema,
  editDetailsSchema,
  passwordChangeSchema,
  addTodoSchema,
  editTodoSchema,
};
