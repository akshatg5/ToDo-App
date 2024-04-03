import { z } from "zod";

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
  firstName: z.string(),
  lastName: z.string(),
});

const signinSchema = z.object({
    username : z.string(),
    password : z.string()
})

export {signinSchema,signupSchema}