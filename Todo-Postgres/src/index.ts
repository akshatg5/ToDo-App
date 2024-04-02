import cors from 'cors';
import express,{Request,Response} from 'express';
const appRouter = require("./Routes/index")

const app = express()

app.use(cors())
app.use(express.json())

// the main route that will handle all the backend APIs
app.use("/todoapi/v1",appRouter)
app.get("/",(req: Request,res : Response) => {
  res.send('Welcome to the Todos API')
})

app.listen(3000,() => console.log("Todo Server is running"))