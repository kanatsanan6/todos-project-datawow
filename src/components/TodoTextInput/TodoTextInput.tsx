import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/todoSlice";
import { v4 as uuidv4 } from "uuid";

// internal
import "./TodoTextInput.css";
import postTodo from "../../api/postTodo";

type Props = {
  setIsInputSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

function TodoTextInput({ setIsInputSuccess }: Props) {
  const [todoInput, setTodoInput] = useState("");
  const dispatch = useDispatch();

  // handle new Todo from input field
  function handleNewTodoInput(e: React.KeyboardEvent<HTMLDivElement>): void {
    // press Enter & input doesn't contain only spaces
    if (e.key === "Enter" && isInputValid(todoInput)) {
      const newTodo = {
        id: uuidv4(),
        title: todoInput,
        completed: false,
      };
      postTodo(newTodo); // add new todo to db
      dispatch(addTodo(newTodo)); // add new todo to local state
      setTodoInput(""); // reset text field
      setIsInputSuccess((prevState) => !prevState); // trigger success input state
    }
  }

  return (
    <div className="todoTextInput">
      <input
        type="text"
        placeholder="add your todo..."
        value={todoInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTodoInput(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleNewTodoInput(e)}
      />
    </div>
  );
}

export default TodoTextInput;

function isInputValid(input: string): boolean {
  if (input.replace(/\s/g, "").length) return true;
  return false;
}
