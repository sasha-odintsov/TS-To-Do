import { useState, useEffect, useRef } from "react";
import { ITodo } from "../types/data";
import TodoList from "./TodoList";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  const [todos, setDotos] = useState<ITodo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue(e.target.value);

  const onAddTodo = () => {
    if (value) {
      setDotos([
        ...todos,
        {
          id: Date.now(),
          title: value,
          checked: false,
        },
      ]);
      setValue("");
    }
  };

  const onRemoveTodo = (deleteId: number): void => {
    setDotos(todos.filter(({ id }) => id !== deleteId));
  };

  const onToggleTodo = (id: number): void => {
    setDotos(
      todos.map((todo) => {
        if (todo.id === id) return { ...todo, checked: !todo.checked };
        return todo;
      })
    );
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") onAddTodo();
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div>
      <div>
        <input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button onClick={onAddTodo}>+ Add</button>
      </div>
      <TodoList
        todos={todos}
        onRemoveTodo={onRemoveTodo}
        onToggleTodo={onToggleTodo}
      />
    </div>
  );
};

export default App;
