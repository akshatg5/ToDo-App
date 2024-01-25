const express = require("express");
const app = express();
const { Todo } = require('./db')
const { createTodo, updateTodo } = require("./types");


app.use(express.json());

// user has to create a todo, body and description of the todo to do zod input validation
app.post("/create", async function(req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
      res.status(411).json({
          msg: "You sent the wrong inputs",
      })
      return;
  }
  // put it in mongodb
  await Todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false
  })

  res.json({
      msg: "Todo created"
  })
})


//user can get all the todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find({})

  res.json({todos : todos})
});

//user can get a particular todo with the description
app.get("/todos/:todoId", (req, res) => {});

//user can update if they have completed the todo or not
app.put("/done",async (req, res) => {
  const updateTodo = req.body
  try {
    const todoId = updateTodo.safeParse(updateTodo);
    //update the todoId in MongoDB

    await Todo.updateOne({
      _id : req.body.id
    },{
      done : true
    })
  
    res.json({
      msg : "Todo Updated"
    })
  } catch (error) {
    res.status(400).json({msg : "Invalid inputs"})
  }
  
});


app.listen(3000);
