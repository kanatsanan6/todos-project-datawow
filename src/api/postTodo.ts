import axios from "axios";
import { TodoState } from "../redux/todoSlice";

// Add new Todo to db
export default async function postTodo(todo: TodoState): Promise<any> {
  await axios.post(`http://localhost:3001/todos?id=${todo.id}`, todo);
}
