import { Router, Request, Response } from "express";
import authMiddleware from "../Middlewares/authMiddleware";
import { addTodoSchema, editTodoSchema } from "./zodSchemas";
import prisma from "../db";

const router = Router();

router.post("/todo", authMiddleware, async (req: Request, res: Response) => {
  try {
    // have to get the userId from the request first
    const userId = (req as any).userId;

    // parse the request body using the add todo schema
    const { title, description, dueDate, priority } = addTodoSchema.parse(
      req.body
    );

    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate,
        priority,
        userId,
      },
    });

    return res.status(200).json({
      message: "Todo created successfully for the user " + userId,
      todo: newTodo,
    });
  } catch (error) {
    console.error("Error while creating the todo", error);
    return res.status(401).json({ message: "Internal server error" });
  }
});

router.put("/todo/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const todoId = parseInt(req.params.id);

    const { title, description, dueDate, priority } = editTodoSchema.parse(
      req.body
    );

    const todo = await prisma.todo.findUnique({ where: { id: todoId } });

    if (!todo) {
      return res.status(401).json({ message: "Todo does not exist" });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        title: title || todo.title,
        description: description || todo.description,
        dueDate: dueDate || todo.dueDate,
        priority: priority || todo.priority,
      },
    });

    return res.status(200).json({message : "Todo updated" + todoId,todo:updatedTodo})
  } catch (error) {
    console.error("Error in updating todo info",error)
    return res.status(400).json({message : "Error in updating todo info"})
  }
});

router.post("/todoStatus/:id",authMiddleware,async (req:Request,res:Response) => {
    try {
        const todoId = parseInt(req.params.id)
        const todo = await prisma.todo.findUnique({
            where : {id : todoId}
        })

        if (!todo) {
            return res.status(404).json({message : "Todo does not exist"})
        }

        const updatedTodo = await prisma.todo.update({
            where : {id : todoId},
            data : {done : !todo.done}
        })

        return res.status(200).json({message : "Todo status changed successfully",todo : updatedTodo})
    } catch (error) {
        console.error("Error while updating the todo status",error)
        return res.status(500).json({message : "Error while changing todo Status"})
    }
})

router.get("/allTodos", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const todos = await prisma.todo.findMany({
      where: { userId },
      select: {
        id : true,
        title: true,
        description: true,
        dueDate: true,
        priority: true,
        done : true
      },
    });

    return res
      .status(200)
      .json({ message: "All the todos for the user" , todos });
  } catch (error) {
    console.error("Error while fetching the todos");
    return res.status(401).json({ message: "Error while fetching the todos" });
  }
});

router.delete("/todo/:id",authMiddleware,async(req:Request,res :Response) => {
    try {
        const todoId = parseInt(req.params.id)
        const todo = await prisma.todo.findUnique({where : {id : todoId}})

        if (!todo) {
            return res.status(404).json({message : "Todo does not exist"})
        }

        await prisma.todo.delete({where : {id : todoId}})
        return res.status(200).json({message : "Todo deleted"})
    } catch (error) {
        console.error("Error in deleting todo")
        return res.status(401).json({message : "Error in deleting todo"})
    }
})

const todoRouter = router;
export default todoRouter;
