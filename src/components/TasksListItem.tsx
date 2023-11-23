import { CSSProperties } from "react";
import { ITask } from "../types/data";
import Task from "./Task";

interface ITasksListItemProps {
  title: string;
  list: ITask[];
  style: CSSProperties;
}

const TasksListItem = ({ title, list, style }: ITasksListItemProps) => {
  return (
    <div
      style={{
        ...style,
        border: "1px solid #000",
        borderRadius: 5,
        padding: 10,
      }}
    >
      <div style={{ textAlign: "center" }}>{title}</div>
      {list.map((task) => (
        <div key={task.id}>
          <Task {...task} />
        </div>
      ))}
    </div>
  );
};

export default TasksListItem;
