import { ITodo } from "../types/data";
import TodoListItem from "./TodoListItem";

interface ITodoListProps {
  todos: ITodo[];
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
}

const TodoList = ({ todos, onToggleTodo, onRemoveTodo }: ITodoListProps) => {
  // const filteredTodo = () => { }; // need to do
  // const filteredDone = () => { }; // need to do

  return (
    <div style={{ display: "flex", height: 600 }}>
      <TodoListItem
        title="To Do"
        list={todos
          .filter(({ is_done }) => !is_done)
          .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())}
        onToggleTodo={onToggleTodo}
        onRemoveTodo={onRemoveTodo}
        style={{ width: "50%" }}
      />
      <TodoListItem
        title="Done"
        list={todos
          .filter(({ is_done }) => is_done)
          .sort((a, b) =>
            b.updated_at && a.updated_at
              ? b.updated_at.getTime() - a.updated_at.getTime()
              : 0
          )}
        onToggleTodo={onToggleTodo}
        onRemoveTodo={onRemoveTodo}
        style={{ width: "50%" }}
      />
    </div>
  );
};

export default TodoList;
