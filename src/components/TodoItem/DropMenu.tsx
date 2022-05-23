// internal
import { useDispatch } from "react-redux";
import deleteTodo from "../../api/deleteTodo";
import { removeTodo, TodoState } from "../../redux/todoSlice";
import "./DropMenu.css";

type Props = {
  todo: TodoState;
  setDropDownID: React.Dispatch<React.SetStateAction<number | null>>;
  setClickedEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

function DropMenu({ todo, setDropDownID, setClickedEdit }: Props) {
  const dispatch = useDispatch();

  // Enalble edit mode
  function onClickedEdit(): void {
    setDropDownID(null); // hide dropdown
    setClickedEdit(true);
  }

  function OnClickedDelete(): void {
    setDropDownID(null); // hide dropdown
    deleteTodo(todo.id).catch((error) => console.error(error.message));
    dispatch(removeTodo(todo));
  }

  return (
    <div className="dropMenu">
      <h1 className="dropMenu__edit" onClick={onClickedEdit}>
        Edit
      </h1>
      <h1 className="dropMenu__delete" onClick={OnClickedDelete}>
        Delete
      </h1>
    </div>
  );
}

export default DropMenu;
