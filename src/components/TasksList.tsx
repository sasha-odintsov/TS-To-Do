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
        minHeight: "calc(100vh - 295px)",
      }}
      className="sm:flex md:pt-7 pt-4 md:gap-7 gap-4"
    >
      {taskTypes.map((type, index) => (
        <TasksListItem
          key={index}
          title={type}
          list={filteredTasks(type)}
          className={`sm:w-1/2 border border-slate-100 rounded-lg px-7 bg-white shadow-lg shadow-slate-200 pb-4 ${index === 0 ? "sm:mb-0 mb-4" : ""}`}
        />
      ))}
    </div>
  );
};

export default TasksList;
