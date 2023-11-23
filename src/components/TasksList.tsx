import TasksListItem from "./TasksListItem";
import { useAppSelector } from "../hooks";

type TaskType = "To Do" | "Done";

const TasksList = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const taskTypes: TaskType[] = ["To Do", "Done"];

  const filteredTasks = (type: TaskType) => {
    return tasks
      .filter(({ is_done }) => (type === "To Do" ? !is_done : is_done))
      .sort((a, b) => {
        const dateA = new Date(
          type === "Done" && a.done_at ? a.done_at : a.created_at
        );
        const dateB = new Date(
          type === "Done" && b.done_at ? b.done_at : b.created_at
        );

        return dateB.getTime() - dateA.getTime();
      });
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "calc(100vh - 210px)",
        padding: "10px 0",
      }}
    >
      {taskTypes.map((type, index) => (
        <TasksListItem
          key={index}
          title={type}
          list={filteredTasks(type)}
          style={{ width: "50%", marginRight: index === 0 ? 10 : 0 }}
        />
      ))}
    </div>
  );
};

export default TasksList;
