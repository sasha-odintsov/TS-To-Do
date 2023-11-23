import { useState } from "react";
import uniqid from 'uniqid';
import TasksList from "./TasksList";
import Input from "./Input";
import { useAppDispatch } from "../hooks";
import { addTask } from "../store/tasksSlice";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const id = uniqid();

  const handleChange = (value: string) =>
    setValue(value);

  const onAddTask = () => {
    if (value.trim().length) {
      dispatch(addTask({
        id,
        title: value,
        is_done: false,
        created_at: new Date().toISOString(),
      }));
      setValue("");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <div
        style={{
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 20,
          fontWeight: "bold",
        }}
      >
        Tasks List
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        <Input
          onClick={onAddTask}
          onChange={handleChange}
          value={value}
        />
      </div>
      <TasksList />
    </div>
  );
};

export default App;
