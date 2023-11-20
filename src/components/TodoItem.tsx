import { ITodo } from "../types/data"

interface ITodoItem extends ITodo {
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const { id, title, checked, onToggleTodo, onRemoveTodo } = props;

  return (
  <div>
    <input type="checkbox" checked={checked} onChange={() => onToggleTodo(id)}/>
    {title}
    <button onClick={() => onRemoveTodo(id)}>x</button>
  </div>
  )
}

export default TodoItem;
