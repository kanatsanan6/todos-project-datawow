import { useEffect, useRef, useState } from "react";

// internal
import TodoItem from "../TodoItem/TodoItem";
import Filter from "../Filter/Filter";
import "./TodoList.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TodoState } from "../../redux/todoSlice";

type Props = {
  pressEnter: boolean;
};

function TodoList({ pressEnter }: Props) {
  const [dropDownID, setDropDownID] = useState<number | null>(null);
  const [currentDropDown, setCurrentDropDown] = useState<"All" | "Done" | "Undone">("All");
  let todoItems = useSelector((state: RootState) => state.todo.items);

  // scroll to bottom when there are a new todos added.
  const todoListRef = useRef<HTMLDivElement | null>(null);
  function scrollToBottom(): void {
    const objDiv: any = document.getElementById("scrollToBottom");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  useEffect(() => {
    scrollToBottom();
  }, [pressEnter]);

  // return boolean as a result of filter selection
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
      <div className="todoList__container" id="scrollToBottom" ref={todoListRef}>
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
