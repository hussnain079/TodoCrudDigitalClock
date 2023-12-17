// tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    taskList: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.taskList.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.taskList.findIndex(task => task.id === id);
      if (index !== -1) {
        state.taskList[index] = { ...state.taskList[index], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.taskList = state.taskList.filter(task => task.id !== taskId);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
