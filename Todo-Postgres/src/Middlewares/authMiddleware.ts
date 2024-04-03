import { Request as ExpressReq,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import prisma from '../db'
import dotenv from 'dotenv';
import { any } from "zod";

interface RequestWithUserId extends ExpressReq {
    userId ?: number
}

const authMiddleware = (req:RequestWithUserId,res:Response,next:NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ","");

    if (!token) {
        return res.status(401).json({message : "Authorization token is missing, Sign in again please!"})
    }

    try {
        // first we have to verify the token
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as {userId : number}

        req.userId = decoded.userId

        next();

    } catch (error) {
        console.error("Error in the authMiddleware",error)
        res.status(401).json(({message : "Invalid token"}))
    }
}

export default authMiddleware;