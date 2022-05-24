import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// internal
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";
import Filter from "../Filter/Filter";
import { RootState } from "../../redux/store";
import { TodoState } from "../../redux/todoSlice";

type DropDownSelection = "All" | "Done" | "Undone";
type Props = {
  isInputSuccess: boolean;
};

function TodoList({ isInputSuccess }: Props) {
  let allTodos = useSelector((state: RootState) => state.todo.items);
  const [showDropDownID, setShowDropDownID] = useState<number | null>(null);
  const [currentSelectedDropDown, setCurrentSelectedDropDown] = useState<DropDownSelection>("All");

  // scroll to bottom when there is a new todos added.
  useEffect(() => {
    const todoContainerDiv: HTMLElement | null = document.getElementById("todoContainerDiv");
    scrollToBottom(todoContainerDiv);
  }, [isInputSuccess]);

  return (
    <div className="todoList">
      {/* Header */}
      <div className="todoList__header">
        <h1>Tasks</h1>
        <Filter
          currentSelectedDropDown={currentSelectedDropDown}
          setCurrentSelectedDropDown={setCurrentSelectedDropDown}
        />
      </div>
      <div className="todoList__container" id="todoContainerDiv">
        {/* Item */}
        {allTodos.map((todo, idx) => {
          return (
            <div key={idx}>
              {isMatchWithFilter(todo, currentSelectedDropDown) && (
                <TodoItem
                  todo={todo}
                  idx={idx}
                  dropDownID={showDropDownID}
                  setShowDropDownID={setShowDropDownID}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodoList;

function scrollToBottom(element: HTMLElement | null): void {
  element!.scrollTop = element!.scrollHeight;
}

// return boolean as a result of filter selection
function isMatchWithFilter(todo: TodoState, selection: DropDownSelection): boolean {
  if (selection === "All") return true;
  else if (selection === "Done" && todo.completed) return true;
  else if (selection === "Undone" && !todo.completed) return true;
  return false;
}
