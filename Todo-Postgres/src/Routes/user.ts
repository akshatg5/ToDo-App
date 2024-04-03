import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../db";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password, firstName, lastName } = req.body;

  try {
    // hashing the password before storing it in the db
    const hashedPassword = await bcrypt.hash(password, 6);

    // storing the user in the db using prisma create
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    res.status(200).json({ message : 'User signed up successfully',user:newUser})
  } catch (error) {
    console.error('Error Signup',error);
    res.status(500).json({message : 'Signup Error'})
  }
});

export default router;