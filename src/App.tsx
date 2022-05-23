// internal
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import getTodo from "./api/getTodo";
import "./App.css";
import Progress from "./components/Progress/Progress";
import TodoList from "./components/TodoList/TodoList";
import TodoTextInput from "./components/TodoTextInput/TodoTextInput";
import { fetchTodo } from "./redux/todoSlice";

function App() {
  const dispatch = useDispatch();

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
        <TodoList />
        <TodoTextInput />
      </div>
    </div>
  );
}

export default App;
