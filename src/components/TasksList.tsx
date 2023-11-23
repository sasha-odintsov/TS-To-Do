import TasksListItem from "./TasksListItem";
import { useAppSelector } from "../hooks";

type TaskType = "Todo" | "Done";

const TasksList = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const filteredTasks = (type: TaskType) => {
    return tasks
      .filter(({ is_done }) => (type === "Todo" ? !is_done : is_done))
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
    <div style={{ display: "flex", minHeight: "calc(100vh - 205px)" }}>
      <TasksListItem
        title="To Do"
        list={filteredTasks("Todo")}
        style={{ width: "50%" }}
      />
      <TasksListItem
        title="Done"
        list={filteredTasks("Done")}
        style={{ width: "50%" }}
      />
    </div>
  );
};

export default TasksList;
