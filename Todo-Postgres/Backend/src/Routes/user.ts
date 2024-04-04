import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import prisma from "../db";
import jwt from "jsonwebtoken";
import authMiddleware from "../Middlewares/authMiddleware";
import { signupSchema, signinSchema,editDetailsSchema,passwordChangeSchema } from "./zodSchemas";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName } =
      signupSchema.parse(req.body);
    // hashing the password before storing it in the db
    const hashedPassword = await bcrypt.hash(password, 6);

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already Exists" });
    }

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

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "User signed up successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error("Error Signup", error);
    res.status(500).json({ message: "Signup Error" });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { username, password } = signinSchema.parse(req.body);

    // to sign in first have to find the username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found try again!" });
    }

    // then have to compare the passwords to check if the user will correctly signin
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password, try again!" });
    }

    // if the password is correct then will return a jwt token for that particular user
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    //if everything is correct then will return the user along with the message, user details and token
    return res
      .status(200)
      .json({ message: "User signed in successfully", user, token });
  } catch (error) {
    console.error("Error signin", error);
    res.status(500).json({ message: "Signin Error" });
  }
});

router.put("/edit-details",authMiddleware,async (req:Request,res:Response) => {
    try {
        const {username,email,firstName,lastName} = editDetailsSchema.parse(req.body)

        // after this have to obtain the userId from the request object
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(401).json({message : "Error fetching the userId, try again."})
        }

        // if we got the correct userId then find the user in the db
        const user = await prisma.user.findUnique({
            where: {id : userId}
        })

        if (!user) {
            return res.status(401).json({message : "User does not exist. Try again!"})
        }
        // if the user exists then update the details as given :
        const updatedUser = await prisma.user.update({
            where : {id : userId},
            data : {
                username : username || user.username,
                email : email || user.email,
                firstName : firstName || user.firstName,
                lastName : lastName || user.lastName
            }
        })

        return res.status(200).json({message : "user details have been updated successfully",user : updatedUser })

    } catch (error) {
        console.error("Error in updating user details",error)
        return res.status(500).json({message : "Internal server error while updating details"})
    }
})

router.put("/change-password",authMiddleware,async (req: Request,res : Response) => {
    try {
        // getting the id from the req object
        const userId = (req as any).userId;
        // we have to pass both current password and new password in order to change password
        const {currentPassword,newPassword} = passwordChangeSchema.parse(req.body);
        //fetch the user from the db using the userId
        const user = await prisma.user.findUnique({
            where : {id : userId}
        });

        if (!user) {
            return res.status(401).json({message : "User does not exist"})
        }

        //verify the current password if correct then change it
        const passwordMatch = await bcrypt.compare(currentPassword,user.password)
        if (!passwordMatch) {
            return res.status(401).json({message : "Invalid current password try again!"})
        }
        // before storing we have to hash the new password too
        const newHashedPassword = await bcrypt.hash(newPassword,6)
        const updatedUser = await prisma.user.update({
            where : {id : userId},
            data : {
                password : newHashedPassword
            }
        }) 
        
    } catch (error) {

    }
})

router.get("/user-details",authMiddleware,async (req: Request, res: Response) => {
    try {

        const userId = (req as any).userId;

        // fetching the user from the db using this id
        const user = await prisma.user.findUnique({
            where : {id : userId },
            select : {id : true,username : true,email : true,firstName : true, lastName : true}
        })

        if (!user) {
            return res.status(404).json({message : "User not found"});
        }

        return res.status(200).json(user)

    } catch (error) {
        console.error("Error fetching user details",error)
        return res.status(500).json("Error fetching user details : server error")
    }
  }
);



const userRouter = router;
export default userRouter;
