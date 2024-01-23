const express = require('express')
const app = express()

import { createTodo,updateTodo } from './types';

app.use(express.json());

// user has to create a todo, body and description of the todo to do zod input validation
app.post('/create',(req,res) => {
    try {
        const todo = createTodo.safeParse(req.body)
        console.log(todo)
        //put the todo in MongoDb
        res.status(200).json({msg : "Todo Created"})
    } catch (error) {
        console.error("Input invalidated")
        res.status(400).json({msg : "Invalid inputs"})
    }

})

//user can get all the todos
app.get('/todos',(req,res) => {

})

//user can get a particular todo with the description
app.get('/todos/:todoId',(req,res) => {

})

//user can update if they have completed the todo or not
app.put('/done',(req,res) => {
    try {
        const todoId = updateTodo.safeParse(req.body)
        // update the todoId in MongoDB 
        res.status(200).json({msg : todoId})

    } catch (error) {
        console.error("invalid id")
        res.status(400).json({msg : "Invalid inputs"})
    }

})

app.listen(3000)



