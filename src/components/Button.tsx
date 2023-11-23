import { CSSProperties } from "react";

interface Props {
  onClick: () => void;
  text: string;
  style?: CSSProperties;
}

const Button = ({ onClick, text, style = {} }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{ ...style, cursor: "pointer" }}
    >
      {text}
    </button>
  );
};

export default Button;
