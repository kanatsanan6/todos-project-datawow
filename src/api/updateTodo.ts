import axios from "axios";
import { TodoState } from "../redux/todoSlice";

// update todo to db ("titile" and "completed")
export default async function updataTodo(todo: TodoState): Promise<any> {
  await axios.patch(`http://localhost:3001/todos/${todo.id}`, todo);
}
