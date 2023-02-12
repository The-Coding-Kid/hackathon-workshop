const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Todo = mongoose.model("Todos");

// Path: backend/routes/todos.js

router.post("/add_todo", async (req, res) => {
  const { task } = req.body;

  try {
    const todo = new Todo({
      task: task,
    });
    await todo.save();
    console.log("todo added");
    res.send(todo);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.get("/get_todo", async (req, res) => {
  try {
    // Find all items with the given email
    const result = await Todo.find();
    res.send(result);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/get_todo_by_id", async (req, res) => {
  const { id } = req.body;
  try {
    const result = await Todo.findById(id);
    res.send(result);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/delete_todo", async (req, res) => {
  const { id } = req.body;
  try {
    Todo.find({ _id: id }).remove().exec();
    res.send("Todo deleted successfully");
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/update_todo", async (req, res) => {
  const { id, newTask } = req.body;
  try {
    await Todo.findOneAndUpdate({ _id: id }, { task: newTask }).exec();
    res.send("Updated");
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
