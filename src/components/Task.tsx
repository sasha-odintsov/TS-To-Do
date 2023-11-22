import { ITask } from "../types/data";
import { useAppDispatch } from "../hooks";
import { toggleTask, removeTask } from "../store/tasksSlice";

const Task: React.FC<ITask> = (props) => {
  const { id, title, is_done, created_at, updated_at } = props;
  const dispatch = useAppDispatch();

  const getDate = (isoStr: string | undefined) => {
    if (!isoStr) return "";

    const date = new Date(isoStr);
    return date.toLocaleString();
  };

  return (
    <div
      style={{
        padding: 5,
        border: "1px solid #000",
        margin: "10px 20px",
        borderRadius: 5,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ marginBottom: 5 }}>
          {!is_done ? getDate(created_at) : getDate(updated_at)}
        </div>
        <div>
          <input
            type="checkbox"
            checked={is_done}
            onChange={() => dispatch(toggleTask(id))}
          />
          <span style={{ fontSize: 18 }}>{title}</span>
        </div>
      </div>
      <div style={{ marginLeft: 10 }}>
        <button onClick={() => dispatch(removeTask(id))}>x</button>
      </div>
    </div>
  );
};

export default Task;
