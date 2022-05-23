import axios from "axios";

export default async function deleteTodo(id: string): Promise<any> {
  const resp = await axios.delete(`http://localhost:3001/todos/${id}`);
}
