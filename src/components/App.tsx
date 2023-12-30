import TasksList from "./TasksList";
import AddTaskForm from "./AddTaskForm";
import User from "./User";
import "../main.css";

const App: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-7 py-10">
      <h1 className="text-slate-200 uppercase text-center font-bold text-9xl -mb-5">
        Tasks List
      </h1>
      <div className="flex gap-7">
        <User />
        <AddTaskForm />
      </div>
      <TasksList />
    </div>
  );
};

export default App;
