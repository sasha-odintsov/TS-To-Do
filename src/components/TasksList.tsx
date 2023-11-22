import TasksListItem from "./TasksListItem";
import { useAppSelector } from "../hooks";

const TasksList = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  // const filteredTodo = () => {
  //   return tasks
  //   .filter(({ is_done }) => !is_done)
  //   .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
  //  }; // need to do
  // const filteredDone = () => {
  //   return tasks
  //     .filter(({ is_done }) => is_done)
  //     .sort((a, b) =>
  //       b.updated_at && a.updated_at
  //         ? b.updated_at.getTime() - a.updated_at.getTime()
  //         : 0
  //     );
  // }; // need to do

  return (
    <div style={{ display: "flex", height: 600 }}>
      <TasksListItem
        title="To Do"
        list={tasks
          .filter(({ is_done }) => !is_done)
          .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())}
        style={{ width: "50%" }}
      />
      <TasksListItem
        title="Done"
        list={tasks
          .filter(({ is_done }) => is_done)
          .sort((a, b) =>
            b.updated_at && a.updated_at
              ? b.updated_at.getTime() - a.updated_at.getTime()
              : 0
          )}
        style={{ width: "50%" }}
      />
    </div>
  );
};

export default TasksList;
