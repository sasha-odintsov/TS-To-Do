import TodoItem from "./TodoItem";
import { ITodo } from "../types/data";

interface ITodoListProps {
  todos: ITodo[];
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
}

const TodoList = ({ todos, onToggleTodo, onRemoveTodo }: ITodoListProps) => {
  
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          onToggleTodo={onToggleTodo}
          onRemoveTodo={onRemoveTodo}
          {...todo}
        />
      ))}
    </div>
  );
};

export default TodoList;
