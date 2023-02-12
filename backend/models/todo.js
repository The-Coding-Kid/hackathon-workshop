const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    unique: true,
  },
});

mongoose.model("Todos", todoSchema);
