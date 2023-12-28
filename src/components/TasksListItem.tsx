import { CSSProperties } from "react";
import { ITask } from "../types/data";
import Task from "./Task";
import { useAppDispatch } from "../hooks";
import { editTask } from "../store/tasksSlice";

interface ITasksListItemProps {
  title: string;
  list: ITask[];
  style: CSSProperties;
}

const TasksListItem = ({ title, list, style }: ITasksListItemProps) => {
  const dispatch = useAppDispatch();

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    // e.currentTarget.style.backgroundColor = "#f8f8f8";
    // e.currentTarget.style.borderStyle = "dashed";
    // e.currentTarget.style.outline = "#ccc dashed";
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "#fff";
    e.currentTarget.style.outline = "none";
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.outline = "#ccc solid";
    e.currentTarget.style.backgroundColor = "#f8f8f8";
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const transferData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const status = e.currentTarget.dataset.status;
    e.currentTarget.style.backgroundColor = "#fff";
    e.currentTarget.style.outline = "none";

    dispatch(
      editTask({
        ...transferData,
        is_done: status === "Done",
        done_at:
          status === "Done" ? new Date().toISOString() : transferData.done_at,
      })
    );
  };

  return (
    <div
      style={{
        ...style,
        border: "1px solid #000",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#fff",
      }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      data-status={title}
    >
      <div style={{ textAlign: "center" }}>
        {title} ({list.length})
      </div>
      {list.map((task) => (
        <div key={task.id}>
          <Task {...task} />
        </div>
      ))}
    </div>
  );
};

export default TasksListItem;
