interface Props {
  onClick: () => void;
  text: string;
  className?: string;
}

const Button = ({ onClick, text, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${className} transition-all duration-200 font-medium shadow-md active:shadow-none hover:shadow-lg whitespace-nowrap`}
    >
      {text}
    </button>
  );
};

export default Button;
