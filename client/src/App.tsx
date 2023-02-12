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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(`Todo: ${todo}`);
    let result = await axios.post("http://localhost:5001/add_todo", {
      task: todo,
    });
    console.log(result);
    setTodo("");
    func();
  };

  useEffect(() => {
    func();
  }, []);

  useEffect(() => {
    setRenderItem(true);
    console.log(`todoArray changed: ${todoArray}`);
  }, [todoArray]);

  return (
    <div className="header">
      <h1>Simple todo app</h1>
      {renderItem
        ? todoArray.map((todo: any) => {
            return <p>{todo.task}</p>;
          })
        : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="enter todo here"
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
