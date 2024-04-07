import express, { Request, Response } from 'express';
import cors from 'cors';
import appRouter from "./Routes/index"

const app = express();

app.use(cors());
app.use(express.json());

// The main route that will handle all the backend APIs
app.use("/todoapi/v1", appRouter);

app.get("/", (req: Request, res: Response) => {
  res.send('Welcome to the Todos API');
});

// Error handling middleware
app.use((err : Error, req : Request, res : Response, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(3000, () => console.log("Todo Server is running"));

export default app;
