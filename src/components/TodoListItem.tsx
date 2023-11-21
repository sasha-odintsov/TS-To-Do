import { CSSProperties } from "react";
import { ITodo } from "../types/data";
import TodoItem from "./TodoItem";

interface ITodoListItemsProps {
  title: string;
  list: ITodo[];
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
  style: CSSProperties;
}

const TodoListItem = ({
  title,
  list,
  onToggleTodo,
  onRemoveTodo,
  style,
}: ITodoListItemsProps) => {
  return (
    <div
      style={{
        ...style,
        border: "1px solid #000",
        margin: 10,
        borderRadius: 5,
        padding: 10,
      }}
    >
      <div style={{ textAlign: "center" }}>{title}</div>
      {list.map((todo) => (
        <div key={todo.id}>
          <TodoItem
            onToggleTodo={onToggleTodo}
            onRemoveTodo={onRemoveTodo}
            {...todo}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoListItem;
