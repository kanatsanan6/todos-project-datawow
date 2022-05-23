import { useState } from "react";

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

  // save the new update
  function onClickedSave(): void {
    const newTodo = {
      id: todo.id,
      title: todoTitle,
      completed: todo.completed,
    };
    setClickedEdit(false);
    patchTodo(newTodo);
    dispatch(editTitle(newTodo));
  }

  return (
    <div>
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
          />
          <button onClick={onClickedSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
