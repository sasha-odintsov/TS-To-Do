import { useState } from "react";
import uniqid from 'uniqid';
import { useAppDispatch, useAppSelector } from "../hooks";
import { addTask } from "../store/tasksSlice";
import Button from "./Button";
import Input from "./Input";

const AddTaskForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const id = uniqid();
  const user = useAppSelector((state) => state.user.user);

  const handleChange = (value: string) =>
    setValue(value);

  const onAddTask = () => {
    if (value.trim().length) {
      dispatch(addTask({
        id,
        title: value,
        is_done: false,
        created_at: new Date().toISOString(),
        user,
      }));
      setValue("");
    }
  };

  return (
    <div className="border border-slate-100 md:w-1/2 rounded-lg p-7 flex bg-white shadow-lg shadow-slate-200">
      <Input
        value={value}
        onChange={handleChange}
        onClick={onAddTask}
        className="grow bg-slate-100 p-3 me-4 focus:ring-0 focus:outline-none shadow-inner"
        placeholder="Enter task"
      />
      <Button
        onClick={onAddTask}
        text="+ Add Task"
        className="button-main"
      />
    </div>
  );
};

export default AddTaskForm;
