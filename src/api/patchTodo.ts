import axios from "axios";
import { TodoState } from "../redux/todoSlice";

export default async function patchTodo(todo: TodoState): Promise<any> {
  const resp = await axios.patch(`http://localhost:3001/todos/${todo.id}`, todo);
}
