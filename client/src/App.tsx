import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const func = async () => {
    let result = await axios.get("http://localhost:5001/get_todo");
    console.log(result.data);
    setTodoArray(result.data);
  };

  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState<any>([{}]);
  const [renderItem, setRenderItem] = useState(false);

  const deleteTodo = async (todo: any) => {
    let result = await axios.post("http://localhost:5001/delete_todo", {
      id: todo._id,
    });
    console.log(result);
    setTodo("");
    func();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(`Todo: ${todo}`);
    let result = await axios.post("http://localhost:5001/add_todo", {
      task: todo,
    });
    console.log(result);
    setTodo(" ");
    func();
  };

  useEffect(() => {
    func();
  }, []);

  useEffect(() => {
    setRenderItem(true);
    console.log(`todoArray changed: ${todoArray}`);
  }, [todoArray]);

  const changeTodo = async (id: any) => {
    console.log({ id: id._id, newTask: todo });
    let result = await axios.post("http://localhost:5001/update_todo", {
      id: id._id,
      newTask: todo,
    });
    console.log(result);
    setTodo("");
    func();
  };

  return (
    <div className="header">
      <h1>Simple todo app</h1>
      {renderItem
        ? todoArray.map((todo: any) => {
            return (
              <div className="buttons">
                <p>{todo.task}</p>
                {/* <br /> */}
                {/* <input className="theButton"></input> */}
                <button className="theButton" onClick={() => changeTodo(todo)}>
                  change{" "}
                </button>
                {/* <br /> */}
                <button onClick={() => deleteTodo(todo)} className="theButton">
                  delete
                </button>
              </div>
            );
          })
        : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="enter todo here or change todo"
          style={{ width: "200px" }}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <input type="submit" name="submit" placeholder="add todo" />
      </form>
    </div>
  );
}

export default App;
