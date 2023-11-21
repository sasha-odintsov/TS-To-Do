import {useState, useEffect, useRef} from "react";
// import { ITodo } from "../types/data";

interface IInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>; 
  onClick: () => void;
  value: string;
}

const Input = ({ onChange, onClick, value }: IInputProps) => {
  // const [value, setValue] = useState("");
  // const [todos, setDotos] = useState<ITodo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
  //   setValue(e.target.value);

  // const onAddTodo = () => {
  //   if (value) {
  //     setDotos([
  //       ...todos,
  //       {
  //         id: Date.now(),
  //         title: value,
  //         is_done: false,
  //       },
  //     ]);
  //     setValue("");
  //   }
  // };

  // const onRemoveTodo = (deleteId: number): void => {
  //   setDotos(todos.filter(({ id }) => id !== deleteId));
  // };

  // const onToggleTodo = (id: number): void => {
  //   setDotos(
  //     todos.map((todo) => {
  //       if (todo.id === id) return { ...todo, is_done: !todo.is_done };
  //       return todo;
  //     })
  //   );
  // };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") onClick();
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div>
      <input
        value={value || ""}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        style={{ width: 200, padding: 5, borderRadius: 5, marginRight: 2 }}
      />
      <button onClick={onClick} style={{ padding: 5, borderRadius: 5, cursor: "pointer" }}>+ Add Task</button>
    </div>
  );
};

export default Input;
