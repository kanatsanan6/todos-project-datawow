import { useDispatch } from "react-redux";
// internal
import deleteTodo from "../../api/deleteTodo";
import { removeTodo, TodoState } from "../../redux/todoSlice";
import "./DropMenu.css";

type Props = {
  todo: TodoState;
  setShowDropDownID: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function DropMenu({ todo, setShowDropDownID, setIsEditMode }: Props) {
  const dispatch = useDispatch();

  // Enalble edit mode
  function enableEditMode(): void {
    setShowDropDownID(null); // hide dropdown
    setIsEditMode(true);
  }
  function onClickDelete(): void {
    setShowDropDownID(null); // hide dropdown
    deleteTodo(todo.id).catch((error) => console.error(error.message)); // delete todo from db
    dispatch(removeTodo(todo)); // delete todo from local state
  }

  return (
    <div className="dropMenu">
      <h1 className="dropMenu__edit" onClick={enableEditMode}>
        Edit
      </h1>
      <h1 className="dropMenu__delete" onClick={onClickDelete}>
        Delete
      </h1>
    </div>
  );
}

export default DropMenu;
