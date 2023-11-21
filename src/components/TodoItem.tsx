import { ITodo } from "../types/data";

interface ITodoItem extends ITodo {
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const {
    id,
    title,
    is_done,
    created_at,
    updated_at,
    onToggleTodo,
    onRemoveTodo,
  } = props;

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
          {!is_done
            ? created_at.toLocaleString()
            : updated_at?.toLocaleString()}
        </div>
        <div>
          <input
            type="checkbox"
            checked={is_done}
            onChange={() => onToggleTodo(id)}
          />
          <span style={{ fontSize: 18 }}>{title}</span>
        </div>
      </div>
      <div style={{ marginLeft: 10 }}>
        <button onClick={() => onRemoveTodo(id)}>x</button>
      </div>
    </div>
  );
};

export default TodoItem;
