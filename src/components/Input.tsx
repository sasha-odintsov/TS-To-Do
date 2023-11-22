import { useEffect, useRef } from "react";

interface IInputProps {
  onChange: (str: string) => void;
  onClick: () => void;
  value: string;
}

const Input = ({ onChange, onClick, value }: IInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        style={{ width: 200, padding: 5, borderRadius: 5, marginRight: 2 }}
      />
      <button
        onClick={onClick}
        style={{ padding: 5, borderRadius: 5, cursor: "pointer" }}
      >
        + Add Task
      </button>
    </div>
  );
};

export default Input;
