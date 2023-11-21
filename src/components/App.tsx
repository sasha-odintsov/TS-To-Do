import { useState, useEffect, useRef } from "react";
import { ITodo } from "../types/data";
import TodoList from "./TodoList";
import Input from "./Input";

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
          is_done: false,
          created_at: new Date(),
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
        if (todo.id === id) return { ...todo, is_done: !todo.is_done, updated_at: new Date() };
        return todo;
      })
    );
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <div
        style={{
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 20,
          fontWeight: "bold",
        }}
      >
        Tasks List
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <Input onClick={onAddTodo} onChange={handleChange} value={value} />
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
