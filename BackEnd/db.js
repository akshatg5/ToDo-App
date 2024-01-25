const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://akshatgirdhar05:8SCcXb8VNSk68Rfc@cluster0.wjdqmfc.mongodb.net/TodoApp")
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    done: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}