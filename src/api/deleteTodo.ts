import axios from "axios";

// delete todo from db
export default async function deleteTodo(id: string): Promise<any> {
  axios.delete(`http://localhost:3001/todos/${id}`);
}
