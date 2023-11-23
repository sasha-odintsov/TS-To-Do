import TasksList from "./TasksList";
import AddTaskForm from "./AddTaskForm";
import User from "./User";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px 50px" }}>
      <User />
      <div
        style={{
          textTransform: "uppercase",
          textAlign: "center",
          margin: 20,
          fontWeight: "bold",
        }}
      >
        Tasks List
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        <AddTaskForm />
      </div>
      <TasksList />
    </div>
  );
};

export default App;
