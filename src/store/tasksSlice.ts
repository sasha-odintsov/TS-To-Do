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
    addTask(state, { payload }: PayloadAction<ITask>) {
      state.tasks.push(payload);
    },
    removeTask(state, { payload }: PayloadAction<string>) {
      state.tasks = state.tasks.filter(({ id }) => id !== payload);
    },
    editTask(state, { payload }: PayloadAction<ITask>) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id)
          return payload;
        return task;
      });
    },
  },
});

export const { addTask, removeTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
