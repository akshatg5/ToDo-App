import {Request,Response,Router} from 'express'
const router = Router()
const userRouter = require('./user')

router.use("/user",userRouter)

export default router;
