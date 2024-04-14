import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [], // Array to store todos
  loading: false, // Flag to indicate if todos are being loaded
  error: null, // Error message if loading todos fails
};

const todosSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    fetchTodoListStart: (state , action) => {
      state.loading = true;
      state.error = null;
      state.todos = action.payload;
    },
    updateTodoList: (state, action) => {
      state.loading = false;
      const idToUpdate = action.payload;
      state.todos = state.todos.map(todo => todo.id === idToUpdate ? { ...todo, completed: !todo.completed } : todo);
      state.error = null;
    },
    removeTodoList: (state, action) => {
      state.loading = false;
      const idToRemove = action.payload;
      state.todos = state.todos.filter(todo => todo.id !== idToRemove);
      state.error = null;
    },
    createTodoList: (state, action) => {
      state.loading = false;
      state.todos = [...state.todos, action.payload];
      state.error = null;
    }
  },
});


// Reducer function for productSlice
export default todosSlice.reducer;
