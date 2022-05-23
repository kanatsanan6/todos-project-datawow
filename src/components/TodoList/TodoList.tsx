import { useState } from "react";

// internal
import TodoItem from "../TodoItem/TodoItem";
import Filter from "../Filter/Filter";
import "./TodoList.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TodoState } from "../../redux/todoSlice";

function TodoList() {
  const [dropDownID, setDropDownID] = useState<number | null>(null);
  const [currentDropDown, setCurrentDropDown] = useState<"All" | "Done" | "Undone">("All");
  let todoItems = useSelector((state: RootState) => state.todo.items);

  function filterCondition(todo: TodoState, selection: "All" | "Done" | "Undone"): boolean {
    if (selection === "All") {
      return true;
    } else if (selection === "Done" && todo.completed) {
      return true;
    } else if (selection === "Undone" && !todo.completed) {
      return true;
    }
    return false;
  }

  return (
    <div className="todoList">
      {/* Header */}
      <div className="todoList__header">
        <h1>Tasks</h1>
        <Filter currentDropDown={currentDropDown} setCurrentDropDown={setCurrentDropDown} />
      </div>
      <div className="todoList__container">
        {/* Item */}
        {todoItems.map((todo, idx) => {
          return (
            <div key={idx}>
              {filterCondition(todo, currentDropDown) && (
                <TodoItem todo={todo} idx={idx} dropDownID={dropDownID} setDropDownID={setDropDownID} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodoList;
