// internal
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TodoState } from "../../redux/todoSlice";
import "./Progress.css";

function Progress() {
  let todoItems = useSelector((state: RootState) => state.todo.items);

  const completedPercentage: string = progressCal(todoItems).compeletedPercentage; // will be replaced with real value
  // set value to CSS variable
  document.documentElement.style.setProperty(`--completed`, completedPercentage);

  return (
    <div className="progress">
      <h1>Progress</h1>
      <div className="progress__bar">
        <div className="progress__inCompletedBar"></div>
      </div>
      <h2>{progressCal(todoItems).completedTodo} Completed</h2>
    </div>
  );
}

export default Progress;

function progressCal(todos: TodoState[]): { compeletedPercentage: string; completedTodo: number } {
  const totalTodo = todos.length;
  let completedTodo = 0;
  todos.forEach((todo) => {
    if (todo.completed) completedTodo += 1;
  });
  const compeletedPercentage = `${((100 * completedTodo) / totalTodo).toFixed(2)}%`;
  return {
    compeletedPercentage: compeletedPercentage,
    completedTodo: completedTodo,
  };
}
