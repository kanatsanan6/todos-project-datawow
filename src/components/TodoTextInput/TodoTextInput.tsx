import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/todoSlice";
import { v4 as uuidv4 } from "uuid";

// internal
import "./TodoTextInput.css";
import postTodo from "../../api/postTodo";

function TodoTextInput() {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (e.key === "Enter") {
      const newTodo = {
        id: uuidv4(),
        title: title,
        completed: false,
      };
      postTodo(newTodo); // to db
      dispatch(addTodo(newTodo)); // local state
      setTitle(""); // reset text field
    }
  }

  return (
    <div className="todoTextInput">
      <input
        type="text"
        placeholder="add your todo..."
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleSubmit(e)}
      />
    </div>
  );
}

export default TodoTextInput;
