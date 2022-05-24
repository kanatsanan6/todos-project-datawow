import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// internal
import "./App.css";
import getTodo from "./api/getTodo";
import Progress from "./components/Progress/Progress";
import TodoList from "./components/TodoList/TodoList";
import TodoTextInput from "./components/TodoTextInput/TodoTextInput";
import { fetchTodo } from "./redux/todoSlice";

function App() {
  const dispatch = useDispatch();

  // use to transfer Enter pressing detection among the component
  const [isInputSuccess, setIsInputSuccess] = useState(false);

  // get Todos from server
  useEffect(() => {
    getTodo()
      .then((resp) => {
        dispatch(fetchTodo(resp)); // save Todos in local state
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <div className="app">
      <div className="app__container">
        <Progress />
        <TodoList isInputSuccess={isInputSuccess} />
        <TodoTextInput setIsInputSuccess={setIsInputSuccess} />
      </div>
    </div>
  );
}

export default App;
