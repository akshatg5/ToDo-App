const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
if (dotenv.error) {
  throw dotenv.error;
}
const dbkey = process.env.DB_KEY;
console.log("DB_KEY:", dbkey);
mongoose.connect(dbkey);
const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  done: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo
};
