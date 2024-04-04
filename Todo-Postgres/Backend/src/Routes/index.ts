import {Request,Response,Router} from 'express'
const router = Router()
import userRouter from './user';
import todoRouter from './todos';

router.use("/user",userRouter)
router.use("/todos",todoRouter)

const appRouter = router;
export default appRouter;
