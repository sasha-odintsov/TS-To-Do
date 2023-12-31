import { useEffect, useRef } from "react";
import { CSSProperties } from "react";

interface Props {
  onChange: (str: string) => void;
  onClick: () => void;
  value: string;
  isFocused?: boolean;
  style?: CSSProperties;
  className?: string;
  placeholder?: string;
}

const Input = ({
  onChange,
  onClick,
  value,
  isFocused = false,
  style = {},
  className,
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
      style={style}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
