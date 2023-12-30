import { CSSProperties } from "react";
import { ITask } from "../types/data";
import Task from "./Task";
import { useAppDispatch } from "../hooks";
import { editTask } from "../store/tasksSlice";

interface ITasksListItemProps {
  title: string;
  list: ITask[];
  style?: CSSProperties;
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
    e.currentTarget.style.outline = "#e2e8f0 solid";
    e.currentTarget.style.backgroundColor = "#f8fafc";
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
      style={{ ...style }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      data-status={title}
      className="border border-slate-100 rounded-lg px-7 bg-white shadow-lg shadow-slate-200 pb-4"
    >
      <div className="flex justify-center text-lg text-gray-500 font-medium pt-4">
        <span>{title}</span>
        {list.length > 0 && (
          <div className="bg-blue-200 rounded-full w-7 h-7 text-white text-center ms-2">
            {list.length}
          </div>
        )}
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
