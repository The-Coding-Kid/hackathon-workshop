require("./models/todo");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todos = require("./routes/todos");
const cors = require("cors");

const mongoUri =
  "mongodb+srv://hackathon:test@bubble.w5anplp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUri);

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(todos);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("error connecting to mongo", err);
});

app.listen(5001, () => {
  console.log(`Listening on port ${PORT}`);
});
