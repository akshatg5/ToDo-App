// Using Zod to do input validation, basically ensuring that the infromation use is sending is useful and suitable according to the file

const zod = require('zod')

const createTodo =  zod.object({
    title : z.string,
    description : z.string
})

const updateTodo = zod.object({
    id : string
})

module.exports = {
    createTodo : createTodo,
    updateTodo : updateTodo
}