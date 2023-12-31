import TasksList from "./TasksList";
import AddTaskForm from "./AddTaskForm";
import User from "./User";
import "../main.css";

const App: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto md:px-7 px-4 py-10">
      <h1 className="text-slate-200 uppercase text-center font-bold lg:text-9xl md:text-8xl text-6xl lg:-mb-5 md:-mb-4 -mb-2">
        Tasks List
      </h1>
      <div className="md:flex md:gap-7">
        <User />
        <AddTaskForm />
      </div>
      <TasksList />
    </div>
  );
};

export default App;
