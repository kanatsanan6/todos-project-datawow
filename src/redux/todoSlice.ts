import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export interface TodoState {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodosState {
  items: TodoState[];
}

const initialState: TodosState = {
  items: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    // fetch Todos from server
    fetchTodo: (state, action: PayloadAction<TodoState[]>) => {
      return { ...state, items: action.payload };
    },
    // add new Todo
    addTodo: (state, action: PayloadAction<TodoState>) => {
      console.log(current(state.items));
      state.items.push(action.payload);
    },
    // remove new Todo
    removeTodo: (state, action: PayloadAction<TodoState>) => {
      const newState: TodoState[] = state.items.filter((item) => item.id !== action.payload.id);
      return { ...state, items: newState };
    },
    // toggle completed
    toggleCompleted: (state, action: PayloadAction<TodoState>) => {
      const newState: any = [...state.items].map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed,
        };
      });
      return { ...state, items: newState };
    },
    editTitle: (state, action: PayloadAction<TodoState>) => {
      const newState: any = [...state.items].map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return {
          ...todo,
          title: action.payload.title,
        };
      });
      return { ...state, items: newState };
    },

    default: (state) => {
      return state;
    },
  },
});

export const { addTodo, removeTodo, fetchTodo, toggleCompleted, editTitle } = todoSlice.actions;

export default todoSlice.reducer;
