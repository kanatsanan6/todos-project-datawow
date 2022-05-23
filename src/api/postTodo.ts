import axios from "axios";
import { TodoState } from "../redux/todoSlice";

export default async function postTodo(todo: TodoState): Promise<any> {
  const resp = await axios.post(`http://localhost:3001/todos?id=${todo.id}`, todo);
}
