import React, { useEffect, useRef, useState } from "react";

// internal
import "./TodoItem.css";
import check from "../../images/check.png";
import menu from "../../images/menu.png";
import DropMenu from "./DropMenu";
import { useDispatch } from "react-redux";
import { editTitle, TodoState, toggleCompleted } from "../../redux/todoSlice";
import patchTodo from "../../api/patchTodo";

type Props = {
  todo: TodoState;
  idx: number;
  dropDownID: number | null;
  setDropDownID: React.Dispatch<React.SetStateAction<any>>;
};

function TodoItem({ todo, idx, dropDownID, setDropDownID }: Props) {
  const [clickedEdit, setClickedEdit] = useState(false);
  const dispatch = useDispatch();
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [prevTodoTitle, setPrevTodoTitle] = useState(todoTitle);

  // toggle completed checkbox
  function onClickCheck(): void {
    dispatch(toggleCompleted(todo));
    patchTodo({ ...todo, completed: !todo.completed });
  }

  // toggle more option (will be able to show only one Todo item at a time)
  // which is the item where id = idx
  const showMoreOption: boolean = dropDownID === idx;
  function onClickMoreOption(): void {
    setDropDownID((prevDropDownID: any) => (prevDropDownID === idx ? null : idx));
  }

  // set prevTodoTitle to current TodoTitle whenever entering editmode
  // To backup in the case of invalid new Todotitle
  useEffect(() => {
    setPrevTodoTitle(todoTitle);
    setTodoTitle(todo.title);
  }, [clickedEdit]);

  // update todos
  function updateTodo(): void {
    const newTodo = {
      id: todo.id,
      title: todoTitle,
      completed: todo.completed,
    };
    // if new input is valid
    if (todoTitle.replace(/\s/g, "").length) {
      setClickedEdit(false);
      patchTodo(newTodo); // update todos on db
      dispatch(editTitle(newTodo)); // update todos on local state
      setTodoTitle(newTodo.title);
      setPrevTodoTitle(newTodo.title);
    }
    // input is not valid
    else {
      setTodoTitle("");
    }
  }

  // save a new update by clicking
  function onClickedSave(): void {
    updateTodo();
  }
  // save a new update by pressing Enter
  function onPressEnter(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (e.key === "Enter") {
      updateTodo();
    }
  }

  // Disable Edit mode when clicking outside the block
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (!divRef.current?.contains(event.target as Node)) {
        setClickedEdit(false);
        setTodoTitle(prevTodoTitle);
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
    <div ref={divRef}>
      {!clickedEdit ? (
        <div className="todoItem">
          {/* Checkbox */}
          <div className={`todoItem__checkbox ${todo.completed && "boxChecked"}`} onClick={onClickCheck}>
            <img src={check} alt="" />
          </div>
          <h1 className={`${todo.completed && "textChecked"}`}>{todo.title}</h1>
          {/* Option */}
          <div className={`todoItem__moreOption ${showMoreOption && "todoItem__moreOptionExpanded"}`}>
            <img src={menu} alt="" onClick={onClickMoreOption} />
            {showMoreOption && (
              <DropMenu todo={todo} setDropDownID={setDropDownID} setClickedEdit={setClickedEdit} />
            )}
          </div>
        </div>
      ) : (
        <div className="todoItem editMode">
          <input
            type="text"
            placeholder="add your todo..."
            value={todoTitle}
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoTitle(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => onPressEnter(e)}
          />
          <button onClick={onClickedSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
