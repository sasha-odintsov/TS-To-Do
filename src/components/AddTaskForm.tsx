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
    <div>
      <Input
        value={value}
        onChange={handleChange}
        onClick={onAddTask}
        isFocused={true}
        style={{ width: 200, marginRight: 2, padding: 5 }}
      />
      <Button
        onClick={onAddTask}
        style={{ padding: 5, borderRadius: 5 }}
        text="+ Add Task"
      />
    </div>
  );
};

export default AddTaskForm;
