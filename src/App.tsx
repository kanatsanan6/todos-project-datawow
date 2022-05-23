// internal
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getTodo from "./api/getTodo";
import "./App.css";
import Progress from "./components/Progress/Progress";
import TodoList from "./components/TodoList/TodoList";
import TodoTextInput from "./components/TodoTextInput/TodoTextInput";
import { fetchTodo } from "./redux/todoSlice";

function App() {
  const dispatch = useDispatch();

  // use to transfer Enter pressing detection among the component
  const [pressEnter, setPressEnter] = useState(false);

  // get Todos from server
  useEffect(() => {
    getTodo()
      .then((resp) => {
        dispatch(fetchTodo(resp));
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  return (
    <div className="app">
      <div className="app__container">
        <Progress />
        <TodoList pressEnter={pressEnter} />
        <TodoTextInput setPressEnter={setPressEnter} />
      </div>
    </div>
  );
}

export default App;
