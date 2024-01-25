const mongoose = require('mongoose')
const express = require('express')
const app = express()

// connecting to Mongo DB
mongoose.connect('MongoDbConnectionString')

//Defining Mongo DB schemas

const TodoSchema = mongoose.Schema({
    title : String,
    description : String,
    done : Boolean
})

// after creating the Schema, creating the model for it

const Todo = mongoose.model('Todos',TodoSchema)

module.exports = {
    Todo
}