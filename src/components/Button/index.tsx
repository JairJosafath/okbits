import { PropsWithChildren } from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  label: string;
  color?: string;
}

export default function Button({ label, color = "", ...props }: Props) {
  return (
    <button
      className={`bg-blue-700 px-2 py-1 rounded-md
    text-gray-200
    hover:bg-blue-500
    active:scale-95
    transition-all
    duration-300
    max-h-10
    ${color}
    `}
      {...props}
    >
      {label}
    </button>
  );
}
