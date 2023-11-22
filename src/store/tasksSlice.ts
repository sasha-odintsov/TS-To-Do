import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../types/data";

type TasksState = {
  tasks: ITask[];
};

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, { payload }: PayloadAction<string>) {
      state.tasks.push({
        id: Date.now(),
        title: payload,
        is_done: false,
        created_at: new Date(),
      });
    },
    removeTask(state, { payload }: PayloadAction<number>) {
      state.tasks = state.tasks.filter(({ id }) => id !== payload);
    },
    toggleTask(state, { payload }: PayloadAction<number>) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload)
          return { ...task, is_done: !task.is_done, updated_at: new Date() };
        return task;
      });
    },
  },
});

export const { addTask, removeTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
