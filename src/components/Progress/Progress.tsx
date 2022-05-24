import { useSelector } from "react-redux";
// internal
import { RootState } from "../../redux/store";
import { TodoState } from "../../redux/todoSlice";
import "./Progress.css";

function Progress() {
  let allTodos = useSelector((state: RootState) => state.todo.items);

  // get completed percantage & number of completed todos
  const completedPercentage: string = completedCalulator(allTodos).compeletedPercentage;
  const completedTodos: number = completedCalulator(allTodos).completedTodo;
  // set value to CSS variable
  document.documentElement.style.setProperty(`--completedPercentage`, completedPercentage);

  return (
    <div className="progress">
      <h1>Progress</h1>
      <div className="progress__bar">
        <div className="progress__inCompletedBar"></div>
      </div>
      <h2>{completedTodos} Completed</h2>
    </div>
  );
}

export default Progress;

// calculate the percentage of completed tasks and the number of completed tasks
function completedCalulator(todos: TodoState[]): { compeletedPercentage: string; completedTodo: number } {
  const numberOfTodos = todos.length;
  let completedTodos = 0;
  todos.forEach((todo) => {
    if (todo.completed) completedTodos += 1;
  });
  const completedPercentage = `${((100 * completedTodos) / numberOfTodos).toFixed(2)}%`;
  return {
    compeletedPercentage: completedPercentage,
    completedTodo: completedTodos,
  };
}
