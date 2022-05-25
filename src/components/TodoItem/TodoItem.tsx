import React, { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

// internal
import "./TodoItem.css";
import DropMenu from "./DropMenu";
import { editTitle, TodoState, toggleCompleted } from "../../redux/todoSlice";
import check from "../../images/check.png";
import menu from "../../images/menu.png";
import updateTodo from "../../api/updateTodo";

type Props = {
  todo: TodoState;
  idx: number;
  dropDownID: number | null;
  setShowDropDownID: React.Dispatch<React.SetStateAction<number | null>>;
};

function TodoItem({ todo, idx, dropDownID, setShowDropDownID }: Props) {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTodoTitle, setCurrentTodoTitle] = useState(todo.title);
  const [prevTodoTitle, setPrevTodoTitle] = useState(currentTodoTitle);

  // toggle completed checkbox
  function toggleCheckBox(): void {
    dispatch(toggleCompleted(todo));
    updateTodo({ ...todo, completed: !todo.completed }).catch((error) => console.error(error.message));
  }

  // toggle moreOption dropdown
  // Dropdown will be expanded only one item at a time which is the item where id = idx
  const isShowMoreOption: boolean = dropDownID === idx;
  function showMoreOption(): void {
    setShowDropDownID((prevDropDownID: number | null) => (prevDropDownID === idx ? null : idx));
  }

  // set prevTodoTitle to current TodoTitle whenever entering editmode
  // To backup in the case of invalid new Todotitle
  useEffect(() => {
    setPrevTodoTitle(currentTodoTitle);
    setCurrentTodoTitle(todo.title);
  }, [isEditMode]);

  // update todos
  function handleTodoUpdate(): void {
    const newTodo = {
      id: todo.id,
      title: currentTodoTitle,
      completed: todo.completed,
    };
    if (isInputValid(currentTodoTitle)) {
      updateTodo(newTodo); // update todos on db
      dispatch(editTitle(newTodo)); // update todos on local state
      setIsEditMode(false);
      setCurrentTodoTitle(newTodo.title);
      setPrevTodoTitle(newTodo.title);
    } else {
      setCurrentTodoTitle("");
    }
  }

  // save a new update by clicking on save button
  function onClickSave(): void {
    handleTodoUpdate();
  }
  // save a new update by pressing Enter
  function onPressEnter(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (e.key === "Enter") handleTodoUpdate();
  }

  // Disable Edit mode when clicking outside the editable block
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (isClickOutSide(divRef, event)) {
        setIsEditMode(false);
        setCurrentTodoTitle(prevTodoTitle);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  return (
    <div ref={divRef} className="todoItem__container">
      {!isEditMode ? (
        <div className="todoItem">
          {/* Checkbox */}
          <div className="todoItem__checkboxContainer">
            <div className={`todoItem__checkbox ${todo.completed && "boxChecked"}`} onClick={toggleCheckBox}>
              <img src={check} alt="" />
            </div>
          </div>
          <div className="todoItem__todoTitle">
            <h1 className={`${todo.completed && "textChecked"}`}>{todo.title}</h1>
          </div>
          {/* Option */}
          <div className={`todoItem__moreOption ${isShowMoreOption && "todoItem__moreOptionExpanded"}`}>
            <img src={menu} alt="" onClick={showMoreOption} />
            {isShowMoreOption && (
              <DropMenu todo={todo} setShowDropDownID={setShowDropDownID} setIsEditMode={setIsEditMode} />
            )}
          </div>
        </div>
      ) : (
        <div className="todoItem editMode">
          <input
            type="text"
            placeholder="add your todo..."
            value={currentTodoTitle}
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentTodoTitle(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => onPressEnter(e)}
          />
          <button onClick={onClickSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;

function isInputValid(input: string): boolean {
  if (input.replace(/\s/g, "").length) return true;
  return false;
}

function isClickOutSide(divRef: RefObject<HTMLDivElement>, event: MouseEvent): boolean {
  if (!divRef.current?.contains(event.target as Node)) return true;
  return false;
}
