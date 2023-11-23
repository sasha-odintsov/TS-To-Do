import { useEffect, useRef } from "react";
import { CSSProperties } from "react";

interface Props {
  onChange: (str: string) => void;
  onClick: () => void;
  value: string;
  isFocused?: boolean;
  style?: CSSProperties;
  placeholder?: string;
}

const Input = ({
  onChange,
  onClick,
  value,
  isFocused = false,
  style = {},
  placeholder,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") onClick();
  };

  useEffect(() => {
    if (isFocused && inputRef.current) inputRef.current.focus();
  }, [isFocused]);

  return (
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      ref={inputRef}
      style={{ ...style, borderRadius: 5 }}
      placeholder={placeholder}
    />
  );
};

export default Input;
