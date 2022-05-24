import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// for each single item
export interface TodoState {
  id: string;
  title: string;
  completed: boolean;
}

// for array of items
export interface TodosState {
  items: TodoState[];
}

// initial state declaration
const initialState: TodosState = {
  items: [],
};

// creating a Slice
export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    // Assign the todos (from db) to local state as initil state
    fetchTodo: (state, action: PayloadAction<TodoState[]>) => {
      return { ...state, items: action.payload };
    },

    // add new Todo
    addTodo: (state, action: PayloadAction<TodoState>) => {
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

    // edit the title of todo
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

    // default case
    default: (state) => {
      return state;
    },
  },
});

export const { addTodo, removeTodo, fetchTodo, toggleCompleted, editTitle } = todoSlice.actions;

export default todoSlice.reducer;
