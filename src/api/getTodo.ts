import axios from "axios";
import { TodoState } from "../redux/todoSlice";

export default async function getTodo(): Promise<TodoState[]> {
  const resp = await axios.get("http://localhost:3001/todos");
  if (resp.status === 200) return resp.data;
  return [];
}
